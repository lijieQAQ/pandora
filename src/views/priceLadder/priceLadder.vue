<template>
  <div id="priceLadder">
    <Main></Main>
    <price-ladder-contain></price-ladder-contain>
  </div>
</template>

<script>
import Main from '../../components/Main'
import PriceLadderContain from '../../components/PriceLadderContain'
import PriceBox from '../../components/PriceBox'

export default {
  name: 'priceLadder',
  data () {
    return {}
  },
  components: {
    Main,
    PriceLadderContain,
    PriceBox
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  #priceLadder {
    width: 100%;
    height: 100%;
    overflow: auto;
    zoom: 1;
    background-color: #f2f3f9;
  }
</style>
