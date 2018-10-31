<template>
  <div id="priceLadder">
    <Main></Main>
    <PriceLadderContain></PriceLadderContain>
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

</style>
