<template>
  <div class="login-container">
    <div class="logo">
      <div class="version">V 1.0.1</div>
      <img src="../../assets/images/panLogo1.png"></div>
    <div class="login-main">
      <p class="p2"> Welcome to Pandora </p>
      <form id="app">
        <div class="input-box user-box">
          <div class="tip">
            <p>Email</p>
          </div>
          <div class="input_clear"><a href="#" class="close" data-dismiss="modal" aria-hidden="true"></a></div>
          <img src="../../assets/images/email1.png">
          <input type="text" class="form-control userName" v-model="username" name="Email">
          <div class="border"></div>
        </div>
        <div class="input-box password-box">
          <div class="tip">
            <p>Password</p>
          </div>
          <div class="input_clear"><a href="#" class="close" data-dismiss="modal" aria-hidden="true"></a></div>
          <img src="images/pwd1.png">
          <input type="password" class="form-control password" maxlength="20" v-model="password" name="Password">
          <div class="border"></div>
        </div>
        <div class="notice-error">
          <span v-model="serverError" v-cloak>{{ serverError }}</span>
        </div>
        <button type="button" class="login-submit" v-on:click="login()"><span class="text" id="normalBtn">Login <img
          src="../../assets/images/login-next.png"></span> <span class="text loading" id="clickBtn">Login...</span>
        </button>
        <div class="borderBlue"></div>
        <div class="contact">Have a problem? <a href="mailto:Ying.YZ.Zhang@bmw.com">Contact us.</a></div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  created(){
    this.changeBgimg();
  },
  mounted () {
    this.$http.post('priceladder_webservice/login', {
      username: 'admin@123.com',
      password: '123456',
      rememberMe: 'yes'
    }).then(res => {
      if (res.status == 200) {
        localStorage.token = res.data.accessKey
        // this.$router.push({path: `/priceLadder`})
        this.$router.push({path: `/login`})
      }
    })
  },
  methods:{
    changeBgimg:function () {
      const bgImgs = [
          'url(../../assets/images/login-bg0.png)',
          'url(../../assets/images/login-bg1.png)',
          'url(../../assets/images/login-bg2.png)',
          'url(../../assets/images/login-bg3.png)'
      ];
      var Index = Math.round(Math.random()*(bgImgs.length-1));
      console.log()
      console.log("body")
      $('body').css(
          {
              'background':bgImgs[Index],
              // 'background-size': 'cover'
          }
      );
    },
    login: function () {
      var self = this;
      this.serverError = ''
      $("#normalBtn").css("display", "none");
      $("#clickBtn").css("display", "block");
      var wsUrl = '/priceladder_webservice/login'

      self.$http.get(wsUrl, {
        params: JSON.stringify({
          'username': self.username,
          'password': self.password,
          'rememberMe': function () {
            if ($("input[name='rememberMe']").is(':checked')) {
              return 'yes';
            } else {
              return 'no';
            }
          }()
        })
      }).then(res => {
        if (res.status == 200) {
          self.afterLogin(res.data)
        }
      })

      // $.ajax({
      //   url: wsUrl,
      //   contentType: "application/json;charset=utf-8",
      //   type: "POST",
      //   data: JSON.stringify({
      //     'username': self.username,
      //     'password': self.password,
      //     'rememberMe': function () {
      //       if ($("input[name='rememberMe']").is(':checked')) {
      //         return 'yes';
      //       } else {
      //         return 'no';
      //       }
      //     }()
      //   }),
      //   dataType: "json",
      //   cache: false,
      //   success: function (data) {
      //     self.afterLogin(data)
      //   },
      //   error: function (result, status) {
      //     self.serverError = commonJs.handleAjaxError(result);
      //     $("#normalBtn").css("display", "block");
      //     $("#clickBtn").css("display", "none");
      //   }
      // });
    },
  },
}
</script>

<style scoped lang="less">
  body {
    font-family: 'bmwRg';
    width: 100%;
    height: 100%;
    background: url(../../assets/images/loginbg.jpg);
    overflow: hidden;
    min-width: 1200px;
  }

  .logo {
    width: 159px;
    height: 85px;
    padding-bottom: 20px;
  }

  .logo img {
    width: 155px;
    height: 85px;
    position: absolute;
    top: 0px;
    left: 0px;
    padding-left: 7px;
  }

  .logo .version {
    position: absolute;
    left: 186px;
    top: 70px;
    color: #eaecee;
    font-size: 18px;
  }

  .login-container {
    width: 579px;
    height: 500px;
    /*background:rgba(255,25,0,0.3);*/
    position: absolute;
    top: 50%;
    left: 27%;
    -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, .1);
    -moz-box-shadow: 0 0 15px rgba(0, 0, 0, .1);
    /*box-shadow: 0 0 15px rgba(0, 0, 0, .1);*/
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    border-radius: 10px;
    /*filter:alpha(opacity:95);*/
    opacity: 0.95;
    -moz-opacity: 0.95;
    -khtml-opacity: 0.95;
  }

  .login-container .login-main .title {
    font-size: 30px;
    line-height: 35px;
    color: #333;
    margin-top: 6px;
    margin-bottom: 22px;
    text-align: left;
    font-family: 'bmwRg'
  }

  .login-container .login-main .title-password {
    font-size: 30px;
    line-height: 55px;
    color: #333;
    margin-bottom: 26px;
    text-align: left;
    font-family: 'bmwRg'
  }

  .login-container .login-main .p2 {
    font-size: 24px;
    color: #6DD3FF;
    margin-bottom: 55px;
    letter-spacing: 1px;
    padding-left: 4px;
  }

  .login-container .login-main .input-box {
    width: 310px;
    height: 64px;
    padding: 0 6px;
    margin-bottom: 21px;
    position: relative;
    clear: both;
  }

  .login-container .login-main .input_clear {
    width: 20px;
    height: 20px;
    background: url(../../assets/images/closeIcon.png) no-repeat;
    display: none;
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 48px;
    z-index: 999;
  }

  .login-container .login-main .input-box img {
    float: left;
    width: 20px;
    height: 16px;
    margin-top: 12px;
    margin-bottom: 7px;
  }

  .login-container .login-main .input-box .tip {
    display: block;
    width: 100%;
    height: 28px;
  }

  .login-container .login-main .input-box .border {
    width: 370px;
    height: 2px;
    background: -ms-linear-gradient(left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    position: absolute;
    top: 63px;
  }

  .login-container .login-main .password-box .border {
    top: 65px;
  }

  .login-container .login-main .input-box p {
    height: 28px;
    font-size: 24px;
    color: #FFFFFF;
    float: left;
  }

  .login-container .login-main .password-box {
    margin-bottom: 0px;
  }

  .login-container .login-main .form-control {
    padding-left: 10px;
    width: 260px;
    background: none;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    float: left;
    border: none;
    font-family: 'bmwRg';
    position: absolute;
    z-index: 0;
    color: #fff;
    caret-color: red;
  }

  input {
    color: red;
  }

  input::first-line {
    color: #333;
  }

  .login-container .login-main .clear {
    width: 11px;
    height: 11px;
    display: block;
    float: left;
    background: url(../../assets/images/close.png) no-repeat;
    margin-top: 15px;
    display: none;
    cursor: pointer;
  }

  .form-control::-moz-placeholder {
    color: #ccc;
    font-size: 16px;
  }

  .form-control:-ms-input-placeholder {
    color: #ccc;
    font-size: 16px;
  }

  .form-control::-webkit-input-placeholder {
    color: #ccc;
    font-size: 16px;
  }

  .login-container .login-main .login-submit, .login-container .login-main .change-password {
    width: 400px;
    height: 60px;
    background: rgba(255, 255, 255, 0);
    color: #fff;
    font-size: 48px;
    border: none;
    font-family: 'bmwRg';
    cursor: pointer;
    text-align: left;
  }

  .login-container .login-main .login-submit {
    text-align: left;
  }

  .login-container .login-main .login-submit span {
    display: inline-block;
    width: 100%;
    height: 55px;
    line-height: 55px;
    background-size: 12px 24px;
  }

  .login-container .login-main .login-submit span img, .login-container .login-main .change-password span img {
    position: relative;
    right: -10px;
    width: 12px;
    height: 24px;
  }

  .login-container .login-main .borderBlue {
    width: 100%;
    height: 4px;
    margin-top: 20px;
    background: -ms-linear-gradient(right, rgba(45, 157, 234, 0.00) 0%, #2D9DEA 15%, #1464D0 100%);
  }

  .login-container .login-main .login-submit .loading, .login-container .login-main .change-password .loading {
    color: #FFF;
  }

  .login-container .login-main .contact, .login-container .login-main .contact a {
    padding-top: 15px;
    text-align: left;
    padding-left: 2px;
    font-size: 18px;
    color: #FFF;
    letter-spacing: 0.8px;
  }

  .login-container .notice {
    float: left;
    line-height: 30px;
    font-size: 14px;
    color: #ed3e3e;
    height: 60px;
    width: 100%;
  }

  .login-container .notice-error {
    float: left;
    line-height: 30px;
    font-size: 14px;
    color: #f00;
    height: 30px;
    width: 100%;
  }

  .login-container .notice-tip {
    width: 322px;
    margin: 0 auto;
    float: left;
    line-height: 24px;
    font-size: 14px;
    color: #333;
    margin-top: 10px;
  }

  .icr-label {
    position: relative;
    display: inline-block;
  }

  .icr-hidden {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .icr-input {
    position: absolute;
    display: block;
    top: -20px;
    left: -20px;
  }

  .icr-text {
    display: inline;
    vertical-align: middle;
    font-size: 14px;
    color: #666;
    padding-left: 5px;
  }

  .icr-item {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }

  /* Sprite positions */
  .icr-label .type_checkbox {
    background-position: 0 0;
  }

  .icr-label:hover .type_checkbox {
    background-position: -50px 0;
  }

  .icr-label.checked .type_checkbox {
    background-position: -150px 0;
  }

  .icr-label.checked:hover .type_checkbox {
    background-position: -150px 0;
  }

  .icr-label.disabled {
    opacity: 0.5;
  }

  .lt-ie9 .icr-label.disabled {
    filter: alpha(opacity=50);
  }

  .icr-label.disabled .type_checkbox {
    background-position: 0 0 !important;
  }

  .icr-label.checked.disabled .type_checkbox {
    background-position: -100px 0 !important;
  }

  .icr-label {
    padding-right: 2px;
    margin: 0 5px 5px 0;
  }

  .icr-item {
    width: 21px;
    height: 21px;
    background: url(../../assets/images/icr-green-skin.png) no-repeat;
  }

  .icr-label.disabled {
    opacity: 0.4;
  }

  .icr-label.focused .type_checkbox:after {
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .icr-label.focused .type_radio:after {
    -webkit-border-radius: 18px;
    -moz-border-radius: 18px;
    border-radius: 18px;
  }

  .rememberPwd {
    line-height: 21px;
    margin-top: 22px;
  }

  label {
    margin-right: 20px !important;
  }

  .loginMask {
    background: url(../../assets/images/loginMaskBg.png);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .loginFrame {
    width: 280px;
    height: 200px;
    background: #fff;
    -moz-box-shadow: 0px 0px 30px #333;
    box-shadow: 0px 0px 30px #333;
    margin: 0 auto;
    margin-top: 15%;
    border-radius: 2px;
  }

  .loginfr-right .form-group {
    margin-bottom: 15px;
  }

  .loginfr-right p {
    line-height: 90px;
    text-align: center;
  }

  .loginInput {
    border: 1px solid #ddd;
    color: #999;
    font-size: 12px;
    padding: 8px 0 8px 8px;
    width: 280px;
    background: #f1f4fb;
  }

  a.loginBtn {
    background: #4090ff;
    font-size: 14px;
    color: #fff;
    display: block;
    width: 120px;
    padding: 10px 0;
    text-align: center;
    border-radius: 2px;
    text-decoration: none;
    margin: 0 auto;
  }

  a.loginBtn:hover {
    color: #fff;
    text-decoration: none;
  }

  .loginMask .closeBtn {
    overflow: hidden;
  }

  .loginMask .closeBtn img {
    float: right;
    margin-right: 20px;
    margin-top: 20px;
  }

  ::-ms-clear, ::-ms-reveal {
    display: none;
  }

  .cursor-blink {
    background-color: red;
    color: #000;
  }

  .cursor-blink {
    animation: 1s steps(1, start) 0s normal none infinite running blink;
  }
</style>
