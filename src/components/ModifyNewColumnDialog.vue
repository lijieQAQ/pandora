<template>
  <el-dialog
    :visible.sync="modifyNewColumnDialogVisible"
    center
    width='820px'
    top='20vh'
    :show-close=false
  >
    <div class="modal fade" id="ModifyNewColumn" tabindex="-1" role="dialog" aria-labelledby="AddNewColumnTitle"
         aria-hidden="true">
      <div class="modal-dialog editModal addModal">
        <div class="modal-header">
          <h4 class="modal-title" id="ModifyNewColumnTitle">
            <span class="iconTitle"></span>
            Modify New Column
            <div class="underline"></div>
          </h4>
        </div>
        <div class="modal-content">
          <div class="modal-body">
            <fieldset class="select-box">
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>Brand</label>
                  <div id="Brand">
                    <template>
                      <el-select id="addRowBrand" v-model="addRow.brand" placeholder="" default-first-option
                                 @change="changeBrand('addRowDate')" v-bind:disabled="addRow.addCarShowFlg">
                        <el-option v-for="item in brandList" :key="item.nameEn" :label="item.nameEn"
                                   :value="item.nameEn"></el-option>
                      </el-select>
                    </template>
                  </div>
                  <div class="arrowDown"></div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name">
                    <b class="text-danger">*</b>{{ addRow.brand ? (addRow.isBmwProduct ? 'Series' : 'Model') :
                    'Series/Model' }} </label>
                  <div id="seriesAndModel">
                    <template>
                      <el-select id="addRowSeriesOrModel" v-model="addRow.seriesOrModel" placeholder="" filterable=""
                                 allow-create="" default-first-option @change="changeSeriesOrModel('addRowDate')"
                                 v-bind:disabled="addRow.addCarShowFlg" maxlength="13">
                        <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn"
                                   :value="item.nameEn"></el-option>
                      </el-select>
                    </template>
                  </div>
                  <div class="arrowDown"></div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>{{ addRow.brand ? (addRow.isBmwProduct ? 'E-Series' :
                    'ModelRange') : 'E-Series/ModelRange' }}</label>
                  <div id="eseriesAndEngine">
                    <template>
                      <el-select id="addRowEseriesOrEngine" v-model="addRow.eseriesOrEngine" placeholder=""
                                 filterable="" allow-create="" default-first-option
                                 @change="searchRowDetail('addRowDate')" v-bind:disabled="addRow.addCarShowFlg">
                        <el-option
                          v-for="item in subTitleList"
                          :key="item.nameEn"
                          :label="item.nameEn"
                          :value="item.nameEn">
                        </el-option>
                      </el-select>
                    </template>
                  </div>
                  <div class="arrowDown"></div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append date form_datetime" data-link-field="dtp_input1" id="ModifyRowDate">
                  <label for="name"><b class="text-danger">*</b>Date </label>
                  <el-date-picker
                    v-model='modifyColumnDate'
                    format="M/yyyy"
                    type="month"
                    :editable="false"
                    :disabled="addRow.addCarShowFlg"
                  >
                  </el-date-picker>
                </div>
              </div>
            </fieldset>
            <div class="checkBox" v-if="!addRow.addCarShowFlg">
              <a href="javascript:void(0)" class="addMaskTitle" @click="showAddNewCar(true)">Add New Vehicle<img
                src="../assets/images/addNewOne.png"></a>
              <div id="checkBox">
                <div class="selectedTip" v-if="addRow.productList.length > 0">
                  <span class="selectContain">Number of E-series Selected:</span>
                  <span class="selectedNum" v-on:mouseover="selectContainShow()" v-on:mouseout="selectContainHide()">{{addRow.selectedProduct.length}}</span>
                </div>
                <template>
                  <el-checkbox :indeterminate="addRow.isIndeterminate" v-model="addRow.selectAll"
                               @change="handleSelectAllChange" v-if="addRow.productList.length > 0">{{
                    addRow.selectedESeriesOrEngine }}
                  </el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="addRow.selectedProduct" @change="handleSelectedProductChange">
                    <el-checkbox v-for="item in addRow.productList" :label="item" :key="item" :value="item">
                      {{item.nickname}}<span class="carPrice">{{ accounting.formatMoney(item.rrPrice, '¥', 0) }}</span>
                    </el-checkbox>
                  </el-checkbox-group>
                </template>
              </div>
            </div>
            <modifyOneCar :addRow="addRow" :menuhub="menuhub" @showAddNewCar="showAddNewCar">></modifyOneCar>
          </div>
        </div>
        <div class="modal-footer">
          <div class="btnBox">
            <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal"
                    @click="closeModifyColumnDialog">Cancel
            </button>
            <button type="button" class="btn btn-primary btnConfirm"
                    v-bind:class="{ noUseBtn : (addRow.selectedProduct.length == 0) }"
                    v-bind:disabled="addRow.selectedProduct.length == 0" @click="confirmAddRow()">Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import accounting from 'accounting'
import modifyOneCar from './modifyOneCar'
import store from '../store'

export default {
  name: 'ModifyNewColumnDialog',
  data () {
    return {
      modifyColumnDate: new Date(),
      titleList: [],
      cmpModelList: store.state.cmpModelList,
      cmpModelRangeList: store.state.cmpModelRangeList,
      subTitleList: [],
      accounting: accounting,
      carScreen: this.$store.state.carScreen
    }
  },
  mounted () {
    console.log(this.modifyCarLane)
    // Bus.$on('carColumnDate', carColumnDate => {
    //   this.modifyColumnDate = carColumnDate
    // })
  },
  methods: {
    closeModifyColumnDialog: function () {
      this.$emit('closeModifyColumnDialog', false)
    },
    changeBrand: function (dateId) {
      this.titleList = []
      this.subTitleList = []
      this.addRow.seriesOrModel = ''
      this.addRow.eseriesOrEngine = ''
      this.searchRowDetail()
      if (!this.addRow.brand) {
        return
      } else {
        $('#addMenuRowBrand').removeClass('inputErrorTwo')
        $('#addRowBrand').removeClass('inputErrorTwo')
      }
      var findFlag = false

      for (var i in this.cmpBrandList) {
        if (this.cmpBrandList[i].nameEn === this.addRow.brand) {
          this.addRow.isBmwProduct = false
          findFlag = true
          break
        }
      }
      if (!findFlag) {
        for (var i in this.bmwBrandList) {
          if (this.bmwBrandList[i].nameEn === this.addRow.brand) {
            this.addRow.isBmwProduct = true
            findFlag = true
            break
          }
        }
      }
      if (this.addRow.isBmwProduct) {
        for (let i in this.bmwSeriesList) {
          if (this.bmwSeriesList[i].bmwBrand.nameEn === this.addRow.brand) {
            this.titleList.push(this.bmwSeriesList[i])
          }
        }
      } else {
        for (let i in this.cmpModelList) {
          if (this.cmpModelList[i].brandNameEn === this.addRow.brand) {
            this.titleList.push(this.cmpModelList[i])
          }
        }
      }
      return
    },
    searchRowDetail: function () {
      var self = this
      //更改
      this.addRow.selectedESeriesOrEngine = ''
      this.addRow.isIndeterminate = true
      this.addRow.selectAll = false
      var addRowDateValue = this.modifyColumnDate

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
          self.addRowDateValue = new Date()
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
    changeSeriesOrModel: function (dateId) {
      this.addRow.productList = []
      this.addRow.selectedProduct = []
      this.subTitleList = []
      this.addRow.eseriesOrEngine = ''
      this.searchRowDetail(dateId)
      if (!this.addRow.seriesOrModel) {
        return
      } else {
        $('#addMenuRowSeriesOrModel').removeClass('inputErrorTwo')
        $('#addRowSeriesOrModel').removeClass('inputErrorTwo')
      }

      if (this.addRow.isBmwProduct) {
        for (var i in this.bmwESeriesList) {
          if (this.bmwESeriesList[i].bmwSeries.nameEn === this.addRow.seriesOrModel) {
            this.subTitleList.push(this.bmwESeriesList[i])
          }
        }
      } else {
        for (let i in this.cmpModelRangeList) {
          if (this.cmpModelRangeList[i].model === this.addRow.seriesOrModel) {
            this.subTitleList.push(this.cmpModelRangeList[i])
          }
        }
      }
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
    showAddNewCar: function (showFlg, menuhubFlg) {

      if (!showFlg) {
        this.addRow.addCarShowFlg = showFlg
        this.addRow.addCar = {
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
      } else {
        var errFlg = false
        if (!this.addRow.brand) {
          menuhubFlg ? $('#addMenuRowBrand').addClass('inputErrorTwo') : $('#addRowBrand').addClass('inputErrorTwo')
          errFlg = true
        } else {
          menuhubFlg ? $('#addMenuRowBrand').removeClass('inputErrorTwo') : $('#addRowBrand').removeClass('inputErrorTwo')
        }

        if (!this.addRow.seriesOrModel) {
          menuhubFlg ? $('#addMenuRowSeriesOrModel').addClass('inputErrorTwo') : $('#addRowSeriesOrModel').addClass('inputErrorTwo')
          errFlg = true
        } else {
          menuhubFlg ? $('#addMenuRowSeriesOrModel').removeClass('inputErrorTwo') : $('#addRowSeriesOrModel').removeClass('inputErrorTwo')
        }

        if (!this.addRow.eseriesOrEngine) {
          menuhubFlg ? $('#addMenuRowEseriesOrEngine').addClass('inputErrorTwo') : $('#addRowEseriesOrEngine').addClass('inputErrorTwo')
          errFlg = true
        } else {
          menuhubFlg ? $('#addMenuRowEseriesOrEngine').removeClass('inputErrorTwo') : $('#addRowEseriesOrEngine').removeClass('inputErrorTwo')
        }

        if (errFlg) {
          return
        }
        var addRowDateValue = this.modifyColumnDate

        this.addRow.addCar.yearMonth = addRowDateValue.format('yyyymm')
        if (!this.addRow.addCar.yearMonth) {
          return
        }

        this.addRow.addCar.bmwFlg = this.addRow.isBmwProduct
        this.addRow.addCar.brandNameEn = this.addRow.brand
        if (this.addRow.addCar.bmwFlg) {
          this.addRow.addCar.seriesNameEn = this.addRow.seriesOrModel
          this.addRow.addCar.eseriesNameEn = this.addRow.eseriesOrEngine
        } else {
          this.addRow.addCar.model = this.addRow.seriesOrModel
          this.addRow.addCar.engine = this.addRow.eseriesOrEngine
        }

        this.addRow.addCarShowFlg = showFlg
      }
    },
    confirmAddRow: function () {
      if (this.addRow.selectedProduct.length > 0) {
        var addRowDateValue = this.modifyColumnDate
        var carLane = {
          brandNameEn: this.addRow.brand,
          seriesNameEn: this.addRow.isBmwProduct ? this.addRow.seriesOrModel : '',
          eseriesNameEn: this.addRow.isBmwProduct ? this.addRow.eseriesOrEngine : '',
          bmwFlg: this.addRow.isBmwProduct,
          model: this.addRow.isBmwProduct ? '' : this.addRow.seriesOrModel,
          engine: this.addRow.isBmwProduct ? '' : this.addRow.eseriesOrEngine,
          cars: this.addRow.selectedProduct,
          yearMonth: addRowDateValue.format('yyyymm'),
          yearMonthForShow: addRowDateValue
        }
        if (this.modifyCarLane.isAddCarLane) {
          store.commit('ADD_CARSCREEN', carLane)
          // this.carScreen.addCarLane(carLane);
        } else {
          // this.carScreen.setRow(this.modifyCarLane.modifyIdx, carLane);
          let params = {
            a: this.modifyCarLane.modifyIdx,
            b: carLane
          }
          store.commit('SETROW_CARSCREEN', params)
        }
      }
      this.closeModifyColumnDialog()
    },
    selectContainHide: function () {
      $('.selectContainShow').attr('class', 'selectContain')
    },
    carChooseNameShow: function (i, j) {
      $('.nameLeft' + i + j).addClass('carChooseNameShow').removeClass('carChooseName hoverLeft')
    }
  },
  props: {
    modifyNewColumnDialogVisible: Boolean,
    addRow: Object,
    brandList: Array,
    cmpBrandList: Array,
    bmwBrandList: Array,
    bmwSeriesList: Array,
    modifyCarLane: {
      isAddCarLane: Boolean,
      modifyIdx: Number
    },
  },
  components: {
    modifyOneCar
  }
}
</script>

<style scoped lang="less">
  .modal-header {
    padding: 15px;
  }

  .addModal {
    height: 529px;
    margin-top: 7%;
  }

  .editModal {
    width: 860px;
    background: #fff;
  }

  .editModal .modal-title {
    margin: 0 30px;
    font-size: 18px;
    color: #606060;
    border-bottom: 1px solid #64C3EE;
    font-weight: normal;
  }

  .editModal .modal-content, .editModal .modal-body {
    overflow: hidden;
  }

  .editModal .select-box {
    width: 182px;
    margin: 30px 34px 0 44px;
    float: left;
    border: none;
    padding: 0px;
  }

  .editModal .control-group {
    width: 182px;
    clear: both;
    overflow: hidden;
    position: relative;
    height: 46px;
    margin-bottom: 30px;
  }

  .editModal label {
    font-size: 14px;
    color: #666;
    font-weight: normal;
  }

  .editModal .text-danger {
    color: #f80000;
    font-weight: normal;
  }

  .el-input__suffix {
    right: 2px;
  }

  #Brand .el-input__suffix-inner {
    background: url(../assets/images/downNew.png) no-repeat center;
    border-left: 0px solid #e8e8e8 !important;
    background-size: 12px;
  }

  .el-input__suffix-inner {
    /* background: url(../assets/images/downNew.png) no-repeat center; */
    /* border-left: 1px solid #e8e8e8 !important; */
    background-size: 12px;
  }

  .checkBox {
    width: 511px;
    margin-right: 70px;
    float: right;
  }

  .addMaskTitle {
    float: right;
    display: block;
    margin-bottom: 6px;
    line-height: 18px;
    font-size: 14px;
    color: #606060;
  }

  .addMaskTitle img {
    vertical-align: sub;
    margin-left: 6px;
    width: 15px;
    height: 15px;
  }

  #checkBox, #checkBoxTwo, #checkBoxThree {
    width: 511px;
    height: 312px;
    margin: 6px 0 0 0;
    overflow-y: auto;
    border: 1px solid #D9D9D9;
    position: relative;
    border-radius: 4px;
    background: #FFF;
  }

  #checkBoxTwo, #checkBoxThree {
    padding: 20px 10px 0 10px;
  }

  .selectedTip {
    display: inline-block;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 14px;
    color: #999;
    letter-spacing: 0.5;
    z-index: 9999;
  }

  .selectContain {
    width: 100px;
    height: 30px;
    display: none;
  }

  .selectedNum {
    color: #333;
    margin-left: 5px;
    text-align: center;
  }

  .selectedNum {
    cursor: pointer;
    width: 60px;
    height: 23px;
    display: inline-block;
    border: 1px solid #e8e8e8;
    line-height: 20px;
  }

  .editModal #checkBox label {
    display: block;
    margin: 20px;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 15px;
  }

  .editModal label {
    font-size: 14px;
    color: #666;
    font-weight: normal;
  }

  .editModal #checkBox label .el-checkbox__input {
    padding-left: 0px;
  }

  .checkBox #checkBox .el-checkbox .el-checkbox__input .el-checkbox__inner::after {
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

  input {
    cursor: pointer;
  }

  .el-checkbox__label {
    font-size: 20px;
  }

  .editModal #checkBox .el-checkbox-group label {
    border: 0px;
    margin: 18px 0;
    padding-bottom: 0px;
  }

  .editModal #checkBox label {
    display: block;
    margin: 20px;
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 15px;
  }

  .editModal label {
    font-size: 14px;
    color: #666;
    font-weight: normal;
  }

  .editModal #checkBox .el-checkbox-group label .el-checkbox__input {
    padding-left: 18px;
  }

  .editModal #checkBox label .el-checkbox__input {
    padding-left: 0px;
  }

  .el-checkbox__input {
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: middle;
  }

  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #666;
  }

  .editModal .modal-footer {
    border-top: 0px;
    background: #fff;
    padding: 0;
    text-align: center;
  }

  .editModal .modal-footer .btnBox {
    width: 400px;
    margin: 0 auto;
  }

  .editModal .modal-footer .btnCancel {
    color: #A6A6A6;
    margin-right: 60px;
    background: #FFF;
    border: 1px solid #A6A6A6;
    border-radius: 3px;
  }

  .editModal .modal-footer .btn {
    width: 120px;
    height: 34px;
    border-radius: 2px;
    font-size: 18px;
    border: 0px;
    margin-left: 0;
    line-height: 36px;
    margin-top: 36px;
  }

  .btn {
    padding: 0;
  }

  .editModal .modal-footer .btnCancel {
    color: #A6A6A6;
    margin-right: 60px;
    background: #FFF;
    border: 1px solid #A6A6A6;
    border-radius: 3px;
  }

  .editModal .modal-footer .btnConfirm {
    color: #FFF;
    background: #FFF;
    border: 1px solid #2D9DEA;
    border-radius: 3px;
    background-image: linear-gradient(-90deg, #2D9DEA 0%, #1464D0 100%);
  }
</style>


