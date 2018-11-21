<template>
  <el-dialog
    :visible.sync="masteMenuhubEditCarDialogVisible"
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
            Modify Column - Add New Vehicle
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
                      <el-select v-model="menuhub.editCar.brandNameEn" placeholder="" default-first-option disabled="true">
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
                    <b class="text-danger">*</b>Series :
                  </label>
                  <div id="seriesAndModel">
                    <template v-if="menuhub.editCar.bmwFlg">
                      <el-select v-model="menuhub.editCar.seriesNameEn" placeholder="" disabled="true" maxlength="13">
                        <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                      </el-select>
                    </template>
                    <template v-if="!menuhub.editCar.bmwFlg">
                      <el-select v-model="menuhub.editCar.model" placeholder="" disabled="true" maxlength="13">
                        <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                      </el-select>
                    </template>
                  </div>
                  <div class="arrowDown"></div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>E-Series</label>
                  <div id="eseriesAndEngine">
                    <template v-if="menuhub.editCar.bmwFlg">
                      <el-select v-model="menuhub.editCar.eseriesNameEn" placeholder="" disabled="true">
                        <el-option
                          v-for="item in subTitleList"
                          :key="item.nameEn"
                          :label="item.nameEn"
                          :value="item.nameEn">
                        </el-option>
                      </el-select>
                    </template>
                    <template v-if="!menuhub.editCar.bmwFlg">
                      <el-select v-model="menuhub.editCar.engine" placeholder="" disabled="true">
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
                    :disabled="menuhub.editCar.addCarShowFlg"
                  >
                  </el-date-picker>
                </div>
              </div>
            </fieldset>
            <!--<div class="checkBox" v-if="!menuhub.editCar.addCarShowFlg">-->
              <!--<a href="javascript:void(0)" class="addMaskTitle" @click="showAddNewCar(true)">Add New Vehicle<img-->
                <!--src="../assets/images/addNewOne.png"></a>-->
              <!--<div id="checkBox">-->
                <!--<div class="selectedTip" v-if="menuhub.editCar.blockList.length > 0">-->
                  <!--<span class="selectContain">Number of E-series Selected:</span>-->
                  <!--<span class="selectedNum" v-on:mouseover="selectContainShow()" v-on:mouseout="selectContainHide()">{{addRow.selectedProduct.length}}</span>-->
                <!--</div>-->
                <!--<template>-->
                  <!--<el-checkbox :indeterminate="menuhub.editCar.isIndeterminate" v-model="addRow.selectAll"-->
                               <!--@change="handleSelectAllChange" v-if="menuhub.editCar.blockList.length > 0">{{-->
                    <!--addRow.selectedESeriesOrEngine }}-->
                  <!--</el-checkbox>-->
                  <!--<div style="margin: 15px 0;"></div>-->
                  <!--<el-checkbox-group v-model="menuhub.editCar.selectedProduct" @change="handleSelectedProductChange">-->
                    <!--<el-checkbox v-for="item in menuhub.editCar.productList" :label="item" :key="item" :value="item">-->
                      <!--{{item.nickname}}<span class="carPrice">{{ accounting.formatMoney(item.rrPrice, '¥', 0) }}</span>-->
                    <!--</el-checkbox>-->
                  <!--</el-checkbox-group>-->
                <!--</template>-->
              <!--</div>-->
            <!--</div>-->
            <edit-one-car v-if="menuhub != null" :menuhub="menuhub"></edit-one-car>
          </div>
        </div>
        <div class="modal-footer">
          <div class="btnBox">
            <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal"
                    @click="closeModifyColumnDialog">Cancel
            </button>
            <!--<button type="button" class="btn btn-primary btnConfirm"-->
                    <!--v-bind:class="{ noUseBtn : (menuhub.editCar.selectedProduct.length == 0) }"-->
                    <!--v-bind:disabled="menuhub.editCar.selectedProduct.length == 0" @click="confirmAddRow()">Submit-->
            <!--</button>-->
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import accounting from 'accounting'
import editOneCar from './editOneCar'
import store from '../store'

export default {
  name: 'MasteMenuhubEditCarDialog',
  data () {
    return {
      titleList: [],
      subTitleList: [],
      modifyColumnDate: new Date()
    }
  },
  mounted () {
  },
  methods: {
    closeModifyColumnDialog: function () {
      this.$emit('closeMenuhubEditCarDialog', false)
    }
  },
  props: {
    masteMenuhubEditCarDialogVisible: {
      type: Boolean,
      default: false
    },
    bmwBrandList: Array,
    brandList: Array,
    bmwSeriesList: Array,
    cmpBrandList: Array,
    cmpModelList: Array,
    cmpModelRangeList: Array,
    bmwESeriesList: Array,
    menuhub: Object
  },
  components: {
    editOneCar
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


