<template>
	<div class="zhangliang need">
	  <MasterDataHeaderMenu></MasterDataHeaderMenu>
	  <MasterDataLeftColumn></MasterDataLeftColumn>
	  <router-view/>

	</div>
</template>

<script type="text/javascript">
	import MasterDataHeaderMenu from './MasterDataHeaderMenu';
	import MasterDataLeftColumn from './MasterDataLeftColumn';
	export default{
	  name: 'MasterDataContain',
 	    data(){
  			return {

  			}
 	    },
  	  components: {
    	MasterDataHeaderMenu,
    	MasterDataLeftColumn,
  	  },
  	  methods:{

      }
	}
</script>

<style scoped lang="less">
 .zhangliang:after{
	content: '';
	display: block;
	height: 0;
	clear: both;
 }
 .zhangliang{
	background-color: #eef1f7;
	min-width: 1500px;
 }
</style>