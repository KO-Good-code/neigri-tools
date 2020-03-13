import $http from '@/config/api';

/*
  @param {variable} 查询链接上的参数
*/
let getQueryVariable = (url ,variable) => {
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
/**
* 判断某个任务是否完成
* status : 用户状态
* pos: 任务的位置
*/
export const isComplete = (status, pos) => {
  if(pos<1)
    return false;
  return (status & (1 << (pos-1))) >= 1
}
/**
* 将某个进制位变为1
* status : 用户状态
* pos: 任务的位置
*/
export const complete = (status, pos) => {
  if(pos<1)
    return status;
  return (status | (1 << (pos-1)));
}

/**
* 打点函数
* @param id : 打点id
*/

export const Dot = async id => {
  try {
    const r = {
      task: id
    }
    const res = await $http.home.putDot({param:r})
    return res
  } catch (error) {
    console.log(error)
  }
}

// 过万处理
export const million = (value) => {
  let num;
 if(value > 9999){//大于9999显示x.xx万
    num = (Math.floor(value/1000)/10) + '万';
 }else if( value < 9999){
   num = '1万'
 }
 return num;
}


/**
* 获取用户头像URL
* @param {Number|Object} headInfo
* 说明：
* 1、游戏登录态参数，取登录态中的headIndex
* 2、密码登录取得的baseinfo，取baseinfo.RoleInfo
* 3、验证码登录取，取返回值中的Model和SkinID参数，组装成字面量对象
*/
export const getAvatarUrl = () => {
 // 如果是从游戏内带的登录态，则直接使用带出来的id，因为游戏内已经算好id

 const {headIndex, Model, SkinID} = JSON.parse(sessionStorage.getItem('authInfo'));

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


export default getQueryVariable