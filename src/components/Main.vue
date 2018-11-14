<template>
  <div class="main">
    <!-- priceInfoTitle 开始 -->
    <div class="priceInfoTitle">
      <div class="memuAdd" id="addNewVehicleMask" @click="addNewVehicleMaskVisible = true">
        <i class="menu" id="AddNewVehicle"></i>
      </div>
      <p>Select Vehicles</p>
      <div class="select-box" style="position: relative;">
        <div class="versionCloseIcon" @click="clearVersion()"></div>
        <label></label>
        <el-select class="select" v-model="version" default-first-option placeholder="Select version"
                   @change="loadVersion(),createArrow()" @clear="clearAll()">
          <el-option
            v-for="item in versionList"
            :key="item.id"
            :label="item.versionName | versionNameFilter"
            :value="item.id">{{ item.versionName }}&nbsp;&nbsp;{{item.yearMonth}}
          </el-option>
        </el-select>
      </div>

      <span class="saveTime">
        <span class="savTimTex">Saved Time:</span>
        <span class="saveTimeBorderB"><b id="showSavedTime">{{nowDate}}</b></span>
      </span>
      <div class="checkbox">
        <!-- `checked` 为 true 或 false -->
        <label>
          <input type="checkbox" v-model="tpShowFlg"> Transaction Price
        </label>
      </div>
      <!-- 以下为checkbox,需要留着 -->
      <div class="buttonBox">
        <a href="javascript:void(0)"
           v-bind:class="{gray : carScreen.carLanes.length == 0, blue: carScreen.carLanes.length > 0}" class="btn"
           @click='carScreen.carLanes.length > 0 ? saveVersionVisible = true : "",fadeCor()'>Save</a>
        <a href="javascript:void(0)"
           v-bind:class="{gray : carScreen.carLanes.length == 0, blue: carScreen.carLanes.length > 0}" class="btn"
           @click='carScreen.carLanes.length > 0 ? clearAllVisible = true : ""'>Clear all</a>
        <a href="javascript:void(0)"
           v-bind:class="{gray : carScreen.carLanes.length == 0, blue: carScreen.carLanes.length > 0}"
           class="btn gray download">Export</a>
      </div>
      <!-- 以上为checkbox结束,需要留着 -->

    </div>
    <!-- priceInfoTitle 结束 -->
    <add-new-vehicle-mask :addNewVehicleMaskVisible="addNewVehicleMaskVisible"
                          @closeDialog="closeDialog"></add-new-vehicle-mask>
    <clear-all v-on:confirmClearAll="confirmClearAll" :clearAllVisible='clearAllVisible'
               @closeClearAll='closeClearAll'></clear-all>
    <save-version :tpShowFlg='tpShowFlg' v-on:changeSaveVersion='changeSaveVersion' :saveVersion='saveVersion'
                  :saveVersionVisible='saveVersionVisible' @closeSaveVersion='closeSaveVersion'></save-version>
  </div>
</template>

<script>
import addNewVehicleMask from './addNewVehicleMask'
import clearAll from './ClearAll'
import saveVersion from './SaveVersion'
import store from '../store'
import Bus from '../common/js/Bus'

export default {
  name: 'main',
  data () {
    return {
      addNewVehicleMaskVisible: false,
      value4: new Date(),
      username: '',
      version: '',
      versionList: [],
      saveVersion: {
        versionList: [],
        version: '',
        versionDescription: ''
      },
      nowDate: (new Date()).format('mm/dd/yyyy hh:MM:ss'),
      tpShowFlg: true,
      carScreen: this.$store.state.carScreen,
      clearAllVisible: false,
      saveVersionVisible: false
    }
  },
  created () {
    this.initSaveVersionList()
    this.username = localStorage.username
    this.getVersionList(new Date())
  },
  filters: {
    dateFilter: function (value) {
      return value.split('/')[1]
    },
    versionNameFilter: function (value) {
      if (value.length > 9) {
        return value.substring(0, 9) + '...'
      } else {
        return value
      }
    }
  },
  methods: {
    closeDialog: function () {
      this.addNewVehicleMaskVisible = false
    },
    closeClearAll: function () {
      this.clearAllVisible = false
    },
    closeSaveVersion (route) {
      if (route != null) {
        this.getVersionList(new Date())
        this.initSaveVersionList()
        for (var k in this.versionList) {
          var sel = this.versionList[k]
          if (sel.versionNumber == route.versionNumber) {
            self.version = sel.id
            break
          }
        }
      }
      this.saveVersionVisible = false
    },
    changeDate () {
      // let monthsen = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      // let monthsnumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      // setTimeout(() => {
      //   let arr = $('.el-date-editor .el-input__inner')[0].value.split('/')
      //   monthsnumber.forEach((item, i) => {
      //     if (item === arr[0]) {
      //       $('.el-date-editor .el-input__inner')[0].value = monthsen[i] + arr[1]
      //     }
      //   })
      // }, 10)
    },
    confirmClearAll: function (param) {
      if (param === 'clearAll') {
        this.clearAll()
      }
    },
    clearAll: function () {
      store.commit('CLEAR_CARSCREEN')
      store.commit('RESCALE_CARSCREEN')
      $('#showSavedTime').css('display', 'none')
      $('.priceInfoTitle .saveTime .saveTimeBorderB').css('border-bottom', '1px solid gray')
    },
    fadeCor: function () {
      $('.versionArrow').css('background-color', 'transparent')
    },
    initSaveVersionList: function () {
      this.saveVersion.versionList = []

      for (var i = 0; i < 10; i++) {
        this.saveVersion.versionList.push({
          userName: localStorage.username,
          yearMonth: (new Date()).format('yyyymm'),
          versionName: 'version' + (i + 1),
          versionNumber: (i + 1)
        })
      }

      for (var k in this.versionList) {
        var existVersion = this.versionList[k]
        if (!existVersion.versionName) {
          existVersion.versionName = 'version' + existVersion.versionNumber
        }
        this.saveVersion.versionList[existVersion.versionNumber - 1] = existVersion
      }
    },
    changeSaveVersion: function (param) {
      this.saveVersion = param
    },
    getVersionList: function (myDate) {
      var self = this
      self.versionList = []
      self.version = ''
      var dataArray = {}
      dataArray['yearMonth'] = '= ' + myDate.format('yyyymm', null)
      dataArray['comUser.userName'] = '= ' + localStorage.username
      dataArray['sort'] = 'versionNumber'
      dataArray['size'] = 9999
      this.$http.get('repo/rptVersions/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          this.versionList = res.data.rptVersions
        }
      })
    },
    loadVersion: function () {
      $('.loadingDiv').show()
      var self = this
      var wsUrl = 'priceladder/loadVersionById'
      var route = {
        versionId: this.version
      }
      if (route.versionId == '') {
        $('.loadingDiv').hide()
        return
      }
      this.$http.get(wsUrl, {
        params: route
      }).then(res => {
        if (res.status == 200) {
          $('.priceLadder').click()
          $('#showSavedTime').css('display', 'block')
          $('.versionCloseIcon').css('display', 'block')
          let createAt = res.data.datas[0].createAt
          self.nowDate = createAt.split('T')[0] + ' ' + createAt.split('T')[1].split('.')[0]
          $('.priceInfoTitle .saveTime .saveTimeBorderB').css('border-bottom', 'none')
          $('.loadingDiv').hide()
          // window.forwarePage(self.tpShowFlg)
          if (res.data.msg != null && res.data.msg != '') {
            alert(res.msg)
          }
          if (res.data.code != '0') {
            return
          }
          store.commit('CLEAR_CARSCREEN')
          if (res.data.datas.length > 0) {
            self.tpShowFlg = eval(res.data.datas[0].tpShowFlg)
          }
          for (var i in res.data.datas) {
            var cars = res.data.datas[i].cars
            for (var j in cars) {
              cars[j].showMixPercentage = cars[j].mixPercentage * 100
              cars[j].showDiscountPercentage = cars[j].discountPercentage * 100
            }
            self.carScreen.addCarLane(res.data.datas[i])
            $('.versionNumber').val(res.data.datas[i].rptVersion.versionName)
          }
          self.carScreen.rescale()
        }
      })
    },
    createArrow () {
      Bus.$emit('createArrow')
    },
    clearVersion: function () {
      this.version = ''
      store.commit('CLEAR_CARSCREEN')
      this.carScreen.rescale()
      $('#showSavedTime').css('display', 'none')
      $('.versionCloseIcon').css('display', 'none')
      $('.priceInfoTitle .saveTime .saveTimeBorderB').css('border-bottom', '1px solid gray')
      $('#saveVersionModal').modal('hide')
    },
  },
  mounted () {
    this.changeDate()
  },
  components: {
    addNewVehicleMask,
    clearAll,
    saveVersion
  }
}
</script>

<style scoped lang="less">
  .main {
    width: 100%;
    // height: 100%;
    position: absolute;
  }

  .el-main {
    padding: 0px;
  }

  .memuAdd {
    border-top: solid 1px #e9e8e5;
    margin: 0 26px;
    position: relative;
  }

  .memuAdd .menu {
    background: url(../assets/images/log.png) no-repeat;
    background-size: contain;
    width: 122px;
    height: 21px;
    display: block;
    position: absolute;
    left: -3px;
    top: 16px;
    cursor: pointer;
  }

  .priceInfoTitle {
    position: absolute;
    height: 57px;
    display: flex;
    margin: 0px 80px 0px 0px;
    width: 100%;
    background: #fff;
    z-index: 999;
  }

  .priceInfoTitle p {
    font-size: 20px;
    float: left;
    line-height: 56px;
    color: #666;
    margin: 0;
  }

  .priceInfoTitle .select-box {
    float: left;
    margin-left: 10px;
    margin-top: 18px;
    width: 180px;
  }

  .priceInfoTitle .select-box label {
    display: inline-block;
    float: left;
    margin-right: 10px;
    font-size: 16px;
    color: #606060;
    font-weight: normal;
  }

  .priceInfoTitle .select-box .select {
    width: 178px;
    height: 20px;
    float: left;
  }

  .versionCloseIcon {
    position: fixed;
    top: 100px;
    right: 10px;
    width: 15px;
    height: 14px;
    background: url(../assets/images/sixDel.png) no-repeat 0px 0px;
    background-size: contain;
    cursor: pointer;
    z-index: 999;
  }

  .el-input--suffix .el-input__inner {
    border: none;
  }

  .el-input__suffix {
    right: 2px;
  }

  .el-select-dropdown__item {
    font-size: 14px;
    color: #606266;
    height: 30px;
    line-height: 30px;
  }

  .priceInfoTitle .saveTime {
    display: inline-block;
    width: 306px;
    height: 40px;
    line-height: 57px;
    font-size: 20px;
    margin-right: 23px;
    color: #666;
    padding-left: 17px;
  }

  .priceInfoTitle .saveTime .savTimTex {
    float: left;
    width: 37%;
  }

  .priceInfoTitle .saveTime .saveTimeBorderB {
    float: left;
    width: 63%;
    height: 38px;
    border-bottom: 1px solid gray;
  }

  .priceInfoTitle .saveTime b {
    font-weight: normal;
  }

  .priceInfoTitle .checkbox {
    margin-top: 17px !important;
    font-size: 20px;
    color: #666;
  }

  .priceInfoTitle .checkbox input:active {
    background-color: #fff;
  }

  .priceInfoTitle .buttonBox {
    position: relative;
    margin-left: 26%;
  }

  .priceInfoTitle .buttonBox .btn {
    display: inline-block;
    margin-top: 12px;
    padding: 0;
    width: 142px;
    height: 35px;
    line-height: 35px;
    color: #3b60a7;
    text-align: center;
    font-size: 18px;
    border-radius: 10px;
    margin-right: 10px;
    background-color: #FFF;
    border: 1px solid #3577B1;
  }

  .priceInfoTitle .buttonBox .blue {
    background: linear-gradient(90deg, #2D9DEA 0%, #1464D0 98%);
    color: #fff;
  }

</style>
