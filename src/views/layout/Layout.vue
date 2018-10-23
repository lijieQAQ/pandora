<template>
  <div id="layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './Header'
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  components: {
    Header
  }
}
</script>
