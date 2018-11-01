<template>
  <div class="leftMenu" id="leftMenu">
    <div class="tabMenu">
      <!-- <ul>
        <li><a href="bmwProduct.html" class="active">BMW Data</a></li>
        <li><a href="#">Competitors Data</a></li>
      </ul> -->
			<el-menu :default-active="activeIndex" router class="el-menu-demo" mode="vertical" @open="handleSelect">
				<el-menu-item index="/bmwProduct/masterDateBmw" route>BMW Data</el-menu-item>
				<el-menu-item index="/bmwProduct/masterDateCmp">Competitors Data</el-menu-item>
			</el-menu>
    </div>
  </div>
</template>

<script type="text/javascript">
	export default{
		name:'MasterDataLeftColumn',
		data(){
			return{
				activeIndex: 'masterDateBmw'
			}
		},
		methods:{
			handleSelect () {
				alert(this.activeIndex)
				if (this.activeIndex === '1') {
					alert(1111)
					this.$router.push({path: `/bmwProduct/masterDateBmw`})
				} else if (this.activeIndex === '2') {
					alert(222)
					this.$router.push({path: `/bmwProduct/masterDateCmp`})
				}
			}
		}
	}
</script>
<style scoped lang="less">
	.leftMenu {
		margin-left: 25px;
		font-family: 'bmwRg';
		float: left;
		width: 13%;
		top: 80px;
		background: #FFFFFF;
		box-shadow: 0 2px 4px 0 #E4E4E4;
		border-radius: 4px;
		height: 935px;
	}
	.tabMenu ul {
		overflow: hidden;
		margin-top:0px;
		margin-bottom:10px;
		padding-left:0px;
	}
	.tabMenu ul li {
		font-size: 14px;
		margin-bottom: 5px;
	}
	.tabMenu ul li a {
		width: 100%;
		height: 42px;
		line-height: 42px;
		color: #333;
		text-decoration: none;
		display: block;
		padding-left: 25px;
		text-align:left;
	}
	.tabMenu ul li a:hover, .tabMenu ul li a.active {
		color: #fff;
		/*background: #f4f3f2;*/
		background-image: linear-gradient(90deg, #274E7C  0%, #70ACFD 55%, rgba(238,238,238,0.00) 100%);
	}
	ol,ul{
		list-style:none;
	}
</style>