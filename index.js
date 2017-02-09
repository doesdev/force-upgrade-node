'use strict'

const ngo = require('ngo')
const fs = require('fs')
const path = require('path')
const https = require('https')
const decompress = require('decompress')
const zip = require('decompress-unzip')
const nodePath = path.dirname(process.execPath)
const nodeRelUrl = 'https://nodejs.org/dist'
const nodeRelIdx = `${nodeRelUrl}/index.json`
const src = path.resolve(__dirname, 'src')
const done = path.join(src, 'done.js')
const upgrader = path.join(src, 'upgrade.go')
const vendor = path.resolve(__dirname, 'vendor')
const arch = /x64/.test(process.arch) ? 'x64' : 'x86'

// Main
let upgrade = (pkg) => {
  console.log(`Launching GO upgrade script, Node will now exit`)
  ngo(['run', upgrader, pkg, nodePath, done]).then(console.log).catch(console.error)
}
getNodeVersions().then(downloadLatest).then(upgrade).catch(console.log)

// Parse latest go versions from nodeRelUrl
function getNodeVersions () {
  return new Promise((resolve, reject) => {
    https.get(nodeRelIdx, (res) => {
      let json = ''
      res.on('error', reject)
      res.on('data', (data) => (json += data.toString()))
      res.on('end', () => {
        let latest = JSON.parse(json).find((o) => o.lts) || {}
        return resolve(latest.version)
      })
    }).on('error', reject)
  })
}

// Download latest Node version (LTS)
function downloadLatest (tag) {
  let pkg = `node-${tag}-win-${arch}.zip`
  let pkgUrl = `${nodeRelUrl}/${tag}/${pkg}`
  let dest = path.join(vendor, pkg)
  return new Promise((resolve, reject) => {
    let arc = fs.createWriteStream(dest)
    arc.on('error', reject)
    https.get(pkgUrl, (res) => {
      res.pipe(arc).on('error', reject).on('close', () => {
        unpackArchive(dest).then(resolve).catch(reject)
      })
    }).on('error', reject)
  })
}

// Unpack Node archive
function unpackArchive (arc) {
  return new Promise((resolve, reject) => {
    decompress(arc, vendor, {plugins: [zip()]}).then(() => {
      fs.unlink(arc, (err) => { if (err) console.warn(err) })
      return resolve(path.join(vendor, arc.replace(/\.zip$/, '')))
    }).catch(reject)
  })
}
