<template>
  <div class="priceLadderNoData" v-if="carScreen.curCarLanes.length == 0 && carScreen.currentPageIndex == 0">
    <img src="../assets/images/nodataNew.png" data-toggle="modal" data-target="#AddNewVehicle"
         style="width:123px;height:123px">
    <span class="addNewVeh">Add New Vehicle</span>
  </div>
</template>

<script>
export default {
  name: 'PriceLadderContain',
  data () {
    return {
      carScreen: this.$store.state.carScreen
    }
  },
  mounted () {
    console.log(this.carScreen)
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
