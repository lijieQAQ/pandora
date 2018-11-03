<template>
  <div>
    <el-dialog
      :visible.sync="addNewVehicleMaskVisible"
      center
      class="sixColumnMain"
      width='100%'
      top='0vh'
      :show-close = false
    >
      <div class="sixColumnTop">
        <h3 class="leftTit">Select Vehicles</h3>
        <button type="submit" class="sixNext" style="display: block;"
          @click="handleSubmit(),addNewVehicleAssemVisible = false">Compare
        </button>
        <a href="javascript:void(0)" class="addNewVehicleBtn" @click="addNewVehicleAssemVisible = true">Add New
          Vehicle</a>
        <span class="titDesc">
          Number of E-series Selected:
          <span class="titDescNum">{{menuhub.blockList.length}}</span>
          <img src="../assets/images/car.png"/>
        </span>
        <!-- 点击关闭模态框 -->
        <span id="closeModel" @click="handleRemoveAllColumn(menuhub.blockList.length)">Clear all</span>
        <!-- 新加的clearAll功能 -->
        <span id="clearAllMultiSelection" @click="closeDialog"><img src="../assets/images/delete-icon.png"></span>
      </div>
      <div class="SixColumnBottom">
        <div class="sixColumnLeft">
          <div id="sidebar">
            <ul>
              <!-- <li v-for="(menu, i) in this.menuhub.menuList"></li> -->
              <li v-for="(menu, n) in this.menuhub.menuList" :key="n">
                <div class="iconLogo">
                  <img v-bind:src="'../assets/images/' + menu.brandNameEn + '.png'"/>
                </div>
                <a v-bind:class="getMenuhubBgColorClass(menu.brandNameEn)" href="javascript:void(0)">
                  <i>{{ menu.brandNameEn }}</i>
                  <span class="icoArrowTop"></span>
                </a>
                <ul>
                  <li v-for="(subMenu, j) in menu.subMenuList" :key="j">
                    <a href="javascript:void(0)">{{ subMenu.seriesOrModel}}</a>
                    <ul>
                      <li v-for="(detail, k) in subMenu.eseriesOrEngineList" :key="k">
                        <el-tooltip :open-delay=1000 class="item" effect="dark" v-bind:content="detail" placement="top"
                          offsetY="10">
                          <el-button
                            v-on:click="handleDblClick(menu.brandNameEn, subMenu.seriesOrModel, detail, menu.bmwFlg)"
                            class="eseriesOrModerRangeName">{{detail}}
                          </el-button>
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
                <li v-for="(carLane, i) in menuhub.blockList"
                    v-bind:class="getMenuhubBgColorClass(carLane.brandNameEn)" :key="i">
                  <div class="vehicleBoxTit">
                    <div class="left">
                      <img v-bind:src="'../assets/images/' + carLane.brandNameEn + '.png'"/>
                      <span>{{carLane.bmwFlg ? carLane.seriesNameEn : carLane.model}}</span>
                    </div>
                    <div class="right">
                      <img src="../assets/images/addSix.png" class="edit" @click="openMenuhubNewCar(carLane, i)">
                      <div class="datepicker" v-bind:id="'blockDate' + i">
                        <el-date-picker
                          v-model=date[i]
                          @change="(value) => blockTimeChange(value, i)"
                          type="month"
                          format="M/yyyy"
                          :editable="false"
                        >
                        </el-date-picker>
                        <!-- <el-date-picker type="month" placeholder="选择月" size="mini"  align="center" default-value v-bind:id="'blockDate' + i">
                        </el-date-picker> -->
                        <!-- <form action="" class="form-horizontal">
                          <fieldset>
                            <div class="control-group">
                              <div v-bind:id="'blockDate' + i" class="controls input-append date form_datetime my-date" data-date-format="mm yyyy" data-link-field="dtp_input1">
                                <input size="16" type="text" style="border:none;font-size:14px" value="" readonly>

                                <span class="add-on"><i class="icon-th"></i></span> </div>
                              </div>
                          </fieldset>
                        </form> -->
                      </div>
                      <span id="closeDate">
                    <img src="../assets/images/delSix.png" class="closeIcon" @click="handleRemoveColumn(i)">
                  </span>
                    </div>
                  </div>
                  <div class="vehicleCheckBox">
                    <div class="selectedTip">
                      <span class="selectContain">Number of Vehicles Selected:</span>
                      <span class="selectedNum" v-on:mouseover="selectContainShow()"
                            v-on:mouseout="selectContainHide()">{{carLane.checkedCars.length}}</span>
                    </div>
                    <template>
                      <el-checkbox :indeterminate="carLane.isIndeterminate" v-model="carLane.checkAll"
                          @change="handleCheckAllChange($event, carLane)">{{carLane.bmwFlg ?
                        carLane.eseriesNameEn : carLane.engine}}
                      </el-checkbox>
                      <el-checkbox-group v-model="carLane.checkedCars"
                          @change="handleCheckedCarsChange($event, carLane)">
                        <el-checkbox v-for="(car,m) in carLane.cars" :label="car" :key="m" :value="car">
                          <p class="text">
                            <el-tooltip :open-delay=1000 class="item" effect="dark" v-bind:content="car.carNameEn"
                                  placement="top-start">
                              <el-button class="name">{{car.carNameEn}}</el-button>
                            </el-tooltip>
                            <span class="price">{{accounting.formatMoney(car.rrPrice, '¥', 0)}}</span>
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
      </div>

      <span slot="footer" class="dialog-footer"></span>
      <!-- <add-New-Vehicle-Assem :addNewVehicleAssemVisible="addNewVehicleAssemVisible"></add-New-Vehicle-Assem> -->
    </el-dialog>
    <add-new-vehicle-assem :addNewVehicleAssemVisible="addNewVehicleAssemVisible" :brandList="brandList"
                           :bmwBrandList="bmwBrandList" :bmwSeriesList="bmwSeriesList" :cmpBrandList="cmpBrandList"
                           :cmpModelList="cmpModelList" :cmpModelRangeList="cmpModelRangeList"
                           :bmwESeriesList="bmwESeriesList" :menuhub="menuhub"></add-new-vehicle-assem>
  </div>
</template>
<script>
  import format from '../common/js/dateFormat'
  import addNewVehicleAssem from './addNewVehicleAssem'
  import accounting from 'accounting'
  import store from '../store'
  import Bus from '../common/js/Bus'
  import draggable from 'vuedraggable'
export default {
  name: 'addNewVehicleMask',
  data () {
    return {
      addNewVehicleAssemVisible: false,
      date: [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
      carScreen: this.$store.state.carScreen,
      menuhub: {
        defaultSelection: true,
        menuList: [],
        blockList: [],
        editCar: {
          bmwFlg: true,
          brandNameEn: '',
          seriesNameEn: '',
          eseriesNameEn: '',
          packageCode: '',
          model: '',
          engine: '',
          rrPrice: 0,
          tsPrice: 0,
          carNameEn: '',
          nickname: '',
          mixPercentage: 0,
          discountPercentage: 0,
          powerHP: 0,
          showMixPercentage: 0,
          showDiscountPercentage: 0,
          yearMonth: '',
          laneIndex: 0,
          carIndex: 0
        }
      },
      bmwBrandList: [],
      bmwSeriesList: [],
      bmwESeriesList: [],
      cmpBrandList: [],
      cmpModelList: [],
      cmpModelRangeList: [],
      brandList: [],
      d3List:[],
      priceBoxWidth:0,
      accounting: accounting
    }
  },
  props: {
    addNewVehicleMaskVisible: Boolean
  },
  created () {
    // this.carScreen = new CarScreen();
    this.getBmwBrandList()
    this.getBmwSeriesList()
    this.getBmwESeriesList()
    this.getCmpBrandList()
    this.getCmpModelList()
    this.getCmpModelRangeList()
  },
  mounted () {
    this.incomponent()
    Bus.$on('width', priceWidth => {
        this.priceBoxWidth = priceWidth;
      })
    
  },
  updated () {

  },
  methods: {
    openAlert: function () {
      this.$message({
        message: 'there is no data in this month. Please click on other months.',
        type: 'warning',
      })
    },
    showSideList () {
      var setFlg = false
      if (setFlg) {
        return
      }
      $('#sidebar>ul>li>a').each(function () {
        $(this).parent().find('ul:first').hide()
        currentMenu = $(this)
        $(this).click(function () {
          if (currentMenu != null && currentMenu.text() != $(this).text()) {
            currentMenu.parent().find('ul:first').slideUp()
          }
          if (currentMenu != null && currentMenu.text() == $(this).text()) {
            currentMenu.parent().find('ul:first').slideUp()
            currentMenu = null
          } else {
            currentMenu = $(this)
            currentMenu.parent().find('ul:first').slideDown()
          }
          return false
        })
      })
      $('#sidebar>ul>li>ul>li>a').each(function () {
        $(this).parent().find('ul:first').hide()
        currentChildMenu = $(this)
        $(this).click(function () {
          if (currentChildMenu != null && currentChildMenu.text() != $(this).text()) {
            currentChildMenu.parent().find('ul:first').slideUp()
          }
          if (currentChildMenu != null && currentChildMenu.text() == $(this).text()) {
            currentChildMenu.parent().find('ul:first').slideUp()
            currentChildMenu = null
          } else {
            currentChildMenu = $(this)
            currentChildMenu.parent().find('ul:first').slideDown()
          }
          return false
        })
      })

      setFlg = true
    },
    
    closeDialog () {
      this.addNewVehicleMaskVisible = false
      this.$emit('closeDialog', this.addNewVehicleMaskVisible)
    },
    getMenuhubBgColorClass: function (brand) {
      if (brand === 'BMW') {
        return 'bg-blue'
      } else if (brand === 'Audi') {
        return 'bg-green'
      } else if (brand === 'MB') {
        return 'bg-red'
      }
    },
    //fuben
    handleDblClick: function (brand, seriesOrModel, eseriesOrEngine, bmwFlg) {
      var self = this
      var nowdate = (new Date()).format('yyyymm')
      var promise = this.searchRowDetailCommon(
        brand,
        seriesOrModel,
        eseriesOrEngine,
        nowdate,
        bmwFlg)
      var prdList = []
      promise.then(function (val) {
        prdList = val
        self.pushMenuhubBlockList(val, brand, bmwFlg, nowdate, seriesOrModel, eseriesOrEngine)
      })

      // 处理百分比数据

    },
    pushMenuhubBlockList: function (prdList, brand, bmwFlg, nowdate, seriesOrModel, eseriesOrEngine) {
      for (var i in prdList) {
        prdList[i].showMixPercentage = prdList[i].mixPercentage * 100
        prdList[i].showDiscountPercentage = prdList[i].discountPercentage * 100
      }
      var block = {
        brandNameEn: brand,
        bmwFlg: bmwFlg,
        seriesNameEn: bmwFlg ? seriesOrModel : '',
        eseriesNameEn: bmwFlg ? eseriesOrEngine : '',
        model: bmwFlg ? '' : seriesOrModel,
        engine: bmwFlg ? '' : eseriesOrEngine,
        yearMonth: nowdate,
        yearMonthForShow: new Date(),
        cars: prdList,
        checkAll: true,
        isIndeterminate: true,
        checkedCars: prdList,
      }
      this.menuhub.blockList.push(block)
    },
    searchRowDetailCommon: function (brand, seriesOrModel, eseriesOrEngine, yearMonth, bwmFlg) {
      if (!brand) {
        return
      }
      if (!seriesOrModel) {
        return
      }
      if (!eseriesOrEngine) {
        return
      }
      if (!yearMonth) {
        return
      }

      var myProductList = []
      if (bwmFlg) {
        myProductList = this.searchBmwProductRowDetail(brand, seriesOrModel, eseriesOrEngine, yearMonth)
      } else {
        myProductList = this.searchCmpProductRowDetail(brand, seriesOrModel, eseriesOrEngine, yearMonth)
      }
      return myProductList
    },

    searchBmwProductRowDetail: function (brand, series, eSeries, addRowDate) {
      var self = this
      var dataArray = {}
      dataArray['enabled'] = 'true'
      var seriesId = -1
      for (var i in self.bmwSeriesList) {
        if (series === self.bmwSeriesList[i].nameEn) {
          seriesId = self.bmwSeriesList[i].id
          break
        }
      }

      dataArray['bmwESeries.bmwSeries.id'] = '= ' + seriesId

      var eSeriesId = -1
      for (var i in self.bmwESeriesList) {
        var curESeries = self.bmwESeriesList[i]
        if (curESeries.bmwSeries.id == seriesId && eSeries === curESeries.nameEn) {
          eSeriesId = curESeries.id
          break
        }
      }

      dataArray['bmwESeries.id'] = '= ' + eSeriesId
      dataArray['yearMonth'] = '= ' + addRowDate
      dataArray['sort'] = 'rrPrice,desc'
      dataArray['size'] = 9999
      var returnList = []
      return new Promise(function (resolve, reject) {
        self.$http.get('repo/bmwProducts/list', {params: dataArray}).then(res => {
          if (res.status == 200) {
            resolve(res.data.bmwProducts)

          }
        })
      })
    },
    searchCmpProductRowDetail: function (brand, model, engine, addRowDate) {
      alert('zhixing')
      var self = this
      var dataArray = {}
      dataArray['enabled'] = 'true'
      var brandId = -1
      for (var i in self.cmpBrandList) {
        if (brand === self.cmpBrandList[i].nameEn) {
          brandId = self.cmpBrandList[i].id
          break
        }
      }
      dataArray['cmpBrand.id'] = '= ' + brandId
      dataArray['model'] = '= ' + model
      dataArray['modelRange'] = '= ' + engine
      dataArray['yearMonth'] = '= ' + addRowDate
      dataArray['sort'] = 'rrPrice,desc'
      dataArray['size'] = 9999
      var returnList = []

      return new Promise(function (resolve, reject) {
        self.$http.get('repo/cmpProducts/list', {params: dataArray}).then(res => {
          if (res.status == 200) {
            resolve(res.data.cmpProducts)

          }
        })
      })
    },
    getBmwBrandList: function () {
      var self = this
      var dataArray = {}
      dataArray['enabled'] = 'true'
      dataArray['size'] = 9999
      dataArray['sort'] = 'id'

      self.$http.get('repo/bmwBrands/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.bmwBrandList = res.data.bmwBrands
          self.brandList = self.brandList.concat(self.bmwBrandList)
        }
      })
    },
    getCmpBrandList: function () {
      var self = this
      var dataArray = {}
      dataArray['enabled'] = 'true'
      dataArray['size'] = 9999
      dataArray['sort'] = 'id'

      self.$http.get('repo/cmpBrands/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.cmpBrandList = res.data.cmpBrands
          self.brandList = self.brandList.concat(self.cmpBrandList)
        }
      })
    },
    getCmpModelList: function () {
      var self = this
      var dataArray = {}
      dataArray['size'] = 9999
      dataArray['sort'] = 'brandNameEn,nameEn'

      self.$http.get('repo/cmpModelVs/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.cmpModelList = res.data.cmpModelVs
        }
      })
    },
    getCmpModelRangeList: function () {
      var self = this
      var dataArray = {}
      dataArray['size'] = 9999
      dataArray['sort'] = 'brandNameEn,model,nameEn'

      self.$http.get('repo/cmpModelRangeVs/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.cmpModelRangeList = res.data.cmpModelRangeVs
        }
      })
    },
    openMenuhubNewCar: function (block, idx) {
      this.menuhub.editCar = {
        bmwFlg: block.bmwFlg,
        brandNameEn: block.brandNameEn,
        seriesNameEn: block.seriesNameEn,
        eseriesNameEn: block.eseriesNameEn,
        packageCode: block.packageCode,
        model: block.model,
        engine: block.engine,
        rrPrice: 0,
        tsPrice: 0,
        carNameEn: '',
        nickname: '',
        mixPercentage: 0,
        discountPercentage: 0,
        powerHP: 0,
        showMixPercentage: 0,
        showDiscountPercentage: 0,
        yearMonth: block.yearMonth,
        yearMonthForShow: block.yearMonthForShow.format('mmm yyyy'),
        laneIndex: idx,
        carIndex: 0,
      }
      this.clearValidator()
      // $('#menuhubEditCar').modal('show');
    },
    handleRemoveColumn: function (idx) {
      this.menuhub.blockList.splice(idx, 1)
    },
    selectContainShow: function () {
      $('.selectContain').attr('class', 'selectContainShow')
    },
    selectContainHide: function () {
      $('.selectContainShow').attr('class', 'selectContain')
    },
    handleCheckAllChange: function (val, block) {
      block.checkedCars = val ? block.cars : []
      block.isIndeterminate = false
    },
    handleCheckedCarsChange: function (value, block) {
      var checkedCount = block.checkedCars.length
      block.checkAll = checkedCount === block.cars.length
      block.isIndeterminate = checkedCount > 0 && checkedCount < block.cars.length
    },
    handleRemoveAllColumn: function (idx) {
      for (let i = 0; i <= idx; i++) {
        this.menuhub.blockList.splice(0, 1)
      }
    },
    getBmwSeriesList: function () {
      var self = this
      var dataArray = {}
      dataArray['enabled'] = 'true'
      dataArray['size'] = 9999
      dataArray['sort'] = 'nameEn'
      //
      self.$http.get('repo/bmwSeries/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.bmwSeriesList = res.data.bmwSeries
        }
      })
      //
    },
    getBmwESeriesList: function () {
      var self = this
      var dataArray = {}
      dataArray['enabled'] = 'true'
      dataArray['size'] = 9999
      dataArray['sort'] = 'nameEn'

      self.$http.get('repo/bmwESeries/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.bmwESeriesList = res.data.bmwESeries
        }
      })
    },
    incomponent: function () {
      this.$http.post('priceladder/retrieveMenuList', {}).then(res => {
        if (res.status == 200) {
          this.menuhub.menuList = res.data
        }
      })
    },
    handleSubmit: function () {
      this.tpShowFlg = false
      store.commit('CLEAR_CARSCREEN')
      for (var i in this.menuhub.blockList) {
        var block = this.menuhub.blockList[i]
        block.cars = block.checkedCars
        block.checkedCars = []
        store.commit('ADD_CARSCREEN', block)
      }
      this.addNewVehicleMaskVisible = false
      Bus.$emit('operating', 'compare')
      this.createArrow();
      console.log(11111111);
      console.log(this.d3List);
      Bus.$emit('implement', this.d3List);
    },
    createArrow : function(){
        // 确定箭头坐标
      console.log("hahahahah")
      var priceBoxWidth = null;
      if(window.screen.width>1000){
        priceBoxWidth = 1850;
      }else{
        
      }
      
      var grid = this.carScreen.curCarLanes.length;
      var column = grid <=3 ? 3 : this.carScreen.curCarLanes.length;
      var priceWidth = null;

      if(window.screen.width>1500){
        if(column == 3){
          priceWidth = ((priceBoxWidth * 0.92) / column )* 0.69 * 0.17;
        }else if(column == 4){
          priceWidth = ((priceBoxWidth * 0.92) / column )* 0.64 * 0.16;
        }else{
          priceWidth = ((priceBoxWidth * 0.92) / column )* 0.63 * 0.15;
        }
      }else{
        if(column == 3){
          priceWidth = ((priceBoxWidth * 0.92) / column )* 0.65 * 0.16;
        }else if(column == 4){
          priceWidth = ((priceBoxWidth * 0.92) / column )* 0.61 * 0.15;
        }else{
          priceWidth = ((priceBoxWidth * 0.92) / column )* 0.59 * 0.14;
        }
      }

      var x1 = 0, x2 = priceWidth;
      var y1 = -15, y2 = 0;
        
      this.d3List = [];
        for(var j in this.carScreen.curCarLanes){
          var mergeFlag = []; 
          var mergeFlagTwo  = [];
          var Lanes = this.carScreen.curCarLanes[j];
          var leftCars = Lanes.ins.cars;
          var rightCars = Lanes.column.cars;
          var d3Lanes = [];
          for(var m in leftCars){
            var car = leftCars[m];
            var carpre = null;
            if(m > 0){
              carpre = leftCars[m - 1]; 
            }
            car.rightBottomPer = null;
            car.leftBottomPer = null;
            car.topReduce = null;
            car.topKwShow = null;
              // 计算箭头坐标
            //   if(car.rrPrice < car.tsPrice){
            //   y1 = car.top;
            // }else{
            //   y1 = car.top + 30;
            // }
            y1 = car.top + 30;
            if(car.mergename != " "){
            if(carpre != null && carpre.top == car.top){
              mergeFlag.push(carpre.numberFlag);
                 //第一种合并情况左列车有rightBottomPer标识的时候，右下角percent显示
                 //第一种合并情况左列车有leftBottomPer标识的时候，左下角percent显示
                 car.rightBottomPer = "true";
                 carpre.leftBottomPer = "true";
            }
              mergeFlag.push(car.numberFlag);
            }
              
            if(carpre != null && carpre.rrPrice == car.rrPrice && carpre.top != car.top && carpre.mergename == " "){
              //第二种合并情况左列车有topReduce标识的时候，top值减少20
              //第二种合并情况左列车有topKwShow标识的时候，上方kw值显示
              car.topReduce = "true";
              carpre.topKwShow = "true";
              mergeFlagTwo.push(carpre.numberFlag);
              mergeFlagTwo.push(car.numberFlag);
              y1 = car.top + 10;
            }

            d3Lanes.push({
            "numberFlag":car.numberFlag,
            "x1":x1,
            "x2":x2,
            "y1":y1
            });
          }
          
          var preRightCar = null;
          for(var n in rightCars){
            //第一种合并情况右列车有mergeFirstFlag标识的时候，右下角percent显示
            rightCars[n].mergeFirstFlag = null;
            rightCars[n].mergeSecondFlag = null;
            if(rightCars[n].rrPrice < rightCars[n].tsPrice){
            	y2 = rightCars[n].top + 36;
            }else if(rightCars[n].rrPrice == rightCars[n].tsPrice || (Math.round(rightCars[n].rrPrice / Math.pow(10,4)) - Math.round(rightCars[n].tsPrice / Math.pow(10,4)) < 1)){
              y2 = rightCars[n].top + 16;  	
            }else{
            	y2 = rightCars[n].top;
            }
            for(var m in mergeFlag){
              //第一种合并情况(有合并名称)，左侧对应的右侧车加rightCars[n].mergeFirstFlag = "true";标识
              if(rightCars[n].numberFlag == mergeFlag[m]){
                rightCars[n].mergeFirstFlag = "true";
              }
            }
            for(var i in mergeFlagTwo){
              //第二种合并情况（无合并名称），左侧对应的右侧车加rightCars[n].mergeFirstFlag = "true";标识
              if(rightCars[n].numberFlag == mergeFlagTwo[i]){
                rightCars[n].mergeFirstFlag = "true";
              }
            }
            if(preRightCar){
              //两种合并情况，左侧对应的右侧车下面那台加rightCars[n].mergeSecondFlag = "true"标识，
              //右侧车有mergeSecondFlag标识时，top值减20
              //c.mergeFirstFlag == "true" && c.mergeSecondFlag == null时，右上角nickname显示
              //c.mergeFirstFlag == "true" && c.mergeSecondFlag == "true"时，左下角nickname显示
              if(preRightCar.tsPrice == rightCars[n].tsPrice){
                rightCars[n].mergeSecondFlag = "true";
                if(preRightCar.rrPrice != rightCars[n].rrPrice){
                  y2 = rightCars[n].top+10;
                }else{
                  y2 = rightCars[n].top-20;
                }
               
                preRightCar = null;
              }
            }
            preRightCar = rightCars[n];
            for(var z in d3Lanes){
              if(d3Lanes[z].numberFlag == rightCars[n].numberFlag){
                d3Lanes[z].y2 = y2;
              }
            }

          }
          this.d3List.push(d3Lanes);
          // TODO
        }
      // console.log(this.carScreen.curCarLanes)
     },
  },
  components: {
    addNewVehicleAssem,
    draggable,
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
    margin: 40px auto;
  }

  .sixColumnMain .sixColumnTop {
    width: 100%;
    height: 63px;
    position: relative;
    box-sizing: border-box;
  }

  .sixColumnMain .sixColumnTop .leftTit {
    width: 200px;
    height: 54px;
    line-height: 21px;
    padding-left: 32px;
    padding-top: 30px;
    font-size: 18px;
    font-family: BMWTypeCondensedRegular;
    margin-top: 0;
    margin-bottom: 0px;
    font-weight: bold;
  }

  .sixNext {
    position: absolute;
    right: 49px;
    top: 15px;
    border: 0;
    width: 142px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    font-family: BMWTypeCondensedRegular;
    font-size: 18px;
    background: linear-gradient(90deg, #2D9DEA 0%, #1464D0 98%);
    box-shadow: 0 2px 4px 0 #E7E7E8;
    border-radius: 10px;
    z-index: 999
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
    padding-top: 6px;
    color: #3B60A7;
    font: 16px/21px BMWTypeCondensedRegular;
    background-color: #fff;
    text-align: center;
    border: 1px solid #3577B1;
    border-radius: 10px;
  }

  .sixColumnTop .titDesc {
    position: absolute;
    right: 550px;
    top: 20px;
    font-family: 'bmwRgBd';
    font-size: 15px;
    color: #555;
  }

  .sixColumnTop .titDescNum {
    font-size: 30px;
    margin: 0 8px;
    vertical-align: middle;
  }

  .sixColumnTop #closeModel {
    box-sizing: border-box;
    position: absolute;
    top: 15px;
    right: 388px;
    width: 140px;
    height: 35px;
    padding-top: 6px;
    color: #3B60A7;
    font: 16px/21px BMWTypeCondensedRegular;
    background: #fff;
    text-align: center;
    border: 1px solid #3577B1;
    border-radius: 10px;
    cursor: pointer;
  }

  #clearAllMultiSelection {
    position: absolute;
    top: 22px;
    right: 20px;
    cursor: pointer;
  }

  .sixColumnMain .sixColumnLeft {
    float: left;
    width: 13%;
    /*height: 860px;*/
    height: 97%;
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
    width: 114%;
    height: 853px !important;
    height: 100%;
    padding-top: 20px;
    padding-left: 11px;
    background-color: #FFF;
    box-shadow: 0 2px 4px 0 #E4E4E4;
    border-radius: 4px;
  }

  ol, ul {
    list-style: none;
  }

  #sidebar > ul > li {
    position: relative;
    border-bottom: 2px solid #fff;
  }

  .iconLogo {
    float: left;
    top: 10px;
    left: 20px;
    width: 20px;
    height: 20px;
    z-index: 999999;
    padding: 8px 0px 0px 5px;
    background-color: rgba(0, 0, 0, 0);
  }

  .iconLogo img {
    width: auto;
    height: auto;

  }

  #sidebar > ul > li > a {
    width: 177px;
    height: 37px;
    line-height: 32px;
    display: block;
    text-decoration: none;
    color: #333;
    padding-left: 30px;
    background: #fff url(../assets/images/arr-r.png) no-repeat 154px 12px;
  }

  #sidebar > ul > li > a.bg-blue {
    border-left: 2px solid #274E7C;
  }

  #sidebar > ul > li > a > i {
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

  #sidebar > ul > li > ul > li {
    position: relative;
  }

  #sidebar > ul > li > ul > li > a {
    height: 42px;
    line-height: 42px;
    display: block;
    text-decoration: none;
    color: #333;
    padding-left: 48px;
    background: #ffffff url(../assets/images/arr-r.png) no-repeat 155px 12px;
    border-right: solid 1px #e9e8e5;
  }

  #sidebar > ul > li > ul > li > ul > li {
    height: 42px;
    line-height: 42px;
  }

  #sidebar > ul > li > ul > li > ul > li .eseriesOrModerRangeName {
    height: 42px;
    width: 100%;
    text-align: left;
    line-height: 42px;
    display: block;
    text-decoration: none;
    padding: 0px 0px 0px 80px;
    color: #666;
    font-size: 14px;
    background-color: #fff;
    font-weight: bold;
    border: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .sixColumnRight {
    float: right;
    width: 85%;
    height: 97%;
    margin-left: 0.7%;
    /*height: 871px;*/
    /*overflow: auto;*/
    /*position:relative;*/
    left: 230px;
    top: -736px;
    max-height: 874px;
    overflow-y: scroll;
  }

  .sixColumnRight .sixColumnRightTit {
    border-bottom: #dcdcdc solid 1px;
    height: 78px;
    line-height: 78px;
    overflow: hidden;
    margin-bottom: 0px;
  }

  .AddNewVehicleBox {
    /*height: 845px;*/
    /*margin-bottom: 25px;*/
    overflow: hidden;
    position: relative;
    top: 0px;
  }

  .AddNewVehicleBox ul li {
    position: relative;
    width: 32%;
    height: 415px;
    border: solid 1px #BFBFC3;
    border-top: 5px solid #3577B1;
    /*border-radius: 4px;*/
    float: left;
    margin: 0 10px 20px 10px;
    background: #fff;
    box-shadow: 0 2px 4px 0 #BFBFC3;;
  }

  .AddNewVehicleBox ul li.bg-blue {
    border-top: 5px solid #3577B1;
  }

  .AddNewVehicleBox ul li.bg-red {
    border-top: 5px solid #DB3B3B;
  }

  .AddNewVehicleBox ul li.bg-green {
    border-top: 5px solid #59AA39;
  }

  .AddNewVehicleBox ul li .vehicleBoxTit {
    height: 56px;
    position: relative;
    padding: 15px 0 10px 0;
    margin: 0 20px 0 14px;
    overflow: hidden;
    border-bottom: 2px solid transparent;
  }

  .AddNewVehicleBox ul li .vehicleBoxTit::after {
    content: '';
    position: absolute;
    top: 50px;
    left: 40px;
    display: inline-block;
    width: 417px;
    height: 2px;
    background: linear-gradient(to right, #036EAD, #F7F9FB);
  }

  .AddNewVehicleBox ul li .left {
    float: left;
  }

  .AddNewVehicleBox ul li .left span {
    font-size: 16px;
    margin-left: 10px;
  }

  .AddNewVehicleBox ul li .right {
    float: right;
  }

  .AddNewVehicleBox ul li .right .edit, .AddNewVehicleBox ul li .datepicker {
    float: left;
  }

  .AddNewVehicleBox ul li .right .edit {
    margin: 2px 8px 0 0;
    cursor: pointer;
  }

  .AddNewVehicleBox ul li .right .closeIcon {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .AddNewVehicleBox ul li .datepicker {
    margin-right: 7px;
    border: none;
    font-size: 14px;
    margin-top: -11px;
  }

  .AddNewVehicleBox ul li .vehicleBoxTit .right .datepicker .form-horizontal fieldset .control-group .input-append input {
    padding-left: 19px;
    background: url(../assets/images/rili.png) no-repeat;
    background-size: 14px 13px;
    background-position-y: 4px;

  }

  .datepicker {
    position: relative;
  }

  .AddNewVehicleBox ul li:nth-child(3n+3) {
    margin-right: 0;
  }

  .vehicleCheckBox {
    margin: 10px 20px 0 14px;
    position: relative;
  }
  .AddNewVehicleBox .vehicleCheckBox .selectedTip {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 16px;
    color: #72adff;
    letter-spacing: 0.5px;
  }
  .AddNewVehicleBox .vehicleCheckBox .selectedTip .selectedNum {
    color: #757474;
    margin-left: 12px;
    border: solid #d2d2d2 1px;
    border-radius: 2px;
    padding: 3px 0px;
    text-align: center;
    line-height: 14px;
    display: inline-block;
    font-size: 16px;
    margin-right: 16px;
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox-group {
    top: 0px;
    height: 315px;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .vehicleCheckBox .el-checkbox-group .el-checkbox__input {
    margin-top: -2px;
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox-group:nth-child(2) {
    width: 90%;
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox-group .text {
    width: 100%;
    overflow: hidden;
    padding-right: 25px;
    margin: 0;
  }
  .AddNewVehicleBox .vehicleCheckBox .el-checkbox-group .name {
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 74%;
    text-align: left;
    padding: 0px;
    border: none;
    font-size: 20px;
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox-group .name:hover {
    color: #606266;
    border-color: #fff;
    background-color: #fff;
  }

  .sixColumnMain .vehicleCheckBox .el-checkbox-group .el-checkbox__label {
    width: 100% !important;
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox-group .price {
    float: right;
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox + .el-checkbox {
    margin-left: 0;
  }

  .AddNewVehicleBox .el-checkbox {
    margin-bottom: 10px;
    padding-left: 8px;
    width: 100%
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox__inner::before {
    display: none !important;
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    -webkit-transition: -webkit-transform .15s ease-in .05s;
    transition: -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s, -webkit-transform .15s ease-in .05s;
    -webkit-transform-origin: center;
    transform-origin: center;
    transform: rotate(45deg) scaleY(1);
    display: inline;
  }

  .selectContain {
    width: 100px;
    height: 30px;
    display: none;
  }

  .selectContainShow {
    width: 100px;
    height: 30px;
    color: #72adff;
    font-size: 16px;
    font-weight: inherit;
  }

  .sixColumnMain .vehicleCheckBox .el-checkbox-group .el-checkbox__label {
    width: 100% !important;
  }

  .AddNewVehicleBox .vehicleCheckBox .el-checkbox-group .price {
    float: right;
  }
</style>
