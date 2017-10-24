
export default ({ dispatch, getState }) => (next) => (action) => {
  const { type = '', url, method = 'GET', headers = { "Content-Type": "application/json" }, data = {}, params = {} } = action;

  // 普通 action：传递
  if (!url || url === undefined) {
    return next(action);
  }

  if (!type || type === undefined) {
    return next(action);
  }

  // 校验http状态码
  const checkStatus = response => {
    const status = response.status;
    console.error(status)
    if (status >= 200 && status < 300) {
        return response;
    }else if(status === 404 || status === 409){
        return response;
    }else if(status === 401){  // 权限校验失败，返回登陆界面
        dispatch(push('/login'));
    }else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error
    }
  }

  // 整理params参数
  const paramsArray = [];
  Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));

  const api = 'https://cnodejs.org/api/v1' + url;

  const request = async function() {
    try {
      let response = await fetch(api + '?' + paramsArray.join('&'), method === 'POST' ? {
        method,
        headers,
        body: JSON.stringify(data),
      } : {
        method,
        headers,
      });
      let responseJson = await response.json();
      // console.log('url', url, 'response', responseJson);
      return responseJson;
    } catch(error) {
      dispatch({ type: 'COLLECT_APP_ERROR', error: { message: error } });
    }
  }

  return request();
};
