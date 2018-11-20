<template>
  <!--待改，下面一行删除了:class="{'font_small': fontStyle === 'small'}"-->
  <div class="priceBox">
    <ul v-bind:class="carScreen.getCurrentGridClass(tpShowFlg)">
      <li class='backg'></li>
      <li class="box center" v-for="(carLane, i) in carScreen.curCarLanes" :key="i">
        <div class="carType">
          <div :class="carScreen.getCarRRPriceClass(carLane.ins.brandNameEn)" class="top-bar"></div>
          <div class="carLogo" @dblclick="openModifyModal(carLane.ins, false, carLane.idx)">
            <img v-bind:src="'../assets/images/' + carLane.ins.brandNameEn + '.png'"/>
            <el-tooltip :open-delay=1000 class="item" effect="dark"
                        v-bind:content="carLane.ins.bmwFlg ? carLane.ins.seriesNameEn : carLane.ins.model - carLane.ins.bmwFlg ? carLane.ins.eseriesNameEn : carLane.ins.engine"
                        placement="top">
              <el-button class="carLogoName">{{ carLane.ins.bmwFlg ? carLane.ins.seriesNameEn : carLane.ins.model }}-{{
                carLane.ins.bmwFlg ? carLane.ins.eseriesNameEn : carLane.ins.engine }}
              </el-button>
            </el-tooltip>
          </div>
          <div class="attrSlect">
            <div class="dateTimeCover"></div>
            <div class="cover" @dblclick="openModifyModal(carLane.ins, false, carLane.idx)"></div>
            <div class="icon">
              <div class="dropdown">
                <div class=" arr-more dropdown-toggle" id="more5"><span class="caret"></span></div>
              </div>
              <a role="menuitem" tabindex="-1" href="javascript:void(0)" :data-target="'#modalRmRow' + i"><i
                v-if="tpShowFlg" class="delete-icon" @click="fadeCor(),showDeleteColumn(i)"></i></a>
            </div>
            <div class="date-box">
              <div class="datepicker" v-bind:id="'rowDate' + carLane.idx">
                <el-date-picker
                  v-model=rowDate[carLane.idx]
                  type="month"
                  format="M/yyyy"
                  :editable="false"
                  style="border:none;font-size:14px;width:68%;"
                >
                </el-date-picker>
                <span class="add-on"><i class="icon-th"></i></span>
              </div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </li>
    </ul>
    <ul v-if="carScreen.curCarLanes.length > 0" v-bind:class="carScreen.getCurrentGridClass(tpShowFlg)"
        class="priceTable">
      <div v-bind:class="{disabled: !carScreen.isForwardPreviousEnable()}" class="arr-l"
           @click="carScreen.forwardPreviousPage(tpShowFlg),createArrow(),forwarePage(tpShowFlg)"></div>
      <div v-bind:class="{disabled: !carScreen.isForwardNextEnable()}" class="arr-r"
           @click="carScreen.forwardNextPage(),createArrow(),forwarePage(tpShowFlg)"></div>
      <li class="box center" v-for="(carLane, i) in carScreen.curCarLanes" v-bind:key="i">
        <!-- 每个li里有两个左右各一个div，然后再在各个div里循环 -->
        <div class="priceArrow" v-bind:style="{'left': 100 * 0.66 *0.8 + '%','width': 100 * 0.67 *0.16 + '%'}"
             v-for="(c, j) in carLane.ins.cars" :key="j">
          <svg style="overflow: visible" v-if="tpShowFlg" v-for="(arrowData, k) in d3List[i]" v-bind:key="k"
               v-bind:style="{width: '100%',position:'absolute',top: arrowData.y1+'px',height:arrowData.y2-arrowData.y1+2+'px'}">
            <defs>
              <marker v-bind:id="'arrow' + carLane.ins.brandNameEn"
                      markerUnits="strokeWidth"
                      markerWidth="12"
                      markerHeight="12"
                      viewBox="0 0 12 12"
                      refX="6"
                      refY="6"
                      orient="auto">
                <path d="M2,2 L10,6 L2,10 L6,6 L2,2" v-bind:style="getArrowCor(carLane.ins.brandNameEn)"/>
              </marker>
            </defs>
            <line v-bind:x1="0" v-bind:y1="-16" v-bind:x2="arrowData.x2" v-bind:y2="arrowData.y2-arrowData.y1-2"
                  v-bind:stroke="getColorLine(carLane.ins.brandNameEn)" stroke-width="0.7"
                  v-bind:marker-end="getArrowCorBind(carLane.ins.brandNameEn)"/>
          </svg>
        </div>

        <div class="leftColumn">
          <div class="priceListBox height30" v-for="(c, j) in carLane.ins.cars" v-bind:style="getLeftStyle(c)" :key="j">
            <span class="long-box" v-bind:class="carScreen.getCarRRPriceClass(carLane.ins.brandNameEn)">
              <span v-on:mouseover="carChooseNameShow(i,j)" v-on:mouseout="carChooseNameHide(i,j)"
                    @click="openModifyCar(c, carLane.ins, i , j)" class="carName">{{c.mergename == ' ' ? c.nickname : c.mergename }}</span>
              <span class="price priceBefore"><vue-numeric v-model="c.rrPrice" currency="" :min=0
                                                           @blur="modifyUnitCarMetrics(c, carLane.ins, carLane.idx , j)"
                                                           onKeyPress="if(window.event.keyCode==13) this.blur()"></vue-numeric></span>
            </span>
            <span class="percent" v-bind:style="showPercentRight(c)">
              <vue-numeric class="mixShowWay" v-model="c.showMixPercentage" :precision=2 :max=100 :min=-100 currency="%"
                           currency-symbol-position="suffix"
                           @blur="modifyUnitCarMetrics(c, carLane.ins, carLane.idx , j)"
                           onKeyPress="if(window.event.keyCode==13) this.blur()"></vue-numeric>
            </span>
            <span class="percentBottomRight" v-bind:style="showPercentBottomRight(c)">
              <vue-numeric v-model="c.showMixPercentage" :precision=2 :max=100 :min=-100 currency="%"
                           currency-symbol-position="suffix"
                           @blur="modifyUnitCarMetrics(c, carLane.ins, carLane.idx , j)"
                           onKeyPress="if(window.event.keyCode==13) this.blur()"></vue-numeric>
            </span>
            <span class="barCenter" v-bind:style="showPercentBottomLeft(c)">/</span>
            <span class="percentBottomLeft" v-bind:style="showPercentBottomLeft(c)">
              <vue-numeric v-model="c.showMixPercentage" :precision=2 :max=100 :min=-100 currency="%"
                           currency-symbol-position="suffix"
                           @blur="modifyUnitCarMetrics(c, carLane.ins, carLane.idx , j)"
                           onKeyPress="if(window.event.keyCode==13) this.blur()"></vue-numeric>
            </span>
            <span class="kw">
              <vue-numeric style="background-color: #f2f3f9" v-model="c.powerHP" :precision=0 :max=1000 :min=-100
                           currency="kw" currency-symbol-position="suffix"
                           @blur="modifyUnitCarMetrics(c, carLane.ins, carLane.idx , j),modifyPreUnitCarMetrics(c, carLane.ins, carLane.idx , j)"
                           onKeyPress="if(window.event.keyCode==13) this.blur()"></vue-numeric>
            </span>
            <span class="kwTop" v-bind:style="showKwTop(c)">
              <vue-numeric v-model="c.powerHP" :precision=0 :max=1000 :min=0 currency="kw"
                           currency-symbol-position="suffix"
                           @blur="modifyUnitCarMetrics(c, carLane.ins, carLane.idx , j)"
                           onKeyPress="if(window.event.keyCode==13) this.blur()"></vue-numeric>
            </span>
            <span class="hoverLeft"
                  v-bind:class="'nameLeft'+ i + j">{{c.mergename == ' ' ? c.nickname : c.mergename}}</span>
            <span v-on:mouseover="carChooseNameShow(i,j)" v-on:mouseout="carChooseNameHide(i,j)" class="changeModel"
                  data-toggle="modal" @click="openChangeCar(c, carLane.ins, i , j)"
                  v-bind:style="showPercentBottomRight(c)"></span>
          </div>
        </div>
        <div class="rightColumn" v-if="tpShowFlg">
          <div class="priceListBox height30" v-for="(c, j) in carLane.column.cars" v-bind:style="getStyle(c)" :key="j">
            <div class="shor-box" v-if="tpShowFlg" v-bind:class="carScreen.getCarTPPriceClass(carLane.ins.brandNameEn)"
                 v-on:mouseover="carChooseshorNameShow(i,j)" v-on:mouseout="carChooseshorNameHide(i,j)">
              <span class="price rrprice"><vue-numeric v-model="c.tsPrice" currency="" :min=0
                                                       @blur="modifyRightUnitCarMetrics(c, carLane.ins.cars, carLane.idx , j),createArrow()"
                                                       onKeyPress="if(window.event.keyCode==13) this.blur()"></vue-numeric></span>
              <span class="floatRight">
                <vue-numeric v-model="c.showDiscountPercentage" :precision=2 :max=100 :min=-100 currency="%"
                             currency-symbol-position="suffix"
                             @blur="modifyRightUnitCarTsprice(c, carLane.ins.cars, carLane.idx , j),createArrow()"
                             onKeyPress="if(window.event.keyCode==13) this.blur()">
                </vue-numeric>
              </span>
              <span class="positionTopRight" v-bind:style="showNicknameTop(c)">{{c.nickname}}</span>
              <span class="positionBotomnLeft" v-bind:style="showNickname(c)">{{c.nickname}}</span>
              <span class="hoverName" v-bind:class="'name' + i + j">{{c.nickname}}</span>
            </div>
          </div>
        </div>

      </li>
    </ul>
    <div class="clearfloat"></div>
    <modify-new-column-dialog :modifyCarLane='modifyCarLane' :brandList = "brandList" :cmpBrandList="cmpBrandList" :bmwBrandList="bmwBrandList"
    :modifyNewColumnDialogVisible="modifyNewColumnDialogVisible" :bmwSeriesList="bmwSeriesList"
    @closeModifyColumnDialog="closeModifyColumnDialog" :addRow = "addRow"></modify-new-column-dialog>

    <delete-column v-on:confirmDleate="confirmDleate" :windowScreenWidth='windowScreenWidth'
                   :priceBoxWidth='priceBoxWidth' :deleteColumnMark='deleteColumnMark'
                   :deleteColumnVisible='deleteColumnVisible'
                   @closeDeleteColumnDialog='closeDeleteColumnDialog'></delete-column>

    <modifyColumnContent :modifyColumnContentVisible='modifyColumnContentVisible'
    @closeModifyColumnContent='closeModifyColumnContent' :editCar='editCar'></modifyColumnContent>

  </div>
</template>

<script>
import d3 from 'd3'
import Bus from '../common/js/Bus'
import accounting from 'accounting'
import store from '../store'
import modifyNewColumnDialog from './ModifyNewColumnDialog'
import deleteColumn from './DeleteColumn'
import modifyColumnContent from './modifyColumnContent'

export default {
  name: 'PriceBox',
  data () {
    return {
      deleteColumnMark: null,
      priceBoxWidth: null,
      windowScreenWidth: null,
      d3List: [],
      brandList: [],
      bmwBrandList: [],
      cmpBrandList: [],
      bmwSeriesList: [],
      watchFlag: false,
      modifyCarLane: {
        isAddCarLane: true,
        modifyIdx: -1
      },
      addRow: {
        brand: '',
        seriesOrModel: '',
        eseriesOrEngine: '',
        yearMonth: (new Date()).format('yyyymm'),
        isBmwProduct: true,
        productList: [],
        selectedESeriesOrEngine: '',
        selectedProduct: [],
        selectAll: false,
        isIndeterminate: true,
        addCarShowFlg: false,

        addCar: {
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
          yearMonth: (new Date()).format('yyyymm'),
          laneIndex: 0,
          carIndex: 0
        }
      },
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
        yearMonth: (new Date()).format('yyyymm'),
        laneIndex : 0,
        carIndex : 0,
      },
      d3: d3,
      modifyNewColumnDialogVisible: false,
      deleteColumnVisible: false,
      modifyColumnContentVisible: false,
      accounting: accounting,
      rowDate: [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(),
        new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()],
      tpShowFlg: true,
      carScreen: this.$store.state.carScreen
    }
  },
  created () {
    this.getBmwBrandList()
    this.getCmpBrandList()
    this.getBmwSeriesList()
  },
  mounted () {
    this.priceBoxWidth = $('.priceBox').width()
    this.windowScreenWidth = window.screen.width
    Bus.$on('operating', status => {
      if (status === 'compare') {
        this.carScreen = this.$store.state.carScreen
      }
    })
    Bus.$on('implement', d3List => {
      this.d3List = d3List
    })
    Bus.$on('createArrow', data => {
      this.createArrow()
    })
  },
  methods: {
    confirmDleate: function (param) {
      if (param === 'createArrow') {
        this.createArrow()
      }
    },
    closeModifyColumnDialog: function () {
      this.modifyNewColumnDialogVisible = false
    },
    closeDeleteColumnDialog: function () {
      this.deleteColumnVisible = false
    },
    closeModifyColumnContent: function(){
      this.modifyColumnContentVisible = false
    },
    getLeftStyle: function (c) {
      let p = c.topReduce == 'true' ? c.top - 20 : c.top
      return {'top': p + 'px'}
    },
    showPercentRight: function (c) {
      if (c.rightBottomPer == 'true' || c.leftBottomPer == 'true') {
        return {'display': 'none'}
      } else {
        return {'display': 'block'}
      }
    },
    showPercentBottomRight: function (c) {
      if (c.rightBottomPer == 'true') {
        return {'display': 'block'}
      } else {
        return {'display': 'none'}
      }

    },
    showPercentBottomLeft: function (c) {
      if (c.leftBottomPer == 'true') {
        return {'display': 'block'}
      } else {
        return {'display': 'none'}
      }
    },
    showKwTop: function (c) {
      if (c.topKwShow == 'true') {
        return {'display': 'block'}
      } else {
        return {'display': 'none'}
      }
    },
    carChooseNameShow: function (i, j) {
      $('.nameLeft' + i + j).addClass('carChooseNameShow').removeClass('carChooseName hoverLeft')
    },
    carChooseNameHide: function (i, j) {
      $('.nameLeft' + i + j).addClass('carChooseName').removeClass('carChooseNameShow hoverLeft')
    },
    carChooseshorNameShow: function (i, j) {
      $('.name' + i + j).addClass('carChooseshorNameShow').removeClass('carChooseshorName hoverName')
    },
    carChooseshorNameHide: function (i, j) {
      $('.name' + i + j).addClass('carChooseshorName').removeClass('carChooseshorNameShow hoverName')
    },
    getStyle: function (c) {
      let b = c.mergeSecondFlag == 'true' ? c.top - 20 : c.top
      return {'top': b + 'px'}
    },
    createArrow: function () {
      // 确定箭头坐标
      var priceBoxWidth = $('.priceBox').width()
      this.priceBoxWidth = priceBoxWidth
      var grid = this.carScreen.curCarLanes.length
      var column = grid <= 3 ? 3 : this.carScreen.curCarLanes.length
      var priceWidth = null

      if (window.screen.width > 1500) {
        if (column == 3) {
          priceWidth = ((priceBoxWidth * 0.92) / column) * 0.69 * 0.17
        } else if (column == 4) {
          priceWidth = ((priceBoxWidth * 0.92) / column) * 0.64 * 0.16
        } else {
          priceWidth = ((priceBoxWidth * 0.92) / column) * 0.63 * 0.15
        }
      } else {
        if (column == 3) {
          priceWidth = ((priceBoxWidth * 0.92) / column) * 0.65 * 0.16
        } else if (column == 4) {
          priceWidth = ((priceBoxWidth * 0.92) / column) * 0.61 * 0.15
        } else {
          priceWidth = ((priceBoxWidth * 0.92) / column) * 0.59 * 0.14
        }
      }

      var x1 = 0, x2 = priceWidth
      var y1 = -15, y2 = 0

      this.d3List = []
      for (var j in this.carScreen.curCarLanes) {
        var mergeFlag = []
        var mergeFlagTwo = []
        var Lanes = this.carScreen.curCarLanes[j]
        var leftCars = Lanes.ins.cars
        var rightCars = Lanes.column.cars
        var d3Lanes = []
        for (var m in leftCars) {
          var car = leftCars[m]
          var carpre = null
          if (m > 0) {
            carpre = leftCars[m - 1]
          }
          car.rightBottomPer = null
          car.leftBottomPer = null
          car.topReduce = null
          car.topKwShow = null
          // 计算箭头坐标
          //   if(car.rrPrice < car.tsPrice){
          //   y1 = car.top;
          // }else{
          //   y1 = car.top + 30;
          // }
          y1 = car.top + 30
          if (car.mergename != ' ') {
            if (carpre != null && carpre.top == car.top) {
              mergeFlag.push(carpre.numberFlag)
              //第一种合并情况左列车有rightBottomPer标识的时候，右下角percent显示
              //第一种合并情况左列车有leftBottomPer标识的时候，左下角percent显示
              car.rightBottomPer = 'true'
              carpre.leftBottomPer = 'true'
            }
            mergeFlag.push(car.numberFlag)
          }

          if (carpre != null && carpre.rrPrice == car.rrPrice && carpre.top != car.top && carpre.mergename == ' ') {
            //第二种合并情况左列车有topReduce标识的时候，top值减少20
            //第二种合并情况左列车有topKwShow标识的时候，上方kw值显示
            car.topReduce = 'true'
            carpre.topKwShow = 'true'
            mergeFlagTwo.push(carpre.numberFlag)
            mergeFlagTwo.push(car.numberFlag)
            y1 = car.top + 10
          }

          d3Lanes.push({
            'numberFlag': car.numberFlag,
            'x1': x1,
            'x2': x2,
            'y1': y1
          })
        }

        var preRightCar = null
        for (var n in rightCars) {
          //第一种合并情况右列车有mergeFirstFlag标识的时候，右下角percent显示
          rightCars[n].mergeFirstFlag = null
          rightCars[n].mergeSecondFlag = null
          if (rightCars[n].rrPrice < rightCars[n].tsPrice) {
            y2 = rightCars[n].top + 36
          } else if (rightCars[n].rrPrice == rightCars[n].tsPrice || (Math.round(rightCars[n].rrPrice / Math.pow(10, 4)) - Math.round(rightCars[n].tsPrice / Math.pow(10, 4)) < 1)) {
            y2 = rightCars[n].top + 16
          } else {
            y2 = rightCars[n].top
          }
          for (var m in mergeFlag) {
            //第一种合并情况(有合并名称)，左侧对应的右侧车加rightCars[n].mergeFirstFlag = "true";标识
            if (rightCars[n].numberFlag == mergeFlag[m]) {
              rightCars[n].mergeFirstFlag = 'true'
            }
          }
          for (var i in mergeFlagTwo) {
            //第二种合并情况（无合并名称），左侧对应的右侧车加rightCars[n].mergeFirstFlag = "true";标识
            if (rightCars[n].numberFlag == mergeFlagTwo[i]) {
              rightCars[n].mergeFirstFlag = 'true'
            }
          }
          if (preRightCar) {
            //两种合并情况，左侧对应的右侧车下面那台加rightCars[n].mergeSecondFlag = "true"标识，
            //右侧车有mergeSecondFlag标识时，top值减20
            //c.mergeFirstFlag == "true" && c.mergeSecondFlag == null时，右上角nickname显示
            //c.mergeFirstFlag == "true" && c.mergeSecondFlag == "true"时，左下角nickname显示
            if (preRightCar.tsPrice == rightCars[n].tsPrice) {
              rightCars[n].mergeSecondFlag = 'true'
              if (preRightCar.rrPrice != rightCars[n].rrPrice) {
                y2 = rightCars[n].top + 10
              } else {
                y2 = rightCars[n].top - 20
              }

              preRightCar = null
            }
          }
          preRightCar = rightCars[n]
          for (var z in d3Lanes) {
            if (d3Lanes[z].numberFlag == rightCars[n].numberFlag) {
              d3Lanes[z].y2 = y2
            }
          }

        }
        this.d3List.push(d3Lanes)

        // TODO
      }
      // console.log(this.carScreen.curCarLanes)
    },
    showNickname: function (c) {
      if (c.mergeFirstFlag == 'true' && c.mergeSecondFlag == 'true') {
        return {'display': 'block'}
      } else if (c.mergeFirstFlag == 'true' && c.mergeSecondFlag == 'true' && c.k == 'true') {
        return {'display': 'none'}
      } else {
        return {'display': 'none'}
      }
    },
    showNicknameTop: function (c) {
      if (c.mergeFirstFlag == 'true' && c.mergeSecondFlag == null) {
        return {'display': 'block'}
      } else {
        return {'display': 'none'}
      }
    },
    fadeCor: function () {
      $('.versionArrow').css('background-color', 'transparent')
    },
    getArrowCor: function (brandNameEn) {
      if (brandNameEn === 'BMW') {
        return {'fill': '#97b3ed'}
      } else if (brandNameEn === 'Audi') {
        return {'fill': '#98e498'}
      } else if (brandNameEn === 'MB') {
        return {'fill': '#fba19d'}
      }
    },
    getColorLine: function (brandNameEn) {
      if (brandNameEn === 'BMW') {
        return '#97b3ed'
      } else if (brandNameEn === 'Audi') {
        return '#98e498'
      } else if (brandNameEn === 'MB') {
        return '#fba19d'
      }
    },
    getArrowCorBind: function (brandNameEn) {
      return 'url(#arrow' + brandNameEn + ')'
    },
    modifyUnitCarMetrics: function (c, carLane, i, j) {
      c.showDiscountPercentage = this.computeDiscountPercentage(c.rrPrice, c.tsPrice)
      c.discountPercentage = c.showDiscountPercentage / 100
      c.mixPercentage = c.showMixPercentage / 100
      // this.carScreen.setCar(c, i, j);
      let params = {
        c: c,
        i: i,
        j: j
      }
      store.commit('SETCAR_CARSCREEN', params)
      this.createArrow()
    },
    computeDiscountPercentage: function (rrPrice, tsPrice) {
      return accounting.toFixed(((rrPrice - tsPrice) / rrPrice * 100), 4)
    },
    modifyRightUnitCarMetrics: function (c, carLane, i, j) {
      var self = this
      c.showDiscountPercentage = this.computeDiscountPercentage(c.rrPrice, c.tsPrice)
      c.discountPercentage = c.showDiscountPercentage / 100
      var rightNumberFlag = c.numberFlag
      for (var b in carLane) {
        var leftNumberFlag = carLane[b].numberFlag
        if (rightNumberFlag == leftNumberFlag) {
          // self.carScreen.setCar(c, i, b);
          let params = {
            c: c,
            i: i,
            j: b
          }
          store.commit('SETCAR_CARSCREEN', params)
          break
        }
      }
    },
    modifyRightUnitCarTsprice: function (c, carLane, i, j) {
      var self = this
      c.tsPrice = this.computeTsPrice(c.rrPrice, c.showDiscountPercentage)
      c.discountPercentage = c.showDiscountPercentage / 100
      var rightNumberFlag = c.numberFlag
      for (var b in carLane) {
        var leftNumberFlag = carLane[b].numberFlag
        if (rightNumberFlag == leftNumberFlag) {
          let params = {
            c: c,
            i: i,
            j: b
          }
          store.commit('SETCAR_CARSCREEN', params)
          break
        }
      }
    },
    computeTsPrice: function (rrPrice, discountPercentage) {
      return (1 - discountPercentage / 100) * rrPrice
    },
    openModifyModal: function (carLane, isAddFlg, idx) {
      this.addRow = {
        brand: carLane.brandNameEn,
        seriesOrModel: carLane.bmwFlg ? carLane.seriesNameEn : carLane.model,
        eseriesOrEngine: carLane.bmwFlg ? carLane.eseriesNameEn : carLane.engine,
        yearMonth: carLane.yearMonth,
        isBmwProduct: carLane.bmwFlg,
        productList: [],
        selectedESeriesOrEngine: '',
        selectedProduct: [],
        selectAll: false,
        isIndeterminate: true,
        addCarShowFlg: false,

        addCar: {
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
          yearMonth: carLane.yearMonth,
          laneIndex: 0,
          carIndex: 0,
        },
      }
      this.modifyCarLane.isAddCarLane = isAddFlg
      this.modifyCarLane.modifyIdx = idx
      this.searchRowDetail(idx)

      for (var i in carLane.cars) {
        var findFlg = false
        var car = carLane.cars[i]
        for (var j in this.addRow.productList) {
          var dbCar = this.addRow.productList[j]
          if (this.addRow.isBmwProduct) {
            if (car.model === dbCar.model && car.packageCode === dbCar.packageCode) {
              this.addRow.productList[j] = car
              findFlg = true
              break
            }
          } else {
            if (car.carNameEn === dbCar.carNameEn) {
              this.addRow.productList[j] = car
              findFlg = true
              break
            }
          }
        }

        if (!findFlg) {
          this.addRow.productList.push(car)
        }
      }

      this.addRow.selectedProduct = carLane.cars
      this.modifyNewColumnDialogVisible = true
      var carColumnDate = this.rowDate[idx]
      this.$emit('carColumnDate', carColumnDate)

    },
    searchRowDetail: function (dateId) {
      var self = this
      //更改
      this.addRow.selectedESeriesOrEngine = ''
      this.addRow.isIndeterminate = true
      this.addRow.selectAll = false
      var addRowDateValue = this.rowDate[dateId]

      if (!this.addRow.eseriesOrEngine) {
        return
      } else {
        $('#addMenuRowEseriesOrEngine').removeClass('inputErrorTwo')
        $('#addRowEseriesOrEngine').removeClass('inputErrorTwo')
      }
      var productListPromise = this.searchRowDetailCommon(
        this.addRow.brand,
        this.addRow.seriesOrModel,
        this.addRow.eseriesOrEngine,
        addRowDateValue.format('yyyymm'),
        this.addRow.isBmwProduct)
      var productList = []
      productListPromise.then(function (val) {
        productList = val
        if (productList.length == 0) {
          self.openAlert()
          self.initDate = new Date()
          return
        }
        self.addRow.selectedProduct = []
        self.addRow.productList = []
        if (self.addRow.isBmwProduct) {
          self.addRow.selectedESeriesOrEngine = self.addRow.eseriesOrEngine
          self.addRow.productList = productList
          console.log(self.addRow.productList.length)
        } else {
          self.addRow.selectedESeriesOrEngine = self.addRow.eseriesOrEngine
          self.addRow.productList = productList
        }
        self.addRow.selectedProduct = self.addRow.productList
      })

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
    openAlert: function () {
      this.$message({
        message: 'there is no data in this month. Please click on other months.',
        type: 'warning',
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
    showDeleteColumn: function (i) {
      this.deleteColumnVisible = true
      this.deleteColumnMark = i
    },
    openModifyCar : function(car, carLaneIns, laneIndex, carIndex) {
      this.modifyColumnContentVisible = true;
      this.editCar = {
            bmwFlg: carLaneIns.bmwFlg,
            brandNameEn: carLaneIns.brandNameEn,
            seriesNameEn: carLaneIns.seriesNameEn,
            eseriesNameEn: carLaneIns.eseriesNameEn,
            packageCode: car.packageCode,
            model: car.model,
            engine: car.engine,
            rrPrice: car.rrPrice,
            tsPrice: car.tsPrice,
            carNameEn: car.carNameEn,
            nickname: car.nickname,
            mixPercentage: car.mixPercentage,
            discountPercentage: car.discountPercentage,
            powerHP: car.powerHP,
            showMixPercentage: car.mixPercentage * 100,
            showDiscountPercentage: car.discountPercentage * 100,
            yearMonth: car.yearMonth,
            laneIndex : laneIndex,
            carIndex : carIndex,
      },
      this.editCarPre = {
            rrPrice: car.rrPrice,
            tsPrice: car.tsPrice,
            discountPercentage: car.discountPercentage,
      }
      this.clearValidator();
      this.watchFlag = false;
    },
    clearValidator : function() {
      this.$validator.reset();
      this.errors.clear();

    },

  },
  components: {
    modifyNewColumnDialog,
    deleteColumn,
    modifyColumnContent
  }
}
</script>

<style lang="less">
  .priceBox {
    margin: 25px 36px 0 36px;
    height: 800px;
  }

  .priceBox ul {
    width: 100%;
    list-style: none;
    clear: both;
  }

  .priceBox ul li {
    height: 76px;
    float: left;
    margin-top: 30px;
  }

  .priceBox ul li.backg {
    position: absolute;
    width: 100% !important;
    height: 85px;
    background: #f2f3f9;
    z-index: 222;
  }

  .priceBox ul li .carType {
    position: absolute;
    height: 35px;
    width: 30%;
    margin-left: 1%;
    top: 190px;
    float: left;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #BFBFC3;
    font-size: 0.85em;
    z-index: 333;
  }

  .clearfloat {
    clear: both;
    height: 0;
    font-size: 1px;
    line-height: 0px;
  }

  .priceBox ul.grid5 li {
    width: 20%;
  }

  .priceBox ul.grid5 li .carType {
    width: 18%;
  }

  .priceBox ul.grid4 li {
    width: 25%;
  }

  .priceBox ul.grid4 li .carType {
    width: 23%;
  }

  .priceBox ul.grid3 li {
    width: 33.33%;
  }

  .priceBox ul.grid3 li .carType {
    width: 31%;
  }

  .priceBox ul.grid44 li {
    width: 25%;
  }

  .priceBox ul.grid44 li .carType {
    width: 23%;
  }

  .priceBox ul.grid55 li, .priceBox ul.grid55 li .carType {
    width: 20%;
  }

  .priceBox ul.grid66 li {
    width: 16.6%;
  }

  .priceBox ul.grid66 li .carType {
    width: 15%;
  }

  .priceBox ul.grid77 li {
    width: 14.2%;
  }

  .priceBox ul.grid77 li .carType {
    width: 13%;
  }

  .priceBox ul.grid88 li {
    width: 12.5%;
  }

  .priceBox ul.grid88 li .carType {
    width: 11%;
  }

  .bg1c69d4 {
    background: #3C4C6F;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg006600 {
    background: #3D783C;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bge60000 {
    background: #C54846;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg7286ab {
    background: #5D73A4;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg41a741 {
    background: #7DBD7C;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bgef9490 {
    background: #F1948F;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .priceBox ul li .carType .top-bar {
    height: 4px;
    box-shadow: none;
  }

  .priceBox ul li .carType .carLogo {
    margin-top: 2px;
    margin-left: -1px;
    float: left;
    width: 58%;
    height: 72%;

  }

  .priceBox ul li .carType .carLogo img {
    vertical-align: middle;
  }

  .priceBox ul li .carType .carLogo img, .priceBox ul li .carType .carLogo span {
    font-family: BMWTypeCondensedRegular;
    font-size: 14px;
    color: #3B60A7;
    letter-spacing: 0;
    margin-right: 1px;
    margin-left: 4px;
  }

  .priceBox ul li .carType .carLogo .carLogoName {
    display: inline-block;
    /* margin-top: 13px; */
    /* font-size: 12px; */
    font-size: 1em;
    color: #3B60A7;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 91%;
    padding: 2px 0px 0px 0px;
    white-space: nowrap;
    border: none;
    text-align: left;
  }

  .priceBox ul li .carType .carLogo img, .priceBox ul li .carType .carLogo span {
    font-family: BMWTypeCondensedRegular;
    font-size: 14px;
    color: #3B60A7;
    letter-spacing: 0;
    margin-right: 1px;
    margin-left: 4px;
  }

  .priceBox ul li .carType .attrSlect {
    float: right;
    margin-top: 5px;
    /* width: 112px; */
    width: 42%;
  }

  .priceBox ul li .carType .cover {
    position: absolute;
    top: 3px;
    right: 15%;
    width: 36%;
    height: 32px;
    z-index: 9;
  }

  .priceBox ul li .carType .attrSlect .icon {
    float: right;
    padding-top: 2px;
    margin-right: 3px;
    width: 28%;
  }

  .priceBox ul li .carType .attrSlect .dropdown {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 3px;
    cursor: pointer;
    vertical-align: baseline;
  }

  .priceBox ul li .carType .attrSlect .icon .arr-more {
    background: url(../assets/images/log.png) no-repeat;
    background-size: contain;
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 3px;
    cursor: pointer;
  }

  .priceBox ul li .carType .attrSlect .dropdown .caret {
    border: none;
  }

  .caret {
    position: relative;
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

  .priceBox ul li .carType .attrSlect .icon a {
    float: right;
    padding-right: 20%;
  }

  a:hover, a:visited, a:link, a:active {
    color: #606060;
  }

  a, a:hover {
    text-decoration: none;
  }

  .priceBox ul li .carType .attrSlect .icon .delete-icon {
    background: url(../assets/images/delete-icon.png) no-repeat;
    background-size: contain;
    width: 8px;
    height: 12px;
    display: inline-block;
    vertical-align: bottom;
    margin-right: 0px;
  }

  .priceBox ul li .carType .attrSlect .date-box {
    width: 33%;
    float: right;
    margin-top: -2px;
    margin-right: 6%;
  }

  .priceBox ul li .carType .add-on i {
    width: 15px;
    height: 12px;
    margin-top: -1px;
    top: 3px;
    left: -15px !important;
    background-image: url(../assets/images/min-date-cion.png) !important;
    background-size: 15px 12px !important;
  }

  .priceBox ul li:last-child .line {
    border-right: none;
  }

  .priceBox ul li .line {
    width: 2%;
    height: 56px;
    float: left;
    /* border-right: solid 1px #e9e8e5; */
  }

  .priceTable {
    width: 100%;
    height: auto;
    position: relative;
  }

  .priceTable .arr-l.disabled {
    background: #f2f3f9;
    cursor: default;
  }

  .priceTable .arr-l {
    background: url(../assets/images/pricePrev.png) no-repeat;
    background-size: contain;
    width: 30px;
    height: 75px;
    position: fixed;
    top: 32%;
    left: 0px;
    margin-top: 120px;
    cursor: pointer;
  }

  .priceTable .arr-r.disabled {
    background: #f2f3f9;
    cursor: default;
  }

  .priceTable .arr-r {
    background: url(../assets/images/priceNext.png) no-repeat;
    background-size: contain;
    width: 30px;
    height: 75px;
    position: fixed;
    top: 32%;
    right: 15px;
    margin-top: 120px;
    cursor: pointer;
  }

  .priceBox ul.priceTable li {
    position: relative;
    height: 86px;
  }

  .priceTable li .priceArrow {
    /* overflow: hidden; */
    position: absolute;
    width: 10%;
    /* height: 100%; */
  }

  .priceTable li .leftColumn {
    position: absolute;
    width: 67%;
    height: 86px;
    left: 4px;
  }

  .priceTable li .leftColumn .priceListBox {
    width: 100%;
    position: absolute;
    overflow: hidden;
    overflow: visible;
  }

  .height30 {
    height: 30px;
  }

  .height84 div { /*overflow:hidden;*/
    height: 30px;
  }

  .height50 {
    height: 50px;
  }

  .bg1c69d4 {
    background: #3C4C6F;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg7286ab {
    background: #5D73A4;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bge60000 {
    background: #C54846;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bgef9490 {
    background: #F1948F;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg006600 {
    background: #3D783C;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg41a741 {
    background: #7DBD7C;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg817848 {
    background: #6C6836;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bgd9cd8c {
    background: #B5AA60;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg529375 {
    background: #2B8E61;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .bg98dbbc {
    background: #6AC69C;
    box-shadow: 0 2px 4px 0 #BFBFC3;
  }

  .priceTable li .leftColumn .priceListBox .long-box {
    width: 84%;
    height: 28px;
    line-height: 28px;
    display: block;
    color: #fff;
    padding: 0 2px;
    float: left;
    font-size: 0.85em;
  }

  .carName {
    width: 74%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    float: left;
    text-align: left;
  }

  .priceTable li .leftColumn .priceListBox .long-box .price {
    float: right;
    position: relative;
    background: none;
    border: 0;
    text-decoration: underline;
    width: 26%;
  }

  .priceTable li .priceListBox .long-box .priceBefore {
    width: 30%;
    text-align: right;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .priceBefore input {
    font-size: 12px;
  }

  .priceBefore input, .percent input, .kw input, .kwTop input, .floatRight input, .rrprice input {
    background: none;
    border: 0;
    text-decoration: underline;
    width: 100%;
    text-align: right;
    height: 28px;
    /* font-size: 1em; */
    font-size: 10px;
  }

  input {
    cursor: pointer;
  }

  .priceTable li .leftColumn .priceListBox .percent {
    display: block;
    float: left;
    font-size: 12px;
    width: 14%;
    line-height: 28px;
  }

  .priceTable li .leftColumn .priceListBox .percent input {
    color: #333;
  }

  .percent input.mixShowWay {
    position: absolute;
    top: 24px;
    right: 18%;
    width: 40px;
    height: 21px;
    padding-left: 0px;
    text-align: right;
  }

  .percentBottomRight input {
    position: absolute;
    width: 39px;
    height: 20px;
    top: 30px;
    right: 71px;
    text-align: center;
    background: none;
    border: 0;
    text-decoration: underline;
    font-size: 12px;
  }

  .barCenter {
    position: absolute;
    width: 3px;
    height: 23px;
    top: 32px;
    right: 112px;
    background: none;
    border: 0;
    text-decoration: none;
    font-size: 16px;
  }

  .percentBottomLeft input {
    position: absolute;
    width: 39px;
    height: 20px;
    top: 30px;
    right: 118px;
    text-align: center;
    background: none;
    border: 0;
    text-decoration: underline;
    font-size: 12px;
  }

  .priceTable li .leftColumn .priceListBox .kw {
    font-size: 14px;
    color: #1c69d4;
    position: absolute;
    top: 30px;
    left: 4px;
    height: 20px;
    width: 22%;
  }

  .kw input, .kwTop input {
    text-align: left;
    height: 14px;
    line-height: 14px;
    font-size: 12px;
  }

  .kw input {
    width: 100%;
  }

  .priceBefore input, .percent input, .kw input, .kwTop input, .floatRight input, .rrprice input {
    background: none;
    border: 0;
    text-decoration: underline;
    width: 100%;
    text-align: right;
    height: 28px;
    /* font-size: 1em; */
    font-size: 10px;
    color: #fff;
  }

  .priceTable li .leftColumn .priceListBox .kwTop {
    position: absolute;
    top: -20px;
    left: 4px;
    font-size: 14px;
    color: #1c69d4;
    height: 20px;
  }

  .kw input, .kwTop input {
    text-align: left;
    height: 14px;
    line-height: 14px;
    font-size: 12px;
  }

  .carChooseName {
    display: none;
  }

  .changeModel {
    position: absolute;
    top: 0px;
    right: 35%;
    width: 65%;
    height: 30px;
    cursor: pointer;
  }

  .priceTable li .leftColumn .priceListBox .kw {
    font-size: 14px;
    position: absolute;
    top: 30px;
    left: 4px;
    height: 20px;
    width: 22%;
  }

  .priceTable li .leftColumn .priceListBox .kw input {
    color: #1c69d4;
  }

  .hoverName, .hoverLeft {
    color: transparent;
  }

  .hoverNameEn {
    color: transparent;
    position: absolute;
    top: -30px;
    left: 32px;
    width: auto;
    height: auto;
  }

  .carChooseNameShow {
    position: absolute;
    z-index: 9999;
    top: -18px;
    left: 4px;
    padding: 0px 5px;
    white-space: nowrap;
    font-size: 14px;
    color: #1c69d4;
    background-color: #f2f3f9;
  }

  .priceTable li .rightColumn {
    position: absolute;
    width: 30%;
    height: 86px;
    right: 12px;
  }

  .priceTable li .rightColumn .priceListBox {
    position: absolute;
    width: 100%;
  }

  .priceTable li .rightColumn .priceListBox .shor-box {
    width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    color: #333;
    /* margin-left: 66%; */
    color: #fff;
    /* margin-top: 30px; */
    padding: 0 2px;
    clear: both;
  }

  .priceTable li .rightColumn .priceListBox .shor-box .price {
    float: left;
    display: block;
    width: 58%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
  }

  .rrprice input {
    text-align: left;
  }

  .priceBefore input, .percent input, .kw input, .kwTop input, .floatRight input, .rrprice input {
    background: none;
    border: 0;
    text-decoration: underline;
    width: 100%;
    text-align: right;
    height: 28px;
    /* font-size: 1em; */
    font-size: 10px;
  }

  .floatRight {
    float: right;
    width: 42%;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
  }

  .positionTopRight {
    position: absolute;
    width: 98%;
    height: 20px;
    top: -24px;
    right: 0px;
    color: #000;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
  }

  .positionBotomnLeft {
    position: absolute;
    width: 100%;
    height: 20px;
    top: 25px;
    left: 0px;
    color: #000;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
  }

  .carChooseshorName {
    display: none;
  }

  .rrprice input {
    text-align: left;
  }

  .carChooseshorNameShow {
    position: absolute;
    z-index: 9999;
    top: -28px;
    left: 1px;
    padding: 0px 5px;
    white-space: nowrap;
    border-radius: 8px;
    font-size: 14px;
    color: #1c69d4;
    background-color: #f2f3f9;
  }


</style>


