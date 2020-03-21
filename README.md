# neigri-tools
neigri的前端工具库

## Install
This project uses **node** and **npm** or **yarn**. Go check them out if you don't have them locally installed.
```cmd
npm install neigri-tools

yarn add neigri-tools
```
### 目录结构描述
├── Readme.md                   // help
├── app                         // 应用
├── config                      // 配置
│   ├── webpack.config          // 公共配置
│   ├── webpack.dev.config.js   // 开发环境
│   ├── webpack.prod.config.js  // 生产环境
├── src
│   ├── components              // 测试用组件页面
│   ├── store                   // 测试状态管理
│   ├── tools                   // 主要打包内容


## Usage
导出模块可使用 import, require, 目前工具库中有：
1.获取url上参数, url目标链接, key详细的目标健值(可选) 没有就会将所有参数输出
```js
import { getUrlParam } from 'neigri-tools'

const param = getUrlParam(url, key)

```

2.过万处理处理 大于 9999 显示 xx.x万
```js
import { million } from 'neigri-tools'

let val = 10000

million(val)    //1.0万 

```

3.个人分享 集合了qq，微博，qq空间，facebook，twitter等第三方分享功能。
facebook和twitter配置项除了url链接有效外无法配置其他选项，它们有自己一套抓取页面的标准。
```js
import { share } from 'neigri-tools'

share.config({
  url = '',   //分享的链接  
  desc = '',  //默认分享理由(可选)
  summary = '', //分享摘要(可选)
  title = '',//分享标题(可选)
  pics = '', //分享图片的路径(可选)
})

 //  分享到qq空间  
 share.shareQQZone()

 //  分享到qq好友
 share.shareQQ()

 //  分享到微信 callback 回调函数 微信没有第三方分享 pc端调用此方法会生成链接二维码 callback是处理移动调用此方法时的自定义处理
 share.shareWeChat(callback)

 //  分享到微博
 share.shareWebo()

 //  分享到twitter
 share.shareTwitter()

 //  分享到facebook
 share.shareFB()
```

4.个人业务的头像处理(可无视)
```js
import { getAvatarUrl } from 'neigri-tools'

const info = {
  headIndex:1,
  SkinID?:1,
  Model? : 1
}

getAvatarUrl(info)

```

5.两个对象深度对比
```js
import { deepEqual } from 'neigri-tools'

deepEqual(x, y)

```

6.深度拷贝对象
```js
import { deepCopy } from 'neigri-tools'

const newObj = deepCopy(obj)

```
