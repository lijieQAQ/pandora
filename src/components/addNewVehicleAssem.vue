<template>

  <el-dialog
    :visible.sync="addNewVehicleAssemVisible"
    center
    width='45%'
    top='20vh'
    show-close=false
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
                    <el-select id="addMenuRowBrand" v-model="addRow.brand" placeholder="" default-first-option @change="changeBrand('menuhubAddRowDate')" v-bind:disabled="addRow.addCarShowFlg">
                      <el-option v-for="item in brandList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="arrowDown"></div>
              </div>
            </div>
            <!-- <div class="control-group">
              <div class="controls input-append">
                <label for="name"><b class="text-danger">*</b>{{ addRow.brand ? (addRow.isBmwProduct ? "Series" : "Model") : "Series/Model" }} </label>
                <div id="seriesAndModel">
                  <template>
                    <el-select id="addMenuRowSeriesOrModel" v-model="addRow.seriesOrModel" placeholder="" filterable="" allow-create="" default-first-option @change="changeSeriesOrModel('menuhubAddRowDate')" v-bind:disabled="addRow.addCarShowFlg" maxlength="13">
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
              <div class="controls input-append date form_datetime" data-link-field="dtp_input1" id="menuhubAddRowDate" v-if="!addRow.addCarShowFlg">
                <label for="name"><b class="text-danger">*</b>Date </label>
                <input id="dateBorderColor" size="16" type="text" v-bind:value="initDate.format('mmm yyyy')" readonly>
                <span class="add-on"><i class="icon-th"></i></span>
              </div>
              <div class="controls input-append date" v-if="addRow.addCarShowFlg">
                <label for="name"><b class="text-danger">*</b>Date </label>
                <input size="16" :value="convertYearMonth2Date(addRow.addCar.yearMonth).format('mmm yyyy')" disabled="disabled" type="text">
                <span class="add-on"><i class="icon-th icon-thNo"></i></span>
              </div>
            </div> -->
          </fieldset>
          <!-- <div class="checkBox" v-if="!addRow.addCarShowFlg">
            <a href="javascript:void(0)" class="addMaskTitle" @click="showAddNewCar(true, true)">Add New Vehicle<img src="images/addNewOne.png"></a>
            <div id="checkBox">
              <div class="selectedTip" v-if="addRow.productList.length > 0">
                <span class="selectContain">Number of E-series Selected:</span>
                <span class="selectedNum" v-on:mouseover="selectContainShow()" v-on:mouseout="selectContainHide()">{{addRow.selectedProduct.length}}</span></div>
              <template>
                <el-checkbox :indeterminate="addRow.isIndeterminate" v-model="addRow.selectAll" @change="handleSelectAllChange" v-if="addRow.productList.length > 0">{{ addRow.selectedESeriesOrEngine }}</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="addRow.selectedProduct" @change="handleSelectedProductChange">
                  <el-checkbox v-for="item in addRow.productList" :label="item" :key="item" :value="item">{{item.nickname}}<span class="carPrice">{{ accounting.formatMoney(item.rrPrice, "¥", 0) }}</span></el-checkbox>
                </el-checkbox-group>
              </template>
            </div>
          </div> -->
          <!-- <div class="checkBox" v-if="addRow.addCarShowFlg">

	          <div id="checkBoxTwo">
	            <div class="control-group">
	              <div class="controls input-append">
	                <label for="name"><b class="text-danger">*</b>Variant</label>
	                <input type="text" value="F20" placeholder="" v-model="addRow.addCar.carNameEn" maxlength="50" name="menuhub.addRow.addCar.carNameEn" v-validate="'required'">
	                <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.carNameEn') }}</div>
	              </div>
	            </div>
	            <div class="control-group">
	              <div class="controls input-append">
	                <label for="name"><b class="text-danger">*</b>Variant(Short)</label>
	                <input type="text" placeholder="" v-model="addRow.addCar.nickname" maxlength="19" name="menuhub.addRow.addCar.nickname" v-validate="'required'">
	                <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.nickname') }}</div>
	              </div>
	            </div>

	            <div class="control-group">
	              <div class="controls input-append widthHalf">
	                <label for="name"><b class="text-danger">*</b>Model Code</label>
	                <input type="text" placeholder="" v-model="addRow.addCar.model" v-bind:disabled="!addRow.isBmwProduct" maxlength="20" name="menuhub.addRow.addCar.model" v-validate="'required'">
	                <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.model') }}</div>
	              </div>
	              <div class="controls input-append widthHalf changeDefaultVal">
	                <label for="name"><b class="text-danger">*</b>MSRP(¥)</label>
	                <vue-numeric v-model="addRow.addCar.rrPrice" placeholder=" " currency="" min="0" maxlength="7" name="menuhub.addRow.addCar.rrPrice" v-validate="'isnumber'"></vue-numeric>
	                <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.rrPrice') }}</div>
	              </div>
	            </div>
	            <div class="control-group">
	              <div class="controls input-append widthHalf">
	                <label for="name"><b class="text-danger">*</b> {{ addRow.isBmwProduct ? "Package Code" : "Engine" }}</label>
	                <input v-if="addRow.isBmwProduct" type="text" placeholder="" v-model="addRow.addCar.packageCode" maxlength="20" name="menuhub.addRow.addCar.packageCode" v-validate="'required'">
	                <input v-if="!addRow.isBmwProduct" type="text" placeholder="" v-model="addRow.addCar.engine" disabled="true" maxlength="20" name="menuhub.addRow.addCar.engine" v-validate="'required'">
	                <div v-if="addRow.isBmwProduct" class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.packageCode') }}</div>
	                <div v-if="!addRow.isBmwProduct" class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.engine') }}</div>
	              </div>
	              <div class="controls input-append widthHalf changeDefaultVal">
	                <label for="name">
	                  <b class="text-danger">*</b>T/P(¥)
	                </label>
	                <vue-numeric  v-model="addRow.addCar.tsPrice" placeholder=" " currency="" min="0" maxlength="7" name="menuhub.addRow.addCar.tsPrice" v-validate="'isnumber'"></vue-numeric>
	                <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.tsPrice') }}</div>
	              </div>
	            </div>
	            <div class="control-group">
	              <div class="controls input-append widthHalf">
	                <label for="name">Line Code</label>
	                <input type="text" placeholder="" value="" maxlength="20">
	              </div>
	              <div class="controls input-append widthHalf">
	                <label for="name">Discount(%) </label>
	                <span class="discount">{{ accounting.toFixed(((addRow.addCar.rrPrice - addRow.addCar.tsPrice) / addRow.addCar.rrPrice * 100), 2) }}%</span>
	              </div>
	            </div>

	            <div class="control-group">
	              <div class="controls input-append widthHalf changeDefaultVal">
	                <label for="name">HP(KW) </label>
	                <vue-numeric placeholder=" " v-model="addRow.addCar.powerHP" precision="0" max="9999" min="0" maxlength="4"></vue-numeric>
	              </div>
	              <div class="controls input-append widthHalf">
	                <label for="name">MIX(%)</label>
	                <vue-numeric v-model="addRow.addCar.showMixPercentage" precision="2" max="100" min="0" currency="%" currency-symbol-position="suffix" maxlength="5"></vue-numeric>
	              </div>
	            </div>
	          </div>

            <div class="checkTwoBtnBox">
              <button type="button" class="checkTwoBtn" @click="showAddNewCar(false, true)">Back</button>
              <button type="button" class="checkTwoBtn ctWord" @click="saveAddMenuhubNewCar()">Save</button>
            </div>

          </div> -->
        </div>
      </div>

      <!-- <div class="modal-footer">
        <div class="btnBox">
          <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary btnConfirm" v-bind:class="{ noUseBtn : (addRow.selectedProduct.length == 0) }" v-bind:disabled="addRow.selectedProduct.length == 0" @click="confirmMenuhubAddRow(),createArrow()" >Submit</button>
        </div>
      </div> -->
    </div>
    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>


</template>

<script type="text/javascript">
	export default{
		name:'addNewVehicleAssem',
		data(){
		  return{
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
		   addNewVehicleAssemVisible: Boolean
		},
		methods:{
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
		},
		//methods
	}
</script>

<style scoped lang='less'>
.modal-dialog{
	margin:220px auto;
}
.editModal{
    width:820px;
    height:810px;
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
</style>