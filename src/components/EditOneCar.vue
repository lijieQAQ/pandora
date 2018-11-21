<template>
  <div class="checkBox">
    <div id="checkBoxTwo">
      <div class="control-group">
        <div class="controls input-append variant">
          <label for="name"><b class="text-danger">*</b>Variant</label>
          <input type="text" value="F20" placeholder="" v-model="menuhub.editCar.carNameEn" maxlength="50"
                 name="menuhub.editCar.carNameEn" v-validate="'required'">
          <div class="sixErrorTip">{{ errors.first('menuhub.editCar.carNameEn') }}</div>
        </div>
      </div>
      <div class="control-group">
        <div class="controls input-append variantShort">
          <label for="name"><b class="text-danger">*</b>Variant(Short)</label>
          <input type="text" placeholder="" v-model="menuhub.editCar.nickname" maxlength="19"
                 name="menuhub.editCar.nickname" v-validate="'required'">
          <div class="sixErrorTip">{{ errors.first('menuhub.editCar.nickname') }}</div>
        </div>
      </div>

      <div class="control-group">
        <div class="controls input-append widthHalf changeDefaultVal">
          <label for="name"><b class="text-danger">*</b>MSRP(¥)</label>
          <vue-numeric v-model="menuhub.editCar.rrPrice" name="menuhub.editCar.rrPrice" placeholder=" " currency=""
                       min="0" maxlength="7" v-validate="'isnumber'"></vue-numeric>
          <div class="sixErrorTip">{{ errors.first('menuhub.editCar.rrPrice') }}</div>
        </div>
        <div class="controls input-append widthHalf">
          <label for="name">Model Code</label>
          <input type="text" placeholder="" v-model="menuhub.editCar.model" maxlength="20"
                 v-bind:disabled="!menuhub.editCar.bmwFlg" name="menuhub.editCar.model" v-validate="">
        </div>

      </div>
      <div class="control-group">
        <div class="controls input-append widthHalf changeDefaultVal">
          <label for="name">
            T/P(¥)
          </label>
          <vue-numeric name="menuhub.editCar.tsPrice" v-model="menuhub.editCar.tsPrice" placeholder=" " empty-value=" "
                       currency="" min="0" maxlength="7" v-validate=""></vue-numeric>
        </div>
        <div class="controls input-append widthHalf" v-if="menuhub.editCar.bmwFlg">
          <label for="name">Package Code</label>
          <input type="text" placeholder="" v-model="menuhub.editCar.packageCode" maxlength="20"
                 name="menuhub.editCar.packageCode" v-validate="">
        </div>
        <div class="controls input-append widthHalf" v-if="!menuhub.editCar.bmwFlg">
          <label for="name"> ModelRange</label>
          <input type="text" placeholder="" v-model="menuhub.editCar.engine" maxlength="20"
                 name="menuhub.editCar.engine" v-validate="" disabled="true">
        </div>
      </div>
      <div class="control-group">
        <div class="controls input-append widthHalf">
          <label for="name">Discount(%) </label>

          <span class="discount">{{ accounting.toFixed(((menuhub.editCar.rrPrice - menuhub.editCar.tsPrice) / menuhub.editCar.rrPrice * 100), 2) }}%</span>
        </div>
        <div class="controls input-append widthHalf">
          <label for="name">Line Code</label>
          <input type="text" placeholder="" value="" maxlength="20">
        </div>
      </div>

      <div class="control-group">
        <div class="controls input-append widthHalf">
          <label for="name">MIX(%)</label>
          <vue-numeric v-model="menuhub.editCar.showMixPercentage" precision="2" max="100" min="0" currency="%"
                       currency-symbol-position="suffix" maxlength="5"></vue-numeric>
        </div>
        <div class="controls input-append widthHalf changeDefaultVal">
          <label for="name">HP(KW) </label>
          <vue-numeric placeholder=" " v-model="menuhub.editCar.powerHP" precision="0" max="9999" min="0"
                       maxlength="4"></vue-numeric>
        </div>
      </div>
    </div>
    <div class="checkTwoBtnBox" style="width:533px">
      <button type="button" class="checkTwoBtn" @click="showAddNewCar(false)">Back</button>
      <button type="button" class="checkTwoBtn ctWord" @click="saveAddNewCar()">Save</button>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting'

export default {
  name: 'modifyOneCar',
  data () {
    return {
      accounting: accounting
    }
  },
  props: {
    menuhub: Object,
    editRow: Object
  },
  computed: {
    editCarRrPrice: function () {
      return this.addRow.rrPrice
    },
    editCarTsPrice: function () {
      return this.addRow.tsPrice
    },
    editCarDiscountPercentage: function () {
      return this.addRow.showDiscountPercentage
    }
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
    }
  },
  methods: {
    showAddNewCar () {
      this.$emit('showAddNewCar')
    },
    saveAddNewCar: function () {
      debugger
      var self = this
      var validation = undefined
      if (this.addRow.isBmwProduct) {
        validation = Promise.all([
          this.$validator.validate('addRow.addCar.carNameEn'),
          this.$validator.validate('addRow.addCar.nickname'),
          this.$validator.validate('addRow.addCar.model'),
          this.$validator.validate('addRow.addCar.packageCode'),
          this.$validator.validate('addRow.addCar.rrPrice'),
          this.$validator.validate('addRow.addCar.tsPrice')
        ])
      } else {
        validation = Promise.all([
          this.$validator.validate('addRow.addCar.carNameEn'),
          this.$validator.validate('addRow.addCar.nickname'),
          this.$validator.validate('addRow.addCar.model'),
          this.$validator.validate('addRow.addCar.rrPrice'),
          this.$validator.validate('addRow.addCar.tsPrice')
        ])
      }

      validation.then(function (result) {
        var validFlg = true
        for (var i in result) {
          validFlg = validFlg && result[i]
        }
        if (validFlg) {
          self.addRow.addCar.bmwFlg = self.addRow.isBmwProduct
          self.addRow.addCar.mixPercentage = self.addRow.addCar.showMixPercentage / 100
          self.addRow.addCar.showDiscountPercentage = self.computeDiscountPercentage(self.addRow.addCar.rrPrice, self.addRow.addCar.tsPrice)
          self.addRow.addCar.discountPercentage = self.addRow.addCar.showDiscountPercentage / 100
          var addRowClone = $.extend(true, {}, self.addRow.addCar)
          self.addRow.productList.push(addRowClone)
          // self.addRow.selectedProduct.push(addRowClone)
          self.showAddNewCar(false)
        }
      })
    },
    computeDiscountPercentage: function (rrPrice, tsPrice) {
      // 待改 accounting没有引入
      return accounting.toFixed(((rrPrice - tsPrice) / rrPrice * 100), 4)
    }
  }

}
</script>

<style scoped lang='less'>
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
</style>


