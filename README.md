
# electron-netease-music

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```


### 打包注意事项

```
问题描述

在运行官网示例的过程中，一个安装包（electron-v1.8.6-darwin-x64.zip）下载特别慢，基本下载不下来。更改npm的安装源到taobao的镜像，也没有效果。
解决方案

所以，可以先在这里下载安装包：

https://npm.taobao.org/mirrors/electron/

然后，将安装包（.zip文件）拷贝到以下路径（Mac）：貌似无效

currentUser/.electron/

注意，以上路径默认是隐藏的。

```