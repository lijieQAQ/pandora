<template>
  <div>
    <div class="priceLadderNoData" v-if="carScreen.curCarLanes.length == 0 && carScreen.currentPageIndex == 0">
      <img src="../assets/images/nodataNew.png" data-toggle="modal" data-target="#AddNewVehicle"
           style="width:123px;height:123px" @click="addNewVehicleMaskVisible=true" >
      <span class="addNewVeh">Add New Vehicle</span>
    </div>
    <price-box v-if="carScreen.curCarLanes.length > 0"></price-box>
    <add-new-vehicle-mask :addNewVehicleMaskVisible="addNewVehicleMaskVisible" @closeDialog="closeDialog"></add-new-vehicle-mask>
  </div>
</template>

<script>
import PriceBox from './PriceBox'
import Bus from '../common/js/Bus'
import addNewVehicleMask from './addNewVehicleMask'

export default {
  name: 'PriceLadderContain',
  data () {
    return {
      addNewVehicleMaskVisible: false,
      carScreen: this.$store.state.carScreen
    }
  },
  mounted () {
    Bus.$on('operating', status => {
      if (status === 'compare') {
        this.carScreen = this.$store.state.carScreen
      }
    })
  },
  components: {
    PriceBox,
    addNewVehicleMask
  },
  methods:{
    closeDialog:function () {
      this.addNewVehicleMaskVisible = false
    }
  }
}
</script>

<style scoped lang="less">
  .priceLadderNoData {
    text-align: center;
    clear: both;
    padding: 40px 80px;
    background: #f2f3f9;
    img {
      margin: 190px auto 0px auto;
    }
    img:hover {
      cursor: pointer;
    }
    .addNewVeh {
      display: block;
      margin: 10px auto 345px auto;
      width: 168px;
      height: 28px;
      font: 20px/28px BMWTypeCondensedRegular-Bold;
      font-family: inherit;
      color: #606060;
      text-align: center;
    }
  }
</style>
