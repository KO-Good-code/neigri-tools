
/**
 *  @param {Object} axios axios 实例
 *  @param {Function} callback 错误回调函数
 *  @param {JSON} options 请求连接上的参数
*/

export const createAxios = (axios, callback, options = {}) => {
  /**
   * 错误提示
   * @param {String} message 提示文字内容
   * @param {Number} duration 提示显示时间
   */

  const errorTip = (msg = '', duration = 2000) => {
    callback && callback(msg)
  };

  /**
   * 状态码响应
   * @param status {Number} http状态码
   * @param content {String} 错误信息
   */
  const handleError = (status, content) => {
    switch (status) {
      case 400:
        errorTip(`${content}`, 2000);
        break;
      case 401:
        // 登录失效
        errorTip('登录失效，请重新登录', 2000);
        break;
      case 403:
        errorTip('您没有权限访问该接口', 2000);
        break;
      case 404:
        errorTip('请求出错，该接口不存在', 2000);
        break;
      case 405:
        errorTip(`请求出错 - ${content}`, 2000);
        break;
      default:
        errorTip(content, 2000);
        break;
    }
  };

  // 创建axios实例，同时设置20秒延时时间
  const ajax = axios.create({
    timeout: 1000 * 20
  });
  /**
   * 请求拦截器
   */
  ajax.interceptors.request.use(
    config => {
      // 请求头添加auth token
      const AUTH_TOKEN = sessionStorage.getItem('AUTH_TOKEN');

      AUTH_TOKEN && (config.headers['Authorization'] = `Bearer ${AUTH_TOKEN}`);

      return config;
    },
    error => Promise.reject(error)
  );

  /**
   * 响应拦截器
   */
  ajax.interceptors.response.use(
    response =>
    response.status === 200 || response.data.code === 0 ?
    Promise.resolve(response.data) :
    Promise.reject(response.data),
    error => {
      const {
        response
      } = error;

      if (response.status < 500) {
        handleError(response.status, response.data.msg);
      } else if (response.status >= 500) {
        errorTip('系统繁忙！', 2000);
      } else {
        errorTip(response.statusText, 2000);
      }
      return Promise.reject(response.data);
    }
  )

  /**
   * 封装ajax api接口 @param {api} api数组对象
   */
  const ajaxFn = (api) => {
    let result = {}
    api.forEach((o) => {
      result[o.name] = ({
        param = {},
        body = null
      }) => {
        let info = options
        let params = Object.assign(info, param);
        if (o.type === 'get') {
          return ajax[o.type](o.url, {
            params
          })
        } else {
          return ajax[o.type](o.url, body, {
            params
          })
        }
      }
    })
    return result
  }

  return ajaxFn;

}