// $(document).ready(function () {
//   if (commonJs.getCookie('accessKey')) {
//   } else if (window.location.pathname != '/login') {
//     window.location.href = '/login'
//   }
// })
var commonJs = {
  listSize: 13,
  // masterServerIp: 'https://tms.56pip.com:50443/gnl/core',
  // loginUrl: 'https://tms.56pip.com:50443/gnl/portal/',
  // masterServerIp: 'http://tms.56pip.com:8092',
  // loginUrl: 'http://tms.56pip.com:8090/',
  // masterServerIp: 'https://tms.56pip.com/gnl/core',
  // loginUrl: 'https://tms.56pip.com/gnl/portal/',
  masterServerIp: 'http://localhost:8080',
  mainPageUrl: 'http://localhost:8080/',

  /**
   * Callback function for ajax error property
   * @param result
   * @returns errors
   */
  handleAjaxError: function (result) {
    var errors = ''
    if (result.response !== undefined && result.response.status === 403) {
      errors = '您没有该操作权限'
    } else if (result.response !== undefined && result.response.data !== undefined && result.response.data.errors !== undefined && result.response.data.errors !== null) {
      errors = result.response.data.errors
        .map(function (cur) {
          return cur.message
        })
        .reduce(function (total, cur, i) {
          if (i > 0) {
            total += '\n'
          }
          return total + cur
        })
    } else if (result.responseJSON !== undefined && result.responseJSON.errors !== undefined && result.responseJSON.errors !== null) {
      errors = result.responseJSON.errors
        .map(function (cur) {
          return cur.message
        })
        .reduce(function (total, cur, i) {
          if (i > 0) {
            total += '\n'
          }
          return total + cur
        })
    } else if (result.responseText !== undefined) {
      errors = '操作失败，请稍后重试或联系管理员。\n' + result.responseText
    } else if (result.request !== undefined && result.request.responseText !== undefined) {
      errors = '操作失败，请稍后重试或联系管理员。\n' + result.request.responseText
    } else if (result.statusText !== undefined) {
      errors = '操作失败，请稍后重试或联系管理员。\n' + result.statusText
    } else {
      errors = '操作失败，请稍后重试或联系管理员。'
    }
    return errors
  },

  /**
   * 休息时间不能同时为空check
   * true：checkOK
   * false：checkErr
   */
  restTimeCheck: function (restTimeList) {
    var err = true
    if (restTimeList.length > 0) {
      restTimeList.forEach(function (element) {
        if (element.restStart === '') {
          if (element.restEnd !== '') {
            err = false
          }
        } else {
          if (element.restEnd === '') {
            err = false
          }
        }
      })
      return err
    }
  },

  /**
   * 巡回顺序不能为空check,必须有2个出发和结束顺序
   * true：checkOK
   * false：checkErr
   */
  locationCntCheck: function (locationIdList) {
    var err = false
    if (locationIdList.length > 0) {
      var cnt = 0
      locationIdList.forEach(function (element) {
        if (element.id !== '') {
          cnt = cnt + 1
        }
      })
      if (cnt < 2) {
        err = false
      } else {
        err = true
      }
    }
    return err
  },

  getCookie: function (cname) { // 获取cookie
    let reg = new RegExp('(^| )' + cname + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return (arr[2])
    } else {
      return ''
    }
  },

  setCookie: function (cname, cvalue, exmins) { // 设置cookie
    var d = new Date()
    d.setTime(d.getTime() + (exmins * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },

  logout: function () {
    // 删除localStorage变量
    localStorage.token = ''
    localStorage.role = ''
    localStorage.displayName = ''
    localStorage.companyId = ''
    // 删除cookie
    this.setCookie('role', '', -1)
    this.setCookie('accessKey', '', -1)
    this.setCookie('displayName', '', -1)
    this.setCookie('companyId', '', -1)
    //window.location.href = 'login.html'
    return false
  },

  saveDataChecking: function (eventName) {
    var wsUrl = '/dataChecking/saveDataChecking'
    var route = {
      'userName': localStorage.username,
      'eventName': eventName
    }
    $.ajax({
      url: wsUrl,
      contentType: 'application/json;charset=utf-8',
      type: 'POST',
      data: JSON.stringify(route),
      dataType: 'json',
      cache: false,
      async: false,
      beforeSend: function (request) {
        request.setRequestHeader('Authorization', localStorage.token)
      }
    }).success(function (res) {

    }).error(function (error) {

    })
  }
}
export default commonJs
