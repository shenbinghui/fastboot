# fastboot
使用electron创建桌面程序，操作终端设备fastboot烧写擦除文件


流程：
1、新建文件夹,例如app
2、cd app,创建三个文件main.js,index.html,package.json

main.js

/**********************************************************/

const {app, BrowserWindow} = require('electron')

const path = require('path')

const url = require('url')

// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭

let win

function createWindow () {

  // 创建浏览器窗口。
  
  win = new BrowserWindow({width: 800, height: 600})

  // 加载应用的 index.html。
  
  win.loadURL(url.format({
  
  pathname: path.join(__dirname, 'index.html'),
  
  protocol: 'file:',
  
  slashes: true
  
  }))

  // 打开开发者工具。
  win.webContents.openDevTools()

  // 当 window 被关闭，这个事件会被触发。
  win.on('closed', () => {
  // 取消引用 window 对象，如果你的应用支持多窗口的话，
  // 通常会把多个 window 对象存放在一个数组里面，
  // 与此同时，你应该删除相应的元素。
  win = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
  app.quit()
  }
})

app.on('activate', () => {
  // 在这文件，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。
  if (win === null) {
  createWindow()
  }
})

/**********************************************************/



index.html
/**********************************************************/
<!DOCTYPE html>
<html>
  <head>
  <meta charset="UTF-8">
  <title>Hello World!</title>
  </head>
  <body>
  <h1>Hello World!</h1>
  We are using node <script>document.write(process.versions.node)</script>,
  Chrome <script>document.write(process.versions.chrome)</script>,
  and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
/**********************************************************/


package.json
/**********************************************************/
{
  "name" : "fastboot",
  "version" : "0.1.0",
  "main" : "main.js"
}
/**********************************************************/

3、全局安装：cnpm install electron-prebuilt -g
4、执行：electron .
弹出来界面

5、打包
5.1：cnpm install --save-dev electron-packager
5.2:增加脚本 
{
  "name": "fastboot",
  "version": "0.1.0",
  "main": "app.js",
  /**add***/
  "scripts":{
        "package": "electron-packager ./ oral -all --electron-version=1.4.13"
    }
  /**add***/
}

5.3：npm run-script package

就会生成xxx.exe
------------------------------------------------------
以上是创建一个桌面应用的流程


上传的代码是为工作项目写的一个fastboot烧写的工具。以前用mfc写，发现使用nodejs也可以做了，后续会做一些更加实用的东东！

