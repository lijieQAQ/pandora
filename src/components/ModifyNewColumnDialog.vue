<template>
  <el-dialog
    :visible.sync="modifyNewColumnDialogVisible"
    center
    width='820px'
    top='20vh'
    :show-close = false
  >
    <div class="modal fade" id="ModifyNewColumn" tabindex="-1" role="dialog" aria-labelledby="AddNewColumnTitle" aria-hidden="true">
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
                      <el-select id="addRowBrand" v-model="addRow.brand" placeholder="" default-first-option @change="changeBrand('addRowDate')" v-bind:disabled="addRow.addCarShowFlg">
                        <el-option v-for="item in brandList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                      </el-select>
                    </template>
                  </div>
                  <div class="arrowDown"></div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name">
                    <b class="text-danger">*</b>{{ addRow.brand ? (addRow.isBmwProduct ? "Series" : "Model") : "Series/Model" }} </label>
                  <div id="seriesAndModel">
                    <template>
                      <el-select id="addRowSeriesOrModel" v-model="addRow.seriesOrModel" placeholder="" filterable="" allow-create="" default-first-option @change="changeSeriesOrModel('addRowDate')" v-bind:disabled="addRow.addCarShowFlg" maxlength="13">
                        <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                      </el-select>
                    </template>
                  </div>
                    <div class="arrowDown"></div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>{{ addRow.brand ? (addRow.isBmwProduct ? "E-Series" : "ModelRange") : "E-Series/ModelRange" }}</label>
                  <div id="eseriesAndEngine">
                    <template>
                      <el-select id="addRowEseriesOrEngine" v-model="addRow.eseriesOrEngine" placeholder="" filterable="" allow-create="" default-first-option @change="searchRowDetail('addRowDate')" v-bind:disabled="addRow.addCarShowFlg">
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
                  >
                  </el-date-picker>
                  
                </div>
              </div>
            </fieldset>
            <div class="checkBox" v-if="!addRow.addCarShowFlg">
              <a href="javascript:void(0)" class="addMaskTitle" @click="showAddNewCar(true),commonJs.saveDataChecking('PriceLadder_ModifyNewColumn_AddNewVehicle')">Add New Vehicle<img src="../assets/images/addNewOne.png"></a>
              <div id="checkBox">
                <div class="selectedTip" v-if="addRow.productList.length > 0">
                  <span class="selectContain">Number of E-series Selected:</span>
                  <span class="selectedNum" v-on:mouseover="selectContainShow()" v-on:mouseout="selectContainHide()">{{addRow.selectedProduct.length}}</span>
                </div>
                <template>
                  <el-checkbox :indeterminate="addRow.isIndeterminate" v-model="addRow.selectAll" @change="handleSelectAllChange" v-if="addRow.productList.length > 0">{{ addRow.selectedESeriesOrEngine }}</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="addRow.selectedProduct" @change="handleSelectedProductChange">
                    <el-checkbox v-for="item in addRow.productList" :label="item" :key="item" :value="item">{{item.nickname}}<span class="carPrice">{{ accounting.formatMoney(item.rrPrice, "¥", 0) }}</span></el-checkbox>
                  </el-checkbox-group>
                </template>
              </div>
            </div>
            <!-- <div class="checkBox" v-if="addRow.addCarShowFlg">
              <div id="checkBoxTwo">
                <div class="control-group">
                  <div class="controls input-append variant">
                    <label for="name"><b class="text-danger">*</b>Variant</label>
                    <input type="text" value="F20" placeholder="" v-model="addRow.addCar.carNameEn" maxlength="50" name="addRow.addCar.carNameEn" v-validate="'required'">
                    <div class="sixErrorTip">{{ errors.first('addRow.addCar.carNameEn') }}</div>
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls input-append variantShort">
                    <label for="name"><b class="text-danger">*</b>Variant(Short)</label>
                    <input type="text" placeholder="" v-model="addRow.addCar.nickname" maxlength="19" name="addRow.addCar.nickname" v-validate="'required'">
                    <div class="sixErrorTip">{{ errors.first('addRow.addCar.nickname') }}</div>
                  </div>
                </div>

                <div class="control-group">
                  <div class="controls input-append widthHalf changeDefaultVal">
                    <label for="name"><b class="text-danger">*</b>MSRP(¥)</label>
                    <vue-numeric v-model="addRow.addCar.rrPrice" placeholder=" " currency="" min="0" maxlength="7" placeholder="" name="addRow.addCar.rrPrice" v-validate="'isnumber'"></vue-numeric>
                    <div class="sixErrorTip">{{ errors.first('addRow.addCar.rrPrice') }}</div>
                  </div>
                  <div class="controls input-append widthHalf">
                    <label for="name">Model Code</label>
                    <input type="text" placeholder="" v-model="addRow.addCar.model" v-bind:disabled="!addRow.isBmwProduct" maxlength="20" name="addRow.addCar.model" v-validate="">
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls input-append widthHalf changeDefaultVal">
                    <label for="name">
                      T/P(¥)
                    </label>
                    <vue-numeric  v-model="addRow.addCar.tsPrice" placeholder=" " currency="" min="0" maxlength="7" name="addRow.addCar.tsPrice" v-validate=""></vue-numeric>
                  </div>
                  <div class="controls input-append widthHalf" v-if="addRow.isBmwProduct">
                    <label for="name">Package Code</label>
                    <input type="text" placeholder="" v-model="addRow.addCar.packageCode" maxlength="20" name="addRow.addCar.packageCode" v-validate="">
                  </div>
                  <div class="controls input-append widthHalf" v-if="!addRow.isBmwProduct">
                    <label for="name">ModelRange</label>
                    <input type="text" placeholder="" v-model="addRow.addCar.engine" disabled="true" maxlength="20" name="addRow.addCar.engine" v-validate="">
                  </div>
                </div>

                <div class="control-group">
                  <div class="controls input-append widthHalf">
                    <label for="name">Discount(%) </label>
                    <vue-numeric class="discount" precision="2" max="100" min="0" currency="%" currency-symbol-position="suffix" maxlength="5" disabled="true">{{ accounting.toFixed(((addRow.addCar.rrPrice - addRow.addCar.tsPrice) / addRow.addCar.rrPrice * 100), 2) }}%</vue-numeric>
                  </div>
                  <div class="controls input-append widthHalf">
                    <label for="name">Line Code</label>
                    <input type="text" placeholder="" value="" maxlength="20">
                  </div>
                </div>

                <div class="control-group">
                  <div class="controls input-append widthHalf">
                    <label for="name">MIX(%)</label>
                    <vue-numeric v-model="addRow.addCar.showMixPercentage" precision="2" max="100" min="0" currency="%" currency-symbol-position="suffix" maxlength="5"></vue-numeric>
                  </div>
                  <div class="controls input-append widthHalf changeDefaultVal">
                    <label for="name">HP(KW) </label>
                    <vue-numeric placeholder=" " v-model="addRow.addCar.powerHP" precision="0" max="9999" min="0" maxlength="4"></vue-numeric>
                  </div>
                </div>

              </div>

              <div class="checkTwoBtnBox">
                <button type="button" class="checkTwoBtn" @click="showAddNewCar(false)">Back</button>
                <button type="button" class="checkTwoBtn ctWord" @click="saveAddNewCar(),commonJs.saveDataChecking('PriceLadder_ModifyNewColumn_AddNewVehicle_Save')">Save</button>
              </div>
            </div> -->
          </div>
        </div>
        <!-- <div class="modal-footer">
          <div class="btnBox">
            <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary btnConfirm" v-bind:class="{ noUseBtn : (addRow.selectedProduct.length == 0) }" v-bind:disabled="addRow.selectedProduct.length == 0" @click="confirmAddRow(),createArrow(),commonJs.saveDataChecking('PriceLadder_ModifyNewColumn_Submit')" >Submit</button>
          </div>
        </div> -->
      </div>
    </div>
  </el-dialog>
</template>
<script>
import accounting from 'accounting'
  export default {
    name:'ModifyNewColumnDialog',
    data(){
      return{
        modifyColumnDate:new Date(),
        titleList: [],
        subTitleList: [],
        accounting:accounting
      }
    },
    mounted(){
      Bus.$on('carColumnDate', carColumnDate => {
        this.modifyColumnDate = carColumnDate
      })
    },
    methods:{
      changeBrand : function(dateId) {
				this.titleList = [];
				this.subTitleList = [];
				this.addRow.seriesOrModel = "";
				this.addRow.eseriesOrEngine = "";
				this.searchRowDetail();
				if (!this.addRow.brand) {
					return;
				}else{
					$('#addMenuRowBrand').removeClass('inputErrorTwo');
					$('#addRowBrand').removeClass('inputErrorTwo');
				}
				var findFlag = false;
        
				for (var i in this.cmpBrandList) {
					if (this.cmpBrandList[i].nameEn === this.addRow.brand) {
						this.addRow.isBmwProduct = false;
						findFlag = true;
						break;
					}
				}

				if (!findFlag) {
					for (var i in this.bmwBrandList) {
						if (this.bmwBrandList[i].nameEn === this.addRow.brand) {
							this.addRow.isBmwProduct = true;
							findFlag = true;
							break;
						}
					}
				}
				if (this.addRow.isBmwProduct) {
					for (var i in this.bmwSeriesList) {
						if (this.bmwSeriesList[i].bmwBrand.nameEn === this.addRow.brand) {
							this.titleList.push(this.bmwSeriesList[i]);
						}
					}
				} else {
					for (var i in this.cmpModelList) {
						if (this.cmpModelList[i].brandNameEn === this.addRow.brand) {
							this.titleList.push(this.cmpModelList[i]);
						}
					}
				}

	     return;
      },
      searchRowDetail : function() {
				var self = this;
				//更改
				this.addRow.selectedESeriesOrEngine = "";
				this.addRow.isIndeterminate = true;
				this.addRow.selectAll = false;
				var addRowDateValue = this.modifyColumnDate;

				if (!this.addRow.eseriesOrEngine) {
					return;
				}else{
					$('#addMenuRowEseriesOrEngine').removeClass('inputErrorTwo');
					$('#addRowEseriesOrEngine').removeClass('inputErrorTwo');
				}
				var productListPromise = this.searchRowDetailCommon(
					this.addRow.brand,
					this.addRow.seriesOrModel,
					this.addRow.eseriesOrEngine,
					addRowDateValue.format('yyyymm'),
					this.addRow.isBmwProduct);
				var productList = [];
				productListPromise.then(function(val){
				productList = val;
				if(productList.length == 0){
					self.openAlert();
					self.addRowDateValue = new Date();
					return;
					}
				self.addRow.selectedProduct = [];
				self.addRow.productList = [];
				if (self.addRow.isBmwProduct) {
					self.addRow.selectedESeriesOrEngine = self.addRow.eseriesOrEngine;
					self.addRow.productList = productList;
					console.log(self.addRow.productList.length);
				} else {
					self.addRow.selectedESeriesOrEngine = self.addRow.eseriesOrEngine;
					self.addRow.productList = productList;
				}
				self.addRow.selectedProduct = self.addRow.productList;
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
    },
    props:{
      modifyNewColumnDialogVisible:Boolean,
      addRow: Object,
      brandList: Array,
      cmpBrandList: Array,
      bmwBrandList: Array,
      bmwSeriesList: Array
    }
    
  }
</script>

<style scoped lang="less">
.modal-header{
  padding:15px;
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
  margin-right: 44px;
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
  transition: transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s;
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
</style>


