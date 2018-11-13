<template>
  <el-dialog
    :visible.sync="modifyNewColumnDialogVisible"
    center
    width='820px'
    top='20vh'
    :show-close = false
  >
    <div class="modal fade" id="editCar" tabindex="-1" role="dialog" aria-labelledby="ChangeNewColumnTitle" aria-hidden="true">
      <div class="modal-dialog editModal addModal">
        <!-- <div class="modal-header">
          <h4 class="modal-title" id="ChangeNewColumnTitle">
            <span class="iconTitle"></span>
            Modify Column Content
            <div class="underline"></div>
          </h4>
        </div> -->
        <!-- <div class="modal-content">
          <div class="modal-body">
            <fieldset class="select-box">
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>Brand</label>
                  <div id="Brand">
                    <template>
                      <el-select v-model="editCar.brandNameEn" placeholder="" default-first-option disabled="true">
                        <el-option v-for="item in brandList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                      </el-select>
                    </template>
                  </div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>{{ editCar.brandNameEn ? (editCar.bmwFlg ? "Series" : "Model") : "Series/Model" }}</label>
                  <div id="seriesAndModel">
                    <template v-if="editCar.bmwFlg">
                      <el-select v-model="editCar.seriesNameEn" placeholder="" disabled="true" maxlength="13">
                        <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                      </el-select>
                    </template>
                    <template v-if="!editCar.bmwFlg">
                      <el-select v-model="editCar.model" placeholder="" disabled="true" maxlength="13">
                        <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn" :value="item.nameEn"> </el-option>
                      </el-select>
                    </template>
                  </div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>{{ editCar.brandNameEn ? (editCar.bmwFlg ? "E-Series" : "ModelRange") : "E-Series/ModelRange" }}</label>
                  <div id="eseriesAndEngine">
                    <template v-if="editCar.bmwFlg">
                      <el-select v-model="editCar.eseriesNameEn" placeholder="" disabled="true">
                        <el-option
                          v-for="item in subTitleList"
                          :key="item.nameEn"
                          :label="item.nameEn"
                          :value="item.nameEn">
                        </el-option>
                      </el-select>
                    </template>
                    <template v-if="!editCar.bmwFlg">
                      <el-select v-model="editCar.engine" placeholder="" disabled="true">
                        <el-option
                          v-for="item in subTitleList"
                          :key="item.nameEn"
                          :label="item.nameEn"
                          :value="item.nameEn">
                        </el-option>
                      </el-select>
                    </template>
                  </div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append date">
                  <label for="name"><b class="text-danger">*</b>Date</label>
                  <input size="16" :value="convertYearMonth2Date(editCar.yearMonth).format('mmm yyyy')" disabled="disabled" type="text">
                  <span class="add-on"><i class="icon-th icon-thNo"></i></span>
                </div>
              </div>
            </fieldset>
            <div class="checkBox">
            <div id="checkBoxTwo">
              <div class="control-group">
                <div class="controls input-append variant">
                  <label for="name"><b class="text-danger">*</b>Variant</label>
                  <input type="text" value="F20" placeholder="" v-model="editCar.carNameEn" maxlength="50" name="editCar.carNameEn" v-validate="'required'">
                  <div class="sixErrorTip">{{ errors.first('editCar.carNameEn') }}</div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append variantShort">
                  <label for="name"><b class="text-danger">*</b>Variant(Short)</label>
                  <input type="text" placeholder="" v-model="editCar.nickname" maxlength="19" name="editCar.nickname" v-validate="'required'">
                  <div class="sixErrorTip">{{ errors.first('editCar.nickname') }}</div>
                </div>
              </div>

              <div class="control-group">
                <div class="controls input-append widthHalf changeDefaultVal">
                  <label for="name"><b class="text-danger">*</b>MSRP(¥)</label>
                  <vue-numeric v-model="editCar.rrPrice" placeholder=" " currency="" min="0" maxlength="7"></vue-numeric>
                  <div class="sixErrorTip">{{ errors.first('editCar.rrPrice') }}</div>
                </div>
                <div class="controls input-append widthHalf">
                  <label for="name">Model Code</label>
                  <input type="text" placeholder="" v-model="editCar.model" maxlength="20" v-bind:disabled="!editCar.bmwFlg" name="editCar.model" v-validate="" readonly="readonly" class="cannotChange">
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append widthHalf changeDefaultVal">
                  <label for="name">
                    T/P(¥)
                  </label>
                  <vue-numeric  v-model="editCar.tsPrice" placeholder=" " currency="" min="0" maxlength="7"></vue-numeric>
                </div>
                <div class="controls input-append widthHalf" v-if="editCar.bmwFlg">
                  <label for="name">Package Code</label>
                  <input type="text" placeholder="" v-model="editCar.packageCode" maxlength="20" name="editCar.packageCode" v-validate="" disabled="true">
                </div>
                <div class="controls input-append widthHalf" v-if="!editCar.bmwFlg">
                  <label for="name"> ModelRange</label>
                  <input type="text" placeholder="" v-model="editCar.engine" maxlength="20" name="editCar.engine" v-validate="" disabled="true">
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append widthHalf">
                  <label for="name">Discount(%) </label>
                  <vue-numeric v-model="editCar.showDiscountPercentage" precision="2" currency="%" maxlength="7" currency-symbol-position="suffix"></vue-numeric> 
                </div>
                <div class="controls input-append widthHalf">
                  <label for="name">Line Code</label>
                  <input type="text" placeholder="" value="" maxlength="20">
                </div>
              </div>

              <div class="control-group">
                <div class="controls input-append widthHalf">
                  <label for="name">MIX(%)</label>
                  <vue-numeric v-model="editCar.showMixPercentage" precision="2" max="100" min="0" currency="%" currency-symbol-position="suffix" maxlength="5"></vue-numeric>
                </div>
                <div class="controls input-append widthHalf changeDefaultVal">
                  <label for="name">HP(KW) </label>
                  <vue-numeric placeholder=" " v-model="editCar.powerHP" precision="0" max="9999" min="0" maxlength="4"></vue-numeric>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="modal-footer">
          <div class="btnBox">
            <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary btnConfirm" @click="modifyCar()">Submit</button>
          </div>
        </div> -->
      </div>
    </div>
   </el-dialog>
</template>

<script>
export default {
  name:'modifyColumnContent',
  data(){
    return{

    }
  },
  props:{
    modifyColumnContentVisible: Boolean
  },
  methods:{
    closeModifyColumnContent: function(){
      this.$emit('closeModifyColumnContent',false);
    }
  }
}
</script>

<style scoped lang="less">

</style>



