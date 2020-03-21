

/**
 * @param { string } variable 查询链接上的参数
 * @param { string } url 查询链接
 * @returns {string | Object}  
 */
export const getUrlParam = (url ,variable) => {
  let query = url.split("?")[1];
  let vars = query ? query.split("&") : [];
  let result = {};
  for (let i=0;i<vars.length;i++) {
      let pair = vars[i].split("=");
      if(variable && pair[0] === variable){
        return pair[1];
      }else{
        result[pair[0]] = pair[1];
      }
  }
  return Object.getOwnPropertyNames(result) === 0 ? false: result;
}

// 过万处理
export const million = (value) => {
  let num;
 if(value > 9999){//大于9999显示x.x万
    num = (Math.floor(value/1000)/10) + '万';
 }
 return num;
}

/**
 * @param {url} 分享的链接  
 * @param {desc} //默认分享理由(可选)
 * @param {summary} //分享摘要(可选)
 * @param {title} //分享标题(可选)
 * @param {pics} //分享图片的路径(可选)
 */
export const share = {
  config({
    url = '',
    desc = '',
    summary = '',
    title = '',
    site = '',
    pics = '',
  }){
    this.shareConfig = {
      url,
      desc,
      summary,
      title,
      site,
      pics,
      imgUrl: pics,
      content: desc
    }
  },
  //是否在内置浏览器打开
  isMiniWorldGame: /miniworldgame/ig.test(navigator.userAgent),
  //  是否手机打开
  iphone : /Android|iPhone|iPod|iPad/i.test(navigator.userAgent),
  //  分享到qq空间
  shareQQZone() {
    let _parmas = {
      ...this.shareConfig,
    };
    if ( this.isMiniWorldGame && mnw && this.iphone ) {
      mnw.shareToQZone(_parmas)
    }else {
      window.open(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${_parmas.url}&desc=${_parmas.desc}&summary=${_parmas.desc}&title=${_parmas.title}&title=${_parmas.site}&pics=${_parmas.pics}`)
    }
  },
  //  分享到qq
  shareQQ() {
    let _parmas = {
      ...this.shareConfig
    };
    if ( this.isMiniWorldGame && mnw && this.iphone ) {
      mnw.shareToQQ(_parmas)
    } else {
      window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${_parmas.url}&desc=${_parmas.desc}&summary=${_parmas.desc}&title=${_parmas.title}&title=${_parmas.site}&pics=${_parmas.pics}`)
    }
    
  },
  //  分享到微信 callback 回调函数
  shareWeChat(callback) {
    console.log(this)
    let _parmas = {
      ...this.shareConfig
    };
    if ( this.iphone ) {
      this.isMiniWorldGame ? mnw?.shareToWechat(_parmas) : callback && callback()
    } else {
      window.open(`http://zixuephp.net/inc/qrcode_img.php?url=${encodeURIComponent(
        _parmas.url
      )}`);
    }
  },
  //  分享到新浪微博
  shareWebo() {
    let _parmas = {
      ...this.shareConfig
    };
    if ( this.isMiniWorldGame && mnw && this.iphone ) {
      mnw.shareToWeibo(_parmas)
    } else {
      window.open(`http://service.weibo.com/share/share.php?${new URLSearchParams(_parmas)}`)
    }
  },
  //  分享到twitter
  shareTwitter() {
    let _parmas = {
      text: this.shareConfig.title,
      url: this.shareConfig.url
    };
    if ( this.isMiniWorldGame && mnw && this.iphone ) {
      mnw.shareToTwitter(this.shareConfig)
    } else {
      window.open(`http://twitter.com/intent/tweet?${new URLSearchParams(_parmas)}`)
    }
  },
  //  分享到facebook
  shareFB() {
    if ( this.isMiniWorldGame && mnw && this.iphone ) {
      mnw.shareToTwitter(this.shareConfig)
    } else {
      window.open(`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareConfig.url)}`)
    }
  } 
}


/**
* 获取用户头像URL
* @param {Object} Info
* 说明：
* 1、游戏登录态参数，取登录态中的headIndex
* 2、密码登录取得的baseinfo，取baseinfo.RoleInfo
* 3、验证码登录取，取返回值中的Model和SkinID参数，组装成字面量对象
*/
export const getAvatarUrl = Info => {
 // 如果是从游戏内带的登录态，则直接使用带出来的id，因为游戏内已经算好id

 const {headIndex, Model, SkinID} = Info;

 let headInfo = null;

 if(headIndex){
  headInfo = +headIndex
 }else {
  headInfo = {
    Model,
    SkinID
  }
 }

 if (typeof headInfo === 'number') {
   return `https://image.mini1.cn/roleicon/${headInfo}.png`;
 } else if (headInfo !== null && typeof headInfo === 'object') {
   // 皮肤ID映射
   const skinHeadIdMap = {
     10: 39,
     9: 38,
     8: 37,
     6: 35,
     7: 36,
     5: 34,
     4: 33,
     3: 30,
     2: 32,
     1: 31,
   };

   let resultID = 0;
   let skinID = +headInfo.SkinID;

   if(skinID <= 0){  // 没有皮肤使用Model
     resultID = +headInfo.Model;
   } else {
     // 有皮肤且存在于映射表中使用映射表中的id
     if(skinHeadIdMap[skinID]){
       resultID = skinHeadIdMap[skinID];
     } else {  // 不存在则使用skinid + 29
       resultID = skinID + 29;
     }
   }
   return `https://image.mini1.cn/roleicon/${resultID}.png`;
 } else {
   return 'https://image.mini1.cn/roleicon/1.png';
 }
};


/*
 * @param x {Object} 对象1
 * @param y {Object} 对象2
 * @return  {Boolean} true 为相等，false 为不等
 */
export const deepEqual = (x, y) => {
  // 指向同一内存时
  if (x === y) {
    return true;
  }
  else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if (Object.keys(x).length != Object.keys(y).length)
      return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop))
      {  
        if (! deepEqual(x[prop], y[prop]))
          return false;
      }
      else
        return false;
    }

    return true;
  }
  else 
    return false;
}

 
/**
 * @param {Object} obj 深拷贝对象
 * @param {Map} hash 拷贝对象建值映射表
*/
export const deepCopy = (obj, hash = new Map()) => {
  // 判断是否是对象
  const isObject = o => ( typeof o === 'object' || o === 'function' ) && o !== null;
  if (!isObject(obj)) {
    throw new Error("obj 不是一个对象！")
  }

  let isArray = Array.isArray(obj);
  let cloneObj = isArray ? [] : {};

  //  处理特殊对象
  const Constructor = obj.constructor

  switch(Constructor){
    case RegExp:
      cloneObj = new Constructor(obj);
      break;
    case Date:
      cloneObj = new Constructor(obj.getTime());
      break;
    default:
      if (hash.has(obj)) {
        return hash.get(obj)
      };
      // 映射表设值
      hash.set(obj, cloneObj);
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = isObject(obj[key]) ? deepCopy(obj[key], hash) : obj[key]
    }
  }

  return cloneObj;
}
