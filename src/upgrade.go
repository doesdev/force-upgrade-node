package main

import (
  "fmt"
  "time"
  "os"
  "syscall"
  "os/exec"
)

func main() {
  args := os.Args
  // pkgPath := args[1]
  // nodePath := args[2]
  donePath := args[3]
  cmd := exec.Command("taskkill", "/F", "/IM", "node.exe")
  cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
  cmd.Run()
  duration := time.Duration(0) * time.Second
  time.Sleep(duration)
  cmd = exec.Command("cmd", "/C", "start", "/W", "node.exe", donePath)
  cmd.Run()
  fmt.Println("Hello Node.js")
}
