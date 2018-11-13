<template>
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
          <vue-numeric v-model="addRow.addCar.rrPrice" placeholder=" " currency="" min="0" maxlength="7" name="addRow.addCar.rrPrice" v-validate="'isnumber'"></vue-numeric>
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

    <div class="checkTwoBtnBox" style="width:533px">
      <button type="button" class="checkTwoBtn" @click="showAddNewCar(false)">Back</button>
      <button type="button" class="checkTwoBtn ctWord" @click="saveAddNewCar()">Save</button>
    </div>
  </div>
</template>

<script>
import accounting from 'accounting'
export default {
  name:'modifyOneCar',
  data(){
    return{
      accounting: accounting,
    }
  },
  props:{
    menuhub:Object,
    addRow:Object
  },
  methods:{
    showAddNewCar(){
      this.$emit('showAddNewCar')
    },
    saveAddNewCar : function() {
      debugger
      var self = this;
      var validation = undefined;
      if (this.addRow.isBmwProduct) {
        validation = Promise.all([
            this.$validator.validate("addRow.addCar.carNameEn"),
            this.$validator.validate("addRow.addCar.nickname"),
            this.$validator.validate("addRow.addCar.model"),
            this.$validator.validate("addRow.addCar.packageCode"),
            this.$validator.validate("addRow.addCar.rrPrice"),
            this.$validator.validate("addRow.addCar.tsPrice")
        ]);
      } else {
        validation = Promise.all([
            this.$validator.validate("addRow.addCar.carNameEn"),
            this.$validator.validate("addRow.addCar.nickname"),
            this.$validator.validate("addRow.addCar.model"),
            this.$validator.validate("addRow.addCar.rrPrice"),
            this.$validator.validate("addRow.addCar.tsPrice")
        ]);
      }

      validation.then(function(result) {
        var validFlg = true;
        for (var i in result) {
          validFlg = validFlg && result[i];
        }
        if (validFlg) {
          self.addRow.addCar.bmwFlg = self.addRow.isBmwProduct;
          self.addRow.addCar.mixPercentage = self.addRow.addCar.showMixPercentage / 100;
          self.addRow.addCar.showDiscountPercentage = self.computeDiscountPercentage(self.addRow.addCar.rrPrice, self.addRow.addCar.tsPrice);
          self.addRow.addCar.discountPercentage = self.addRow.addCar.showDiscountPercentage / 100;
          var addRowClone = $.extend(true,{},self.addRow.addCar);
          self.addRow.productList.push(addRowClone);
          self.addRow.selectedProduct.push(addRowClone);
          self.showAddNewCar(false);
        }
      });
    },
    computeDiscountPercentage : function(rrPrice, tsPrice) {
      //待改 accounting没有引入
      return accounting.toFixed(((rrPrice - tsPrice) / rrPrice * 100 ), 4);
    },
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


