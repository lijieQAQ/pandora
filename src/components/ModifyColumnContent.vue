<template>
  <el-dialog
    :visible.sync="modifyColumnContentVisible"
    center
    width='840px'
    top='20vh'
    :show-close=false
  >
    <div class="modal fade" id="editCar" tabindex="-1" role="dialog" aria-labelledby="ChangeNewColumnTitle"
         aria-hidden="true">
      <div class="modal-dialog editModal addModal">
        <div class="modal-header">
          <h4 class="modal-title" id="ChangeNewColumnTitle">
            <span class="iconTitle"></span>
            Modify Column Content
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
                      <el-select v-model="editCar.brandNameEn" placeholder="" default-first-option :disabled="true">
                        <el-option v-for="item in brandList" :key="item.nameEn" :label="item.nameEn"
                                   :value="item.nameEn"></el-option>
                      </el-select>
                    </template>
                  </div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>{{ editCar.brandNameEn ? (editCar.bmwFlg ? 'Series' :
                    'Model') : 'Series/Model' }}</label>
                  <div id="seriesAndModel">
                    <template v-if="editCar.bmwFlg">
                      <el-select v-model="editCar.seriesNameEn" placeholder="" :disabled="true" maxlength="13">
                        <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn"
                                   :value="item.nameEn"></el-option>
                      </el-select>
                    </template>
                    <template v-if="!editCar.bmwFlg">
                      <el-select v-model="editCar.model" placeholder="" :disabled="true" maxlength="13">
                        <el-option v-for="item in titleList" :key="item.nameEn" :label="item.nameEn"
                                   :value="item.nameEn"></el-option>
                      </el-select>
                    </template>
                  </div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name"><b class="text-danger">*</b>{{ editCar.brandNameEn ? (editCar.bmwFlg ? 'E-Series' :
                    'ModelRange') : 'E-Series/ModelRange' }}</label>
                  <div id="eseriesAndEngine">
                    <template v-if="editCar.bmwFlg">
                      <el-select v-model="editCar.eseriesNameEn" placeholder="" :disabled="true">
                        <el-option
                          v-for="item in subTitleList"
                          :key="item.nameEn"
                          :label="item.nameEn"
                          :value="item.nameEn">
                        </el-option>
                      </el-select>
                    </template>
                    <template v-if="!editCar.bmwFlg">
                      <el-select v-model="editCar.engine" placeholder="" :disabled="true">
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
                  <el-date-picker
                    v-model='modifyColumnOneDate'
                    format="M/yyyy"
                    type="month"
                    :editable="false"
                    :disabled="true"
                  >
                  </el-date-picker>
                  <span class="add-on"><i class="icon-th icon-thNo"></i></span>
                </div>
              </div>
            </fieldset>

            <div class="checkBox">
              <div id="checkBoxTwo">
                <div class="control-group">
                  <div class="controls input-append variant">
                    <label for="name"><b class="text-danger">*</b>Variant</label>
                    <input type="text" value="F20" placeholder="" v-model="editCar.carNameEn" maxlength="50"
                           name="editCar.carNameEn" v-validate="'required'">
                    <div class="sixErrorTip">{{ errors.first('editCar.carNameEn') }}</div>
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls input-append variantShort">
                    <label for="name"><b class="text-danger">*</b>Variant(Short)</label>
                    <input type="text" placeholder="" v-model="editCar.nickname" maxlength="19" name="editCar.nickname"
                           v-validate="'required'">
                    <div class="sixErrorTip">{{ errors.first('editCar.nickname') }}</div>
                  </div>
                </div>

                <div class="control-group">
                  <div class="controls input-append widthHalf changeDefaultVal">
                    <label for="name"><b class="text-danger">*</b>MSRP(¥)</label>
                    <vue-numeric v-model="editCar.rrPrice" placeholder=" " currency="" :min="0"
                                 maxlength="7"></vue-numeric>
                    <div class="sixErrorTip">{{ errors.first('editCar.rrPrice') }}</div>
                  </div>
                  <div class="controls input-append widthHalf">
                    <label for="name">Model Code</label>
                    <input type="text" placeholder="" v-model="editCar.model" maxlength="20"
                           v-bind:disabled="!editCar.bmwFlg" name="editCar.model" v-validate="" readonly="readonly"
                           class="cannotChange">
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls input-append widthHalf changeDefaultVal">
                    <label for="name">
                      T/P(¥)
                    </label>
                    <vue-numeric v-model="editCar.tsPrice" placeholder=" " currency="" :min="0"
                                 maxlength="7"></vue-numeric>
                  </div>
                  <div class="controls input-append widthHalf" v-if="editCar.bmwFlg">
                    <label for="name">Package Code</label>
                    <input type="text" placeholder="" v-model="editCar.packageCode" maxlength="20"
                           name="editCar.packageCode" v-validate="" :disabled="true">
                  </div>
                  <div class="controls input-append widthHalf" v-if="!editCar.bmwFlg">
                    <label for="name"> ModelRange</label>
                    <input type="text" placeholder="" v-model="editCar.engine" maxlength="20" name="editCar.engine"
                           v-validate="" :disabled="true">
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls input-append widthHalf">
                    <label for="name">Discount(%) </label>
                    <vue-numeric v-model="editCar.showDiscountPercentage" :precision=2 currency="%" maxlength="7"
                                 currency-symbol-position="suffix"></vue-numeric>
                  </div>
                  <div class="controls input-append widthHalf">
                    <label for="name">Line Code</label>
                    <input type="text" placeholder="" value="" maxlength="20">
                  </div>
                </div>

                <div class="control-group">
                  <div class="controls input-append widthHalf">
                    <label for="name">MIX(%)</label>
                    <vue-numeric v-model="editCar.showMixPercentage" :precision=2 :max="100" :min="0" currency="%"
                                 currency-symbol-position="suffix" maxlength="5"></vue-numeric>
                  </div>
                  <div class="controls input-append widthHalf changeDefaultVal">
                    <label for="name">HP(KW) </label>
                    <vue-numeric placeholder=" " v-model="editCar.powerHP" :precision=0 :max="9999" :min="0"
                                 maxlength="4"></vue-numeric>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="btnBox">
            <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary btnConfirm" @click="modifyCar()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>

import store from '../store'
import accounting from 'accounting'
import Bus from '../common/js/Bus'
export default {
  name: 'modifyColumnContent',
  data () {
    return {
      modifyColumnOneDate: new Date(),
      carScreen: this.$store.state.carScre
    }
  },
  props: {
    modifyColumnContentVisible: Boolean,
    editCar: Object
  },
  computed: {
    editCarRrPrice: function () {
      return this.editCar.rrPrice
    },
    editCarTsPrice: function () {
      return this.editCar.tsPrice
    },
    editCarDiscountPercentage: function () {
      return this.editCar.showDiscountPercentage
    },
    changeCarARrPrice: function () {
      return this.changeCarA.rrPrice
    },
    changeCarATsPrice: function () {
      return this.changeCarA.tsPrice
    },
    changeCarADiscountPercentage: function () {
      return this.changeCarA.showDiscountPercentage
    },
    changeCarBRrPrice: function () {
      return this.changeCarB.rrPrice
    },
    changeCarBTsPrice: function () {
      return this.changeCarB.tsPrice
    },
    changeCarBDiscountPercentage: function () {
      return this.changeCarB.showDiscountPercentage
    },
  },
  watch: {
    editCarRrPrice: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        if (!a || a == 0) {
          this.editCar.showDiscountPercentage = 0
        } else {
          this.editCar.showDiscountPercentage = ((a - this.editCar.tsPrice) / a) * 100
        }
      } else {
        this.watchFlag = true
      }
    },
    editCarTsPrice: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        if (!this.editCar.rrPrice || this.editCar.rrPrice == 0) {
          this.editCar.showDiscountPercentage = 0
        } else {
          this.editCar.showDiscountPercentage = ((this.editCar.rrPrice - a) / this.editCar.rrPrice) * 100
        }
      } else {
        this.watchFlag = true
      }
    },
    editCarDiscountPercentage: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        this.editCar.tsPrice = (1 - (a / 100)) * this.editCar.rrPrice
      } else {
        this.watchFlag = true
      }
    },

    changeCarARrPrice: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        this.changeCarA.showDiscountPercentage = ((a - this.changeCarA.tsPrice) / a) * 100
      } else {
        this.watchFlag = true
      }

    },
    changeCarATsPrice: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        this.changeCarA.showDiscountPercentage = ((this.changeCarA.rrPrice - a) / this.changeCarA.rrPrice) * 100
      } else {
        this.watchFlag = true
      }
    },
    changeCarADiscountPercentage: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        this.changeCarA.tsPrice = (1 - (a / 100)) * this.changeCarA.rrPrice
      } else {
        this.watchFlag = true
      }
    },

    changeCarBRrPrice: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        this.changeCarB.showDiscountPercentage = ((a - this.changeCarB.tsPrice) / a) * 100
      } else {
        this.watchFlag = true
      }

    },
    changeCarBTsPrice: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        this.changeCarB.showDiscountPercentage = ((this.changeCarB.rrPrice - a) / this.changeCarB.rrPrice) * 100
      } else {
        this.watchFlag = true
      }
    },
    changeCarBDiscountPercentage: function (a, b) {
      if (this.watchFlag) {
        this.watchFlag = false
        this.changeCarB.tsPrice = (1 - (a / 100)) * this.changeCarB.rrPrice
      } else {
        this.watchFlag = true
      }
    }
  },
  methods: {
    closeModifyColumnContent: function () {
      this.$emit('closeModifyColumnContent', false)
    },
    modifyCar: function () {
      var self = this
      var validation = undefined
      if (self.editCar.bmwFlg) {
        validation = Promise.all([
          this.$validator.validate('editCar.carNameEn'),
          this.$validator.validate('editCar.nickname'),
          this.$validator.validate('editCar.model'),
          this.$validator.validate('editCar.packageCode')
        ])
      } else {
        validation = Promise.all([
          this.$validator.validate('editCar.carNameEn'),
          this.$validator.validate('editCar.nickname'),
          this.$validator.validate('editCar.model')
        ])
      }
      validation.then(function (result) {
        var validFlg = true
        for (var i in result) {
          validFlg = validFlg && result[i]
        }
        if (validFlg) {
          self.editCar.mixPercentage = self.editCar.showMixPercentage / 100
          self.editCar.discountPercentage = self.editCar.showDiscountPercentage / 100
          // if(self.editCarPre.discountPercentage == self.editCar.discountPercentage){
          //   self.editCar.discountPercentage = self.computeDiscountPercentage(self.editCar.rrPrice, self.editCar.tsPrice);
          // }else{
          //   self.editCar.tsPrice = self.editCar.rrPrice / (self.editCar.discountPercentage / 100 + 1);
          // }
          // self.carScreen.setCar(self.editCar, self.editCar.laneIndex, self.editCar.carIndex);
          let params = {
            c: self.editCar,
            i: self.editCar.laneIndex,
            j: self.editCar.carIndex
          }
          store.commit('SETCAR_CARSCREEN', params)
          self.closeModifyColumnContent()
          Bus.$emit('createArrow')
          // self.createArrow();
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .editModal .modal-header {
    border-bottom: none;
  }

  .modal-header {
    min-height: 16.43px;
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
  }

  .editModal .modal-title {
    margin: 0 30px;
    font-size: 18px;
    color: #606060;
    /* border-bottom: 1px solid #64C3EE; */
  }

  .modal-title {
    margin: 0 30px !important;
  }

  .modal-title {
    margin: 0;
    line-height: 1.42857143;
  }

  .editModal .modal-title .iconTitle {
    position: relative;
    left: -7px;
    width: 30px;
    height: 12px;
    display: inline-block;
    background: url(../assets/images/model-titleIcon.png) 100% 100% no-repeat;
    background-size: 26px;
  }

  .editModal .modal-title .underline {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #7BA0F1, #64C3EE, #fff);
  }

  .editModal .modal-content, .editModal .modal-body {
    /* overflow: hidden; */
  }

  .modal-content {
    position: relative;
    background-color: #fff;
    border: 0px solid #999;
    border-radius: 0px;
    outline: 0;
    box-shadow: none;
  }

  .modal-body {
    padding: 0;
  }

  .editModal .select-box {
    width: 182px;
    margin: 30px 34px 0 44px;
    float: left;
  }

  .editModal .control-group {
    clear: both;
    overflow: hidden;
    position: relative;
    height: 46px;
  }

  .select-box .control-group {
    width: 180px;
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

  .checkBox {
    width: 511px;
    margin-right: 44px;
    float: right;
    position: relative;
    top: -330px
  }

  #checkBoxTwo, #checkBoxThree {
    padding: 20px 10px 0 10px;
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

  .editModal .modal-footer {
    border-top: 0px;
    background: #fff;
    padding: 0;
    text-align: center;
    position: relative;
    top: 368px
  }

  .editModal .modal-footer .btnBox {
    width: 400px;
    margin: 0 auto;
  }

  .editModal .modal-footer .btnBox {
    width: 400px;
    margin: 0 auto;
    background-color: #fff;
    border: none;
  }

  .editModal .modal-footer .btnCancel {
    color: #A6A6A6;
    margin-right: 60px;
    background: #FFF;
    border: 1px solid #A6A6A6 !important;
    border-radius: 3px;
    margin-left: 47px;
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

  .editModal .modal-footer .btnConfirm {
    color: #FFF;
    background: #FFF;
    border: 1px solid #2D9DEA;
    border-radius: 3px;
    background-image: linear-gradient(-90deg, #2D9DEA 0%, #1464D0 100%);
  }


</style>



