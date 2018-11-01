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
        <el-select class="select" v-model="version" allow-create="" default-first-option placeholder="Select version"
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
      <el-date-picker
        v-model="value4"
        type="month"
        format="MM/yyyy"
        @change="changeDate"
        placeholder="选择月">
      </el-date-picker>
      <div class="checkbox">
        <!-- `checked` 为 true 或 false -->
        <label>
          <input type="checkbox" v-model="tpShowFlg"> Transaction Price
        </label>
      </div>
      <!-- 以下为checkbox,需要留着 -->
      <div class="buttonBox">
        <a href="javascript:void(0)" class="btn" @click="fadeCor()">Save</a>
        <a href="javascript:void(0)" class="btn">Clear all</a>
        <a href="javascript:void(0)" class="btn gray download">Export</a>
      </div>
      <!-- 以上为checkbox结束,需要留着 -->

    </div>
    <!-- priceInfoTitle 结束 -->
    <add-new-vehicle-mask :addNewVehicleMaskVisible="addNewVehicleMaskVisible" @closeDialog="closeDialog"></add-new-vehicle-mask>
  </div>
</template>

<script>
  import VueNumeric from 'vue-numeric'
  import addNewVehicleMask from './addNewVehicleMask'
  import CarScreen from '../common/js/carscreen.js'
  import VeeValidate, { Validator } from 'vee-validate';
export default {
  name: 'main',
  data () {
    return {
      addNewVehicleMaskVisible: false,
      value4: new Date()
    }
  },
  filters: {
    dateFilter: function (value) {
      return value.split('/')[1]
    }
  },
  methods: {
    closeDialog: function () {
      this.addNewVehicleMaskVisible = false
    },
    changeDate () {
      let monthsen = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let monthsnumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
      setTimeout(() => {
        let arr = $('.el-date-editor .el-input__inner')[0].value.split('/')
        monthsnumber.forEach((item, i) => {
          if (item === arr[0]) {
            $('.el-date-editor .el-input__inner')[0].value = monthsen[i] + arr[1]
          }
        })
      }, 10)
    }
  },
  mounted () {
    this.changeDate()
  },
  components: {
    addNewVehicleMask
  }
}
</script>

<style scoped lang="less">
  main {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    overflow-x: hidden;
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
    position: relative;
    height: 57px;
    display: flex;
    margin: 0px 80px 0px 0px;
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
    position: absolute;
    top: 5px;
    right: 18px;
    width: 15px;
    height: 14px;
    background: url(../assets/images/sixDel.png) no-repeat 0px 0px;
    background-size: contain;
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
    /*float: right;*/
    position: absolute;
    top: -3px;
    right: -65px;
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
</style>
