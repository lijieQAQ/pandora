<template>
	<div class="checkBox" v-if="addRow.addCarShowFlg">
            <div id="checkBoxTwo">
                <div class="control-group">
                  <div class="controls input-append">
                    <label for="name"><b class="text-danger">*</b>Variant</label>
                    <input type="text" value="F20" placeholder="" v-model="addRow.addCar.carNameEn" maxlength="50" name="menuhub.addRow.addCar.carNameEn" v-validate="'required'">
                    <!-- 待改 -->
                    <!-- <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.carNameEn') }}</div> -->
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls input-append">
                    <label for="name"><b class="text-danger">*</b>Variant(Short)</label>
                    <input type="text" placeholder="" v-model="addRow.addCar.nickname" maxlength="19" name="menuhub.addRow.addCar.nickname" v-validate="'required'">
                    <!-- <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.nickname') }}</div> -->
                  </div>
                </div>

                <div class="control-group">
                  <div class="controls input-append widthHalf">
                    <label for="name"><b class="text-danger">*</b>Model Code</label>
                    <input type="text" placeholder="" v-model="addRow.addCar.model" v-bind:disabled="!addRow.isBmwProduct" maxlength="20" name="menuhub.addRow.addCar.model" v-validate="'required'">
                    <!-- <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.model') }}</div> -->
                  </div>
                  <div class="controls input-append widthHalf changeDefaultVal">
                    <label for="name"><b class="text-danger">*</b>MSRP(¥)</label>
                    <vue-numeric v-model="addRow.addCar.rrPrice" placeholder=" " currency="" min="0" maxlength="7" name="menuhub.addRow.addCar.rrPrice" v-validate="'isnumber'"></vue-numeric>
                    <!-- <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.rrPrice') }}</div> -->
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls input-append widthHalf">
                    <label for="name"><b class="text-danger">*</b> {{ addRow.isBmwProduct ? "Package Code" : "ModelRange" }}</label>
                    <input v-if="addRow.isBmwProduct" type="text" placeholder="" v-model="addRow.addCar.packageCode" maxlength="20" name="menuhub.addRow.addCar.packageCode" v-validate="'required'">
                    <input v-if="!addRow.isBmwProduct" type="text" placeholder="" v-model="addRow.addCar.engine" disabled="true" maxlength="20" name="menuhub.addRow.addCar.engine" v-validate="'required'">
                    <!-- <div v-if="addRow.isBmwProduct" class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.packageCode') }}</div> -->
                    <!-- <div v-if="!addRow.isBmwProduct" class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.engine') }}</div> -->
                  </div>
                  <div class="controls input-append widthHalf changeDefaultVal">
                    <label for="name">
                      <b class="text-danger">*</b>T/P(¥)
                    </label>
                    <vue-numeric  v-model="addRow.addCar.tsPrice" placeholder=" " currency="" min="0" maxlength="7" name="menuhub.addRow.addCar.tsPrice" v-validate="'isnumber'"></vue-numeric>
                    <!-- <div class="sixErrorTip">{{ errors.first('menuhub.addRow.addCar.tsPrice') }}</div> -->
                  </div>
                </div>
                <div class="control-group">
                  <div class="controls input-append widthHalf">
                    <label for="name">Line Code</label>
                    <input type="text" placeholder="" value="" maxlength="20">
                  </div>
                  <div class="controls input-append widthHalf">
                    <label for="name">Discount(%) </label>
                    <!-- <span class="discount">{{ accounting.toFixed(((addRow.addCar.rrPrice - addRow.addCar.tsPrice) / addRow.addCar.rrPrice * 100), 2) }}%</span> -->
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
            <!-- <div class="checkTwoBtnBox">
              <button type="button" class="checkTwoBtn" @click="showAddNewCar(false, true)">Back</button>
              <button type="button" class="checkTwoBtn ctWord" @click="saveAddMenuhubNewCar(),commonJs.saveDataChecking('PriceLadder_AddNewColumn_AddNewVehicle_Save')">Save</button>
            </div> -->
    </div>
</template>

<script type="text/javascript">
  export default{
  	name:'AddOneCar',
  	data(){
  	  return{

  	  }
  	},
  	props:{
  	  menuhub:Object,
  	  addRow:Object
  	},
  	methods:{

  	}
}	
</script>

<style scoped lang="less">
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