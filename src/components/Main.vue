<template>

  		<div class="main">
      <!-- priceInfoTitle 开始 -->
        <div class="priceInfoTitle">
          <p>Select Vehicles
            <!-- <input type="text" class="versionNumber" name="" maxlength="20" readonly> -->
          </p>

          <div class="date-box" id="hide">
            <label>Version Date</label>
            <form action="" class="form-horizontal">
              <fieldset>
                <div class="control-group">
                  <div class="controls input-append date form_datetime" data-date="06-2018" data-date-format="mm yyyy" data-link-field="dtp_input1" id="versionDate">
                    <input size="8" type="text" style="border:none;font-size:16px;border:none" value="" readonly id="homePageDate">
                    <span class="add-on"><i class="icon-th"></i></span> </div>
                </div>
              </fieldset>
            </form>
          </div>

          <div class="select-box" style="position: relative;">
            <div class="versionCloseIcon" @click="clearVersion()"></div>
            <label></label>
            <el-select class="select" v-model="version" allow-create="" default-first-option placeholder="Select version" @change="loadVersion(),createArrow()" @clear="clearAll()">
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

          <!-- `checked` 为 true 或 false -->
          <div class="checkbox">
            <label>
              <input type="checkbox" v-model="tpShowFlg"> Transaction Price
            </label>
          </div>
          <div class="buttonBox">
            <!-- <a href="javascript:void(0)" class="btn" v-if="carScreen.carLanes.length > 0" @click="switchFont()">Switch</a> -->
            <a href="javascript:void(0)" class="btn"
              v-bind:class="{gray : carScreen.carLanes.length == 0, blue: carScreen.carLanes.length > 0}"
              v-bind:data-toggle="carScreen.carLanes.length > 0 ? 'modal' : false"
              v-bind:data-target="carScreen.carLanes.length > 0 ? '#saveModal' : false"
              @click="fadeCor()">Save</a>
            <div class="modal fade" id="saveModal" tabindex="-1" role="dialog" aria-labelledby="myModalEdit" aria-hidden="true">
              <div class="modal-dialog editModal saveModal">
                <div class="modal-header">
                  <h4 class="modal-title" id="myModalEdit">
                    <span class="iconTitle"></span>
                    Save
                    <div class="underline"></div>
                  </h4>
                </div>
                <div class="modal-content">
                  <div class="modal-body">
                    <fieldset class="select-box widthAuto">
                      <div class="control-group" style="margin-top: 10px">
                        <div class="controls input-append">
                          <label for="name">Select Version</label>
                          <div id="saveInput">
                            <el-select v-model="saveVersion.version" placeholder="Please Select Version" @change="changeSaveVersion($event)">
                              <el-option v-for="item in saveVersion.versionList" :label="item.versionName" :key="item" :value="item.versionNumber"><span style="float:right">{{ item.yearMonth }}</span>{{ item.versionName }}</el-option>
                            </el-select>
                          </div>
                        </div>
                      </div>
                      <div class="control-group">
                        <div class="controls input-append">
                          <label for="name">Version Description</label>
                          <input type="text" v-model="saveVersion.versionDescription" placeholder="">
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="btnBox">
                    <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btnConfirm" @click="saveData()">Confirm</button>
                  </div>
                </div>
              </div>
            </div>
            <a href="javascript:void(0)" class="btn"
              v-bind:class="{gray : carScreen.carLanes.length == 0, blue: carScreen.carLanes.length > 0}"
              v-bind:data-toggle="carScreen.carLanes.length > 0 ? 'modal' : false"
              v-bind:data-target="carScreen.carLanes.length > 0 ? '#clearAllModal' : false">Clear all</a>
            <div class="modal fade" id="clearAllModal" tabindex="-1" role="dialog" aria-labelledby="myModalEdit" aria-hidden="true">
              <div class="modal-dialog editModal saveModal clearAll">
                <div class="modal-content">
                  <div class="modal-body">
                    <h4 class="text-center">
                      Are you sure to clear all contents?
                    </h4>
                    <div class="clearAllDeleteIcon"></div>
                  </div>
                </div>
                <div class="modal-footer" style="margin 0 auto">
                  <div class="btnBox">
                    <button type="submit" style="float:left;margin-right:50px;margin-left:60px;" class="btn btn-default btnCancel" data-dismiss="modal">Cancel</button>
                    <button type="button" style="float:left" class="btn btn-primary btnConfirm" data-dismiss="modal" @click="clearAll()">Confirm</button>
                  </div>
                </div>
              </div>
            </div>
            <a href="javascript:void(0)" class="btn gray download" v-on:click="doDownload" v-bind:class="{gray : carScreen.carLanes.length == 0, blue: carScreen.carLanes.length > 0}">Export</a>
          </div>
          <!-- <p class="borderBottom"></p> -->
        </div>
      <!-- priceInfoTitle 结束 -->
        <div class="memuAdd" id="addNewVehicleMask"> <i class="menu" data-toggle="modal" data-target="#AddNewVehicle"></i><!--左侧menu-->
          <!-- Main:新增一列车的弹窗 -->
             <!-- 增加新车的位置样式变更 -->
            
            <div class="modal fade" id="AddNewColumn" tabindex="-1" role="dialog" aria-labelledby="AddNewColumnTitle" aria-hidden="true">
              <div class="modal-dialog editModal addModal">
                <div class="modal-header">
                  <h4 class="modal-title" id="AddNewColumnTitle">
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
                          <label for="name"><b class="text-danger">*</b>{{ addRow.brand ? (addRow.isBmwProduct ? "E-Series" : "Engine") : "E-Series/Engine" }}</label>
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
                        <div class="controls input-append date form_datetime" data-link-field="dtp_input1" id="addRowDate" v-if="!addRow.addCarShowFlg">
                          <label for="name"><b class="text-danger">*</b>Date </label>
                          <input size="16" type="text" v-bind:value="initDate.format('mmm yyyy')" readonly >
                          <span class="add-on"><i class="icon-th"></i></span>
                        </div>
                        <div class="controls input-append date" v-if="addRow.addCarShowFlg">
                  <label for="name"><b class="text-danger">*</b>Date </label>
                  <input size="16" :value="convertYearMonth2Date(addRow.addCar.yearMonth).format('mmm yyyy')" disabled="disabled" type="text">
                  <span class="add-on"><i class="icon-th icon-thNo"></i></span>
                </div>
                      </div>
                    </fieldset>
                    <div class="checkBox" v-if="!addRow.addCarShowFlg">
                      <a href="javascript:void(0)" class="addMaskTitle" @click="showAddNewCar(true)">Add New Vehicle<img src="../../assets/images/addNewOne.png"></a>
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
                    </div>
                    <div class="checkBox" v-if="addRow.addCarShowFlg">
                    <div id="checkBoxTwo">
                      <div class="control-group">
                        <div class="controls input-append">
                          <label for="name"><b class="text-danger">*</b>Variant</label>
                          <input type="text" value="F20" placeholder="" v-model="addRow.addCar.carNameEn" maxlength="50" name="addRow.addCar.carNameEn" v-validate="'required'">
                          <div class="sixErrorTip">{{ errors.first('addRow.addCar.carNameEn') }}</div>
                        </div>
                      </div>
                      <div class="control-group">
                        <div class="controls input-append">
                          <label for="name"><b class="text-danger">*</b>Variant(Short)</label>
                          <input type="text" placeholder="" v-model="addRow.addCar.nickname" maxlength="19" name="addRow.addCar.nickname" v-validate="'required'">
                          <div class="sixErrorTip">{{ errors.first('addRow.addCar.nickname') }}</div>
                        </div>
                      </div>

                      <div class="control-group">
                        <div class="controls input-append widthHalf">
                          <label for="name"><b class="text-danger">*</b>Model Code</label>
                          <input type="text" placeholder="" v-model="addRow.addCar.model" v-bind:disabled="!addRow.isBmwProduct" maxlength="20" name="addRow.addCar.model" v-validate="'required'">
                          <div class="sixErrorTip">{{ errors.first('addRow.addCar.model') }}</div>
                        </div>
                        <div class="controls input-append widthHalf changeDefaultVal">
                          <label for="name"><b class="text-danger">*</b>MSRP(¥)</label>
                          <vue-numeric v-model="addRow.addCar.rrPrice" placeholder=" " currency="" min="0" maxlength="7" placeholder="" name="addRow.addCar.rrPrice" v-validate="'isnumber'"></vue-numeric>
                          <div class="sixErrorTip">{{ errors.first('addRow.addCar.rrPrice') }}</div>
                        </div>
                      </div>
                      <div class="control-group">
                        <div class="controls input-append widthHalf" v-if="addRow.isBmwProduct">
                          <label for="name"><b class="text-danger">*</b>Package Code</label>
                          <input type="text" placeholder="" v-model="addRow.addCar.packageCode" maxlength="20" name="addRow.addCar.packageCode" v-validate="'required'">
                          <div class="sixErrorTip">{{ errors.first('addRow.addCar.packageCode') }}</div>
                        </div>
                        <div class="controls input-append widthHalf" v-if="!addRow.isBmwProduct">
                          <label for="name"><b class="text-danger">*</b>Engine</label>
                          <input type="text" placeholder="" v-model="addRow.addCar.engine" disabled="true" maxlength="20" name="addRow.addCar.engine" v-validate="'required'">
                          <div class="sixErrorTip">{{ errors.first('addRow.addCar.engine') }}</div>
                        </div>
                        <div class="controls input-append widthHalf changeDefaultVal">
                          <label for="name">
                            <b class="text-danger">*</b>T/P(¥)
                        </label>
                          <vue-numeric  v-model="addRow.addCar.tsPrice" placeholder=" " currency="" min="0" maxlength="7" name="addRow.addCar.tsPrice" v-validate="'isnumber'"></vue-numeric>
                          <div class="sixErrorTip">{{ errors.first('addRow.addCar.tsPrice') }}</div>
                        </div>
                      </div>
                      <div class="control-group">
                        <div class="controls input-append widthHalf">
                          <label for="name">Line Code</label>
                          <input type="text" placeholder="" value="" maxlength="20">
                        </div>
                        <div class="controls input-append widthHalf">
                          <label for="name">Discount(%) </label>
                          <!-- <span class="discount"> {{ accounting.toFixed(((addRow.addCar.rrPrice - addRow.addCar.tsPrice) / addRow.addCar.rrPrice * 100), 2) }}%</span> -->
                          <vue-numeric class="discount" precision="2" max="100" min="0" currency="%" currency-symbol-position="suffix" maxlength="5" disabled="true">{{ accounting.toFixed(((addRow.addCar.rrPrice - addRow.addCar.tsPrice) / addRow.addCar.rrPrice * 100), 2) }}%</vue-numeric>
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
                        <button type="button" class="checkTwoBtn" @click="showAddNewCar(false)">Back</button>
                        <button type="button" class="checkTwoBtn ctWord" @click="saveAddNewCar()">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="btnBox">
                    <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary btnConfirm" v-bind:class="{ noUseBtn : (addRow.selectedProduct.length == 0) }" v-bind:disabled="addRow.selectedProduct.length == 0" @click="confirmAddRow(),createArrow()" >Submit</button>
                  </div>
                </div>
              </div>
            </div>
          
          <!-- 增加新车位置样式变更结束 -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'main'
}
</script>

<style scoped lang="less">

</style>
