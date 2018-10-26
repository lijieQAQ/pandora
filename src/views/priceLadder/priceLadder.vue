<template>
  <div id="priceLadder">
    <Main></Main>
    <PriceLadderContain></PriceLadderContain>
  </div>
</template>

<script>
import Main from '../../components/Main'
import PriceLadderContain from '../../components/PriceLadderContain'

export default {
  name: 'priceLadder',
  data () {
    return {}
  },
  components: {
    Main,
    PriceLadderContain
  },
  methods: {
  }
}
</script>

<style scoped lang="less">

</style>
