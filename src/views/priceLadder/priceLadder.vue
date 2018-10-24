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
  mounted: function() {
      this.initComponent();

      this.changeDefaultVal();
  },
  methods: {
    
  }
}
</script>

<style scoped lang="less">

</style>
