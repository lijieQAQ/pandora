<template>
  <el-dialog
    :visible.sync="modifyNewColumnDialogVisible"
    center
    width='820px'
    top='20vh'
    :show-close = false
  >
    <div class="modal fade" id="AddNewColumn" tabindex="-1" role="dialog" aria-labelledby="AddNewColumnTitle" aria-hidden="true">
      <div class="modal-dialog editModal addModal">
        <div class="modal-header">
          <h4 class="modal-title" id="AddNewColumnTitle">
            <span class="iconTitle"></span>
              Modify New Column 
            <div class="underline"></div>
          </h4>
        </div>
        <!-- <div class="modal-content">
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
                <div class="controls input-append date form_datetime" data-link-field="dtp_input1" id="addRowDate" v-if="addRow.addCarShowFlg">
                  <label for="name"><b class="text-danger">*</b>Date </label>
                  <el-date-picker
                    v-model="modifyColumnDate"
                    format="M/yyyy"
                    type="month"
                    :editable="false"
                  >
                  </el-date-picker>
                  <span class="add-on"><i class="icon-th icon-thNo"></i></span>
                </div>
              </div>
            </fieldset>
            <div class="checkBox" v-if="!addRow.addCarShowFlg">
              <a href="javascript:void(0)" class="addMaskTitle" @click="showAddNewCar(true),commonJs.saveDataChecking('PriceLadder_ModifyNewColumn_AddNewVehicle')">Add New Vehicle<img src="images/addNewOne.png"></a>
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
            <div class="checkBox" v-if="addRow.addCarShowFlg">
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
            </div>
          </div>
        </div> -->
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
  export default {
    name:'ModifyNewColumnDialog',
    data(){
      return{
        modifyColumnDate:new Date(),
      }
    },
    methods:{

    },
    props:{
      modifyNewColumnDialogVisible:Boolean
    }
    
  }
</script>

<style scoped lang="less">
.modal-header{
  padding:15px;
}
</style>


