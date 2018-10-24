<template>
  <el-dialog
    :visible.sync="addNewVehicleMaskVisible"
    center
    class="sixColumnMain"
    width='100%'
    top='0vh'
    show-close=false
    @close='closeDialog'
    >
      
        <div class="sixColumnTop">
          <h3 class="leftTit">Select Vehicles</h3>
          <button type="submit" class="sixNext" style="display: block;">Compare</button>
          <a href="javascript:void(0)" class="addNewVehicleBtn">Add New Vehicle</a>
          <!-- <span class="titDesc">Compare<span class="titDescNum">{{menuhub.blockList.length}}</span></span> -->
          <span class="titDesc">Number of E-series Selected:<span class="titDescNum">3</span><img src="../assets/images/car.png"/></span>
          <!-- 点击关闭模态框 -->
          <span id="closeModel">Clear all</span>
          <!-- 新加的clearAll功能 -->
            <span id="clearAllMultiSelection"><img src="../assets/images/delete-icon.png"></span>
        </div>
        <!-- <div class="SixColumnBottom">
          <div class="sixColumnLeft">
            <div id="sidebar">
              <ul>
                <li v-for="(menu, i) in menuhub.menuList"><div class="iconLogo"><img v-bind:src="'../assets/images/' + menuhub.menuList[i].brandNameEn + '.png'"/></div><a v-bind:class="getMenuhubBgColorClass(menu.brandNameEn)" href="javascript:void(0)"><i>{{ menu.brandNameEn }}</i><span class="icoArrowTop"></span></a>
                  <ul>
                    <li v-for="(subMenu, j) in menu.subMenuList"> <a href="javascript:void(0)">{{ subMenu.seriesOrModel }}</a>
                      <ul>
                        <li v-for="(detail, k) in subMenu.eseriesOrEngineList">
                          <el-tooltip open-delay="1000" class="item" effect="dark" v-bind:content="detail" placement="top" offsetY="10">
                            <el-button v-on:click="handleDblClick(menu.brandNameEn, subMenu.seriesOrModel, detail, menu.bmwFlg)" class="eseriesOrModerRangeName">{{detail}}</el-button>
                          </el-tooltip>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="sixColumnRight">
            <div class="AddNewVehicleBox">
              <ul ref='parant'>
                <draggable v-model="menuhub.blockList">
                <li v-for="(carLane, i) in menuhub.blockList" v-bind:class="getMenuhubBgColorClass(carLane.brandNameEn)">
                  <div class="vehicleBoxTit">
                    <div class="left"> <img v-bind:src="'./images/' + carLane.brandNameEn + '.png'"/> <span>{{carLane.bmwFlg ? carLane.seriesNameEn : carLane.model}}</span> </div>
                    <div class="right"><img src="images/addSix.png" class="edit" @click="openMenuhubNewCar(carLane, i)">
                      <div class="datepicker">
                        <form action="" class="form-horizontal">
                          <fieldset>
                            <div class="control-group">
                              <div v-bind:id="'blockDate' + i" class="controls input-append date form_datetime my-date" data-date-format="mm yyyy" data-link-field="dtp_input1">
                                <input size="16" type="text" style="border:none;font-size:14px" value="" readonly>
                                
                                <span class="add-on"><i class="icon-th"></i></span> </div>
                              </div>
                          </fieldset>
                        </form>
                      </div>
                      <span id="closeDate"><img src="images/delSix.png" class="closeIcon" @click="handleRemoveColumn(i)"></span>
                       </div>
                  </div>
                  <div class="vehicleCheckBox">
                    <div class="selectedTip">
                      <span class="selectContain">Number of Vehicles Selected:</span>
                      <pan class="selectedNum" v-on:mouseover="selectContainShow()" v-on:mouseout="selectContainHide()">{{carLane.checkedCars.length}}</pan>
                    </div>
                    <template>
                      <el-checkbox :indeterminate="carLane.isIndeterminate" v-model="carLane.checkAll" @change="handleCheckAllChange($event, carLane)">{{carLane.bmwFlg ? carLane.eseriesNameEn : carLane.engine}}
                      </el-checkbox>
                      <el-checkbox-group v-model="carLane.checkedCars" @change="handleCheckedCarsChange($event, carLane)">
                        <el-checkbox v-for="car in carLane.cars" :label="car" :key="car" :value="car">
                          <p class="text">
                            <el-tooltip open-delay="1000" class="item" effect="dark" v-bind:content="car.carNameEn" placement="top-start">
                              <el-button class="name">{{car.carNameEn}}</el-button>
                            </el-tooltip>
                            <span class="price">{{accounting.formatMoney(car.rrPrice, "¥", 0)}}</span>
                            
                          </p>
                        </el-checkbox>
                      </el-checkbox-group>
                    </template>
                  </div>
                </li>
                </draggable>
              </ul>
            </div>
          </div>
        </div> -->
    
    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>

</template>

<script>
export default {
  name: 'addNewVehicleMask',
  data () {
    return {
      menuhub : {
          defaultSelection: true,
          menuList : [],
          blockList : [],

          editCar: {
              bmwFlg: true,
              brandNameEn: "",
              seriesNameEn: "",
              eseriesNameEn: "",
              packageCode: "",
              model: "",
              engine: "",
              rrPrice: 0,
              tsPrice: 0,
              carNameEn: "",
              nickname: "",
              mixPercentage: 0,
              discountPercentage: 0,
              powerHP: 0,
              showMixPercentage: 0,
              showDiscountPercentage: 0,
              yearMonth: "",
              laneIndex : 0,
              carIndex : 0,
          },
        },
    }
  },
  props: {
    addNewVehicleMaskVisible: Boolean
  },
  methods:{
    closeDialog(){
      
    },
    getMenuhubBgColorClass : function(brand) {
        if (brand === 'BMW') {
          return "bg-blue";
        } else if (brand === 'Audi') {
          return "bg-green";
        } else if (brand === 'MB') {
          return "bg-red";
        }
    },
    getMenuhubList : function() {
        var self = this;
        $.ajax({
          url: '/priceladder/retrieveMenuList',
          contentType: 'application/json;charset=utf-8',
          type: 'GET',
          data: {},
          dataType: 'json',
          cache: false,
          async: false,
          beforeSend: function (request) {
            request.setRequestHeader('Authorization', localStorage.token)
          },
          success: function (data) {
            console.log("hahahahhaahah")
            self.menuhub.menuList = data;
          },
          error: function (result, status) {
            self.msgType = '0'
            self.msg = commonJs.handleAjaxError(result)
            self.showMsgModal = true
          },
        })
      },
      initComponent : function(){
        var self = this;
        self.getMenuhubList();
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
  .sixColumnMain {
    width: 93%;
    /*width: 93%;*/
    /*height: 935px;*/
    height: 83%;
    background: #fafafa;
    margin:40px auto;
  }
  .sixColumnMain .sixColumnTop{
    width:100%;
    height: 63px;
    position: relative;
    box-sizing: border-box;
  }
  .sixColumnMain .sixColumnTop .leftTit {
    width: 200px;
    height:54px;
    line-height: 21px;
    padding-left: 32px;
    padding-top: 30px;
    font-size: 18px;
    font-family: BMWTypeCondensedRegular;
    margin-top: 0;
    margin-bottom: 0px;
    font-weight: bold;
  }
  .sixNext{
    position:absolute; 
    right:49px; 
    top:15px;
    border:0; 
    width:142px; 
    height:35px;
    line-height: 35px;
    text-align: center; 
    color: #fff;
    font-family: BMWTypeCondensedRegular;
    font-size: 18px;
    background: linear-gradient(90deg, #2D9DEA 0%, #1464D0 98%);
    box-shadow: 0 2px 4px 0 #E7E7E8;
    border-radius: 10px;
    z-index:999
  }
  a, a:hover {
    text-decoration: none;
  }
  .sixColumnTop .addNewVehicleBtn {
    box-sizing: border-box;
    position: absolute;
    top: 15px;
    right: 220px;
    width: 140px;
    height: 35px;
    padding-top:6px;  
    color: #3B60A7;
    font: 16px/21px BMWTypeCondensedRegular;
    background-color: #fff;
    text-align: center;
    border: 1px solid #3577B1;
    border-radius: 10px;
  }
  .sixColumnTop .titDesc {
    position: absolute;
    right:550px;
    top:20px;
    font-family: 'bmwRgBd';
    font-size: 15px;
    color: #555;
  }
  .sixColumnTop .titDescNum{
    font-size:30px; 
    margin:0 8px; 
    vertical-align: middle;
  }
  .sixColumnTop #closeModel{
    box-sizing: border-box;
    position: absolute;
    top:15px;
    right:388px;
    width:140px;
    height:35px;
    padding-top: 6px;
    color: #3B60A7;
    font: 16px/21px BMWTypeCondensedRegular;
    background: #fff;
    text-align: center;
    border: 1px solid #3577B1;
    border-radius: 10px;
    cursor: pointer;
  }
  #clearAllMultiSelection{
    position: absolute;
    top:22px;
    right:20px;
    cursor: pointer;
  }
  .sixColumnMain .sixColumnLeft {
    float: left;
    width: 13%;
    /*height: 860px;*/
    height:97%;
    background: #fafafa;
    border-right: solid 1px #e9e8e5;
    position: relative;
  }
  #sidebar {
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    z-index: 3;
    top: 0px;
    left: 20px;
    bottom: 0;
    width: 93%;
    /*height: 853px;*/
    height:100%;
    padding-top:20px;
    padding-left: 11px;
    background-color: #FFF;
    box-shadow: 0 2px 4px 0 #E4E4E4;
    border-radius: 4px;
  }
  ol, ul{
    list-style:none;
  }
  #sidebar>ul>li {
    position: relative;
    border-bottom: 2px solid #fff;
  }
  .iconLogo{
    float: left;
    top:10px;
    left:20px;
    width:20px;
    height: 20px;
    z-index: 999999;
    padding:8px 0px 0px 5px;
    background-color: rgba(0,0,0,0);
  }
  .iconLogo img{
    width: auto;
    height: auto;

  }
  #sidebar>ul>li>a {
    width:177px;
    height: 37px;
    line-height: 32px;
    display: block;
    text-decoration: none;
    color: #333;
    padding-left: 30px;
    background: #fff url(../assets/images/arr-r.png) no-repeat 154px 12px;
  }
  #sidebar>ul>li>a.bg-blue{
    border-left: 2px solid #274E7C;
  }
  #sidebar>ul>li>a>i {
    color: #606060;
    display: block;
    width: 51px;
      height: 19px;
      line-height: 19px;
    font-size: 14px;
    text-align: center;
    border-radius: 10px;
    position: relative;
    top: 9px;
    font-style: normal;
  }
  #sidebar>ul>li>ul>li{
    position:relative;
  }
  #sidebar>ul>li>ul>li>a {
    height: 42px;
    line-height: 42px;
    display: block;
    text-decoration: none;
    color: #333;
    padding-left: 48px;
    background: #ffffff url(../assets/images/arr-r.png) no-repeat 155px 12px;
    border-right: solid 1px #e9e8e5;
  }
  #sidebar>ul>li>ul>li>ul>li {
    height: 42px;
    line-height: 42px;
  }
  #sidebar>ul>li>ul>li>ul>li .eseriesOrModerRangeName {
    height: 42px;
    width:100%;
    text-align: left;
    line-height: 42px;
    display: block;
    text-decoration: none;
    padding:0px 0px 0px 80px;
    color: #666;
    font-size: 14px;
    background-color: #fff;
    font-weight: bold;
    border:none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
