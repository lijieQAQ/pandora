<template>
  <el-dialog
    :visible.sync="addNewVehicleAssemVisible"
    center
    width='48%'
    top='20vh'
    :show-close = false
    id="menuAddNewColumnMask"
  >
  	<div class="modal-dialog editModal addModal">
      <div class="modal-header">
        <h4 class="modal-title" id="AddNewColumnTitle">
          <span class="iconTitle"></span>
            Add New Column
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
                    <el-select id="addMenuRowBrand" v-model="addRow.brand" placeholder="" default-first-option @change="changeBrand()" v-bind:disabled="addRow.addCarShowFlg">
                      <el-option v-for="item in brandList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                    </el-select>
                  </template>
                </div>
              </div>
            </div>
            <div class="control-group">
              <div class="controls input-append">
                <label for="name"><b class="text-danger">*</b>{{ addRow.brand ? (addRow.isBmwProduct ? "Series" : "Model") : "Series/Model" }} </label>
                <div id="seriesAndModel">
                  <template>
                    <el-select id="addMenuRowSeriesOrModel" v-model="addRow.seriesOrModel" placeholder="" filterable="" allow-create="" default-first-option @change="changeSeriesOrModel()" v-bind:disabled="addRow.addCarShowFlg" maxlength="13">
                      <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="arrowDown"></div>
              </div>
            </div>
            <div class="control-group">
              <div class="controls input-append">
                <label for="name"><b class="text-danger">*</b>{{ addRow.brand ? (addRow.isBmwProduct ? "E-Series" : "Engine") : "E-Series/Engine" }}</label>
                <div id="eseriesAndEngine">
                  <template>
                    <el-select id="addMenuRowEseriesOrEngine" v-model="addRow.eseriesOrEngine" placeholder="" filterable="" allow-create="" default-first-option @change="searchRowDetail('menuhubAddRowDate')" v-bind:disabled="addRow.addCarShowFlg">
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
              <div class="controls input-append date form_datetime" data-link-field="dtp_input1" id="menuhubAddRowDate">
                <label for="name"><b class="text-danger">*</b>Date </label>
                <el-date-picker
									v-model="form.regDateBeg"
									format="M/yyyy"
									type="month"
									:editable="false"
									:disabled="addRow.addCarShowFlg"
								>
		        		</el-date-picker>
                <!-- <input id="dateBorderColor" size="16" type="text" v-bind:value="initDate.format('mmm yyyy')" readonly> -->
                <span class="add-on"><i class="icon-th"></i></span>
              </div>
            </div>
          </fieldset>

          <div class="checkBox" v-if="!addRow.addCarShowFlg">
            <a href="javascript:void(0)" class="addMaskTitle" @click="showAddNewCar(true, true)">Add New Vehicle<img src="../assets/images/addNewOne.png">
            </a>
            <div id="checkBox">
              <div class="selectedTip" v-if="addRow.productList.length > 0">
                <span class="selectContain">Number of E-series Selected:</span>
                <span class="selectedNum" v-on:mouseover="selectContainShow()" v-on:mouseout="selectContainHide()">{{addRow.selectedProduct.length}}</span>
              </div>
              <template>
	                <el-checkbox :indeterminate="addRow.isIndeterminate" v-model="addRow.selectAll" @change="handleSelectAllChange" v-if="addRow.productList.length > 0">{{ addRow.selectedESeriesOrEngine }}</el-checkbox>
	                <div style="margin: 15px 0;"></div>
	                <el-checkbox-group v-model="addRow.selectedProduct" @change="handleSelectedProductChange">
	                  <el-checkbox v-for="item in addRow.productList" :label="item" :key="item" :value="item">{{item.nickname}}
	                  	<span class="carPrice">{{ accounting.formatMoney(item.rrPrice, "¥", 0) }}</span>
	                  </el-checkbox>
	                </el-checkbox-group>
              </template>
            </div>
          </div>
          <AddOneCar :addRow="addRow" :menuhub="menuhub" @showAddNewCar="showAddNewCar"></AddOneCar>
				</div>
      </div>
      <div class="modal-footer">
        <div class="btnBox">
          <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal" @click="closeAddNewCarModal()">Cancel</button>
          <button type="button" class="btn btn-primary btnConfirm" v-bind:class="{ noUseBtn : (addRow.selectedProduct.length == 0) }" v-bind:disabled="addRow.selectedProduct.length == 0" @click="confirmMenuhubAddRow()">Submit</button>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>
</template>

<script type="text/javascript">
	import AddOneCar from './AddOneCar'
  import accounting from 'accounting'
	export default{
		name:'addNewVehicleAssem',
		data(){
		  return{
		  	form: {
					regDateBeg: new Date(),//这个日期参数
				},
		  	// initDate:(new Date()).format("myyyy"),
				titleList:[],
				subTitleList: [],
				accounting: accounting,
				addRow: {
					brand: "",
					seriesOrModel: "",
					eseriesOrEngine: "",
					yearMonth: (new Date()).format('yyyymm'),
					isBmwProduct: true,
					productList: [],
					selectedESeriesOrEngine: "",
					selectedProduct: [],
					selectAll: false,
					isIndeterminate: true,
					addCarShowFlg : false,

					addCar: {
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
						yearMonth: (new Date()).format('yyyymm'),
						laneIndex : 0,
						carIndex : 0,
					},
				},
			}
		},
		props: {
			addNewVehicleAssemVisible: Boolean,
			bmwBrandList:Array,
			brandList:Array,
			bmwSeriesList:Array,
			cmpBrandList:Array,
			cmpModelList:Array,
			cmpModelRangeList:Array,
			bmwESeriesList:Array,
			menuhub:Object,
		},
		components:{
			AddOneCar
  	},
		methods:{
		  closeAddNewCarModal:function(){
				this.$emit('closeAddNewCarModal', false)
		  },
		  initAddCar : function() {
	      this.addRow = {
					brand: "",
					seriesOrModel: "",
					eseriesOrEngine: "",
					yearMonth: (new Date()).format('yyyymm'),
					isBmwProduct: true,
					productList: [],
					selectedESeriesOrEngine: "",
					selectedProduct: [],
					selectAll: false,
					isIndeterminate: true,
					addCarShowFlg : false,
					addCar: {
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
						yearMonth: (new Date()).format('yyyymm'),
						laneIndex : 0,
						carIndex : 0,
						},
					};
					this.modifyCarLane = {
						isAddCarLane: true,
						modifyIdx : -1,
					};
	    },
	    changeBrand : function() {
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
				var addRowDateValue = this.form.regDateBeg;

				if (!this.addRow.eseriesOrEngine) {
					return;
				}else{
					$('#addMenuRowEseriesOrEngine').removeClass('inputErrorTwo');
					$('#addRowEseriesOrEngine').removeClass('inputErrorTwo');
				}
				var productListPromise = this.$parent.searchRowDetailCommon(
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
					self.initDate = new Date();
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
      changeSeriesOrModel: function () {
			  this.subTitleList = [];
			  this.addRow.eseriesOrEngine = "";
			  this.searchRowDetail();
			  if (!this.addRow.seriesOrModel) {
			    return;
				}else{
					$('#addMenuRowSeriesOrModel').removeClass('inputErrorTwo');
					$('#addRowSeriesOrModel').removeClass('inputErrorTwo');
				}

				if (this.addRow.isBmwProduct) {
					for (var i in this.bmwESeriesList) {
						if (this.bmwESeriesList[i].bmwSeries.nameEn === this.addRow.seriesOrModel) {
							this.subTitleList.push(this.bmwESeriesList[i]);
						}
					}
				} else {
				//          for (var i in this.cmpEngineList) {
				//            if (this.cmpEngineList[i].model === this.addRow.seriesOrModel) {
				//              this.subTitleList.push(this.cmpEngineList[i]);
				//            }
				//          }
					for(var i in this.cmpModelRangeList){
						if(this.cmpModelRangeList[i].model === this.addRow.seriesOrModel){
							this.subTitleList.push(this.cmpModelRangeList[i]);  			
						}
					}
				}
			},
      confirmMenuhubAddRow : function() {
				if (this.addRow.selectedProduct.length > 0) {
					// var addRowDateValue = $('#addRowDate').datetimepicker('getDate');
					var addRowDateValue = this.form.regDateBeg;
					var block = {
						brandNameEn: this.addRow.brand,
						seriesNameEn: this.addRow.isBmwProduct ? this.addRow.seriesOrModel : "",
						eseriesNameEn: this.addRow.isBmwProduct ? this.addRow.eseriesOrEngine : "",
						bmwFlg: this.addRow.isBmwProduct,
						model: this.addRow.isBmwProduct ? "" : this.addRow.seriesOrModel,
						engine: this.addRow.isBmwProduct ? "" : this.addRow.eseriesOrEngine,
						cars:  this.addRow.selectedProduct,
						yearMonth: addRowDateValue.format('yyyymm'),
						yearMonthForShow : addRowDateValue,
						checkAll: true,
						isIndeterminate: true,
						checkedCars: this.addRow.selectedProduct,
				  }
					this.menuhub.blockList.push(block);
				}
				this.$emit('closeAddNewCarModal', false)
				
			},
      showAddNewCar : function(showFlg, menuhubFlg) {
				if (!showFlg) {
					this.addRow.addCarShowFlg = showFlg;
					this.addRow.addCar = {
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
						yearMonth: (new Date()).format('yyyymm'),
						laneIndex : 0,
						carIndex : 0,
					};
				} else {
					var errFlg = false;
					if (!this.addRow.brand) {
						menuhubFlg ? $('#addMenuRowBrand').addClass('inputErrorTwo') : $('#addRowBrand').addClass('inputErrorTwo');
						errFlg = true;
					} else {
						menuhubFlg ? $('#addMenuRowBrand').removeClass('inputErrorTwo') : $('#addRowBrand').removeClass('inputErrorTwo');
					}

					if (!this.addRow.seriesOrModel) {
						menuhubFlg ? $('#addMenuRowSeriesOrModel').addClass('inputErrorTwo') : $('#addRowSeriesOrModel').addClass('inputErrorTwo');
						errFlg = true;
					} else {
						menuhubFlg ? $('#addMenuRowSeriesOrModel').removeClass('inputErrorTwo') : $('#addRowSeriesOrModel').removeClass('inputErrorTwo');
					}

					if (!this.addRow.eseriesOrEngine) {
						menuhubFlg ? $('#addMenuRowEseriesOrEngine').addClass('inputErrorTwo') : $('#addRowEseriesOrEngine').addClass('inputErrorTwo');
						errFlg = true;
					} else {
						menuhubFlg ? $('#addMenuRowEseriesOrEngine').removeClass('inputErrorTwo') : $('#addRowEseriesOrEngine').removeClass('inputErrorTwo');
					}

					if (errFlg) {
						return;
					}

					//待改
					// var addRowDateValue = $('#addRowDate').datetimepicker('getDate');
					var addRowDateValue = this.form.regDateBeg;
					this.addRow.addCar.yearMonth = addRowDateValue.format('yyyymm');
					if (!this.addRow.addCar.yearMonth) {
						return;
					}

					this.addRow.addCar.bmwFlg = this.addRow.isBmwProduct;
					this.addRow.addCar.brandNameEn = this.addRow.brand;
					if (this.addRow.addCar.bmwFlg) {
						this.addRow.addCar.seriesNameEn = this.addRow.seriesOrModel;
						this.addRow.addCar.eseriesNameEn = this.addRow.eseriesOrEngine;
					} else {
						this.addRow.addCar.model = this.addRow.seriesOrModel;
						this.addRow.addCar.engine = this.addRow.eseriesOrEngine;
					}

					this.addRow.addCarShowFlg = showFlg;
				}
			},
			selectContainShow: function(){
				$(".selectContain").attr('class','selectContainShow');
			},
	
			selectContainHide: function(){
				$(".selectContainShow").attr('class','selectContain');
			},
			handleSelectedProductChange: function (value) {
        let checkedCount = value.length;
        this.addRow.selectAll = checkedCount === this.addRow.productList.length;
        this.addRow.isIndeterminate = checkedCount > 0 && checkedCount < this.addRow.productList.length;
			},
			handleSelectAllChange: function (val) {
        this.addRow.selectedProduct = val ? this.addRow.productList : [];
        this.addRow.isIndeterminate = false;
      },
		  // 下面这个括号是methods的

		},
		
        
		//methods
	}
</script>

<style scoped lang='less'>
	.modal-dialog{
		margin:220px auto;
	}
	.editModal{
			width:860px;
			background: #fff;
	}
	.editModal .modal-header{
		border-bottom: none
	}
	.editModal .modal-title{
		margin: 0 30px;
		font-size: 18px;
		color: #606060;
		/*border-bottom: 1px solid #64C3EE;*/
		height: 28px;
		line-height: 28px;
		font-weight: normal;
	}
	.editModal .modal-title .iconTitle{
		position: relative;
		left: -7px;
		width: 30px;height: 12px; 
		display: inline-block; 
		background: url("../assets/images/model-titleIcon.png") 100% 100% no-repeat;
		background-size: 26px;
	}
	.editModal .modal-title .underline{
		width: 100%;
		height: 1px;
		background: linear-gradient(to right, #7BA0F1, #64C3EE, #fff);
	}
	.editModal .modal-content,.editModal .modal-body{
		overflow:hidden;
	}
	.modal-content {
		position: relative;
		background-color: #fff;
		border: 0px solid #999;
		border-radius: 0px;
		outline: 0;
		box-shadow: none;
	}
	.editModal .select-box {
		width: 182px;
		margin: 30px 34px 0 23px;
		float: left;
		border: none;
	}
	.select-box .control-group{
		margin-bottom:30px;
	}

	.editModal .control-group{
		clear: both;
		overflow: hidden;
		position: relative;
		height: 46px;
	}
	.editModal label{
		font-size: 14px; 
		color: #666; 
		font-weight: normal;
	}
	.editModal .text-danger {
		color: #f80000;
		font-weight: normal;
	}
	.addModal{
		height: 529px;
		margin-top: 7%;
	}
	.checkBox{
		width: 533px;
		margin-right: 37px;
		float: right;
	}
	a:hover, a:visited, a:link, a:active {
		color: #606060;
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
	.modal-header {
		min-height: 16.43px;
		padding: 15px;
		border-bottom: 1px solid #e5e5e5;
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

	.editModal label {
		font-size: 14px;
		color: #666;
		font-weight: normal;
	}
	.editModal #checkBox .el-checkbox-group label {
		border: 0px;
		margin: 18px 0;
		padding-bottom: 0px;
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

	.editModal .modal-footer .btn {
		width: 120px;
		height: 34px;
		border-radius: 3px;
		font-size: 18px;
		border: 0px;
		margin-left: 0;
		line-height: 36px;
		margin-top: 36px;
	}
	.editModal .modal-footer .btnCancel {
		color: #A6A6A6;
		margin-right: 60px;
		background: #FFF;
		border: 1px solid #A6A6A6 !important;
	}

	.btn {
		padding: 0;
	}
	.editModal .modal-footer .btnConfirm {
		color: #FFF;
		background: #FFF;
		border: 1px solid #2D9DEA;
		border-radius: 3px;
		background-image: linear-gradient(-90deg, #2D9DEA 0%, #1464D0 100%);
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
</style>