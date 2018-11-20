<template>
  <div id="Header">
    <div class="topHead">
      <div class="logo"><a href="javascript:void(0)"><img src="../../assets/images/panLogo.png"></a></div>
      <div class="price-report">
        <!--<ul>-->
          <!--<li><a href="javascript:void(0)" class="selected">Price Ladder</a></li>-->
          <!--<li><a href="javascript:void(0)" class="report" style="color:#808080">Report</a></li>-->
          <!--<li><a href="bmwProduct.html">Master Data</a></li>-->
          <!--&lt;!&ndash; <li><a href="#">Report</a></li> &ndash;&gt;-->
        <!--</ul>-->
        <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @open="handleSelect">
          <el-menu-item index="/priceLadder" route>Price Ladder</el-menu-item>
          <el-menu-item index="2" disabled>Report</el-menu-item>
          <el-menu-item index="/bmwProduct/masterDateBmw">Master Data</el-menu-item>
        </el-menu>
      </div>
      <div class="master-user">
        <ul>

          <li>
            <div class="dropdown">
              <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">{{username}}<span class="caret"></span> </button>
              <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                <li role="presentation"> <a role="menuitem" tabindex="-1" href="javascript:void(0)" @click="logout">Exit</a> </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  username: '',
  data () {
    return {
      activeIndex: 'priceLadder'
    }
  },
  created () {
    this.username = localStorage.username
  },
  methods: {
    handleSelect () {
      if (this.activeIndex === '1') {
        this.$router.push({path: `/priceLadder`})
      } else if (this.activeIndex === '3') {
        this.$router.push({path: `/bmwProduct`})
      }
    },
    logout () {
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      // 删除cookie
      this.setCookie('role', '', -1)
      this.setCookie('accessKey', '', -1)
      this.setCookie('displayName', '', -1)
      this.setCookie('companyId', '', -1)
      this.$router.push({path: `/login`})
    }
  }
}
</script>
<style scoped lang="less">
  header{
    height:80px !important;
  }
  .topHead {
    font-family: 'bmwRg';
    width: 100%;
    height: 80px;
    background: #fff;
    border-bottom: solid 1px #e9e8e5;
    .logo {
      padding-left: 20px;
      line-height: 80px;
      float: left;
      width: auto;
      img{
       vertical-align:middle;
      }
    }
    .price-report, .master-user {
      font-family: 'bmwRg';
      line-height: 78px;
      font-size: 16px;
      float: left;
    }
    .master-user {
      float: right;
      padding-right: 20px;
      ul{
        top:54px;
      }
      .dropdown {
        .caret {
          background: url(../../assets/images/Dropdown.png) no-repeat;
          width: 12px;
          height: 7px;
          border: none;
          margin-left: 5px;
        }
      }
    }
    .price-report ul {
      margin-left:10px;
    }
    .master-user .btn {
      padding: 0;
      font-size: 20px;
      background: #fff;
      margin-top: -4px;
    }
    .master-user .dropdown .caret {
      background: url(../../assets/images/Dropdown.png) no-repeat;
      width: 12px;
      height: 7px;
      border: none;
      margin-left: 5px;
    }
    .caret::after {
      content: "";
      position: absolute;
      top: -6px;
      right: -4px;
      border-top: 4px solid #fff;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
    .master-user ul li{
      list-style: none;
    }
  }
</style>
