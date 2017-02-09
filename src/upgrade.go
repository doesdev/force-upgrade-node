package main

import (
  "os"
  "log"
  "io/ioutil"
  "os/exec"
)

func check(e error) {
  if e != nil {
    content := []byte(e.Error())
    tmpfile, err := ioutil.TempFile("", "force-upgrade-node")
    if err != nil {
      log.Fatal(err)
    }
    if _, err := tmpfile.Write(content); err != nil {
      log.Fatal(err)
    }
    if err := tmpfile.Close(); err != nil {
      log.Fatal(err)
    }
    err = exec.Command("cmd", "/C", "start", "/W", "notepad", tmpfile.Name()).Run()
    if err != nil {
      log.Fatal(err)
    }
    err = os.Remove(tmpfile.Name()) // clean up
    if err != nil {
      log.Fatal(err)
    }
    panic(e)
  }
}

func main() {
  args := os.Args
  pkgPath := args[1]
  nodePath := args[2]
  donePath := args[3]
  err := exec.Command("taskkill", "/F", "/IM", "node.exe").Run()
  check(err)
  err = os.RemoveAll(nodePath + "-bak")
  check(err)
  err = os.Rename(nodePath, nodePath + "-bak")
  check(err)
  err = os.Rename(pkgPath, nodePath)
  check(err)
  err = exec.Command("cmd", "/C", "start", "/W", "node.exe", donePath).Run()
  check(err)
}
