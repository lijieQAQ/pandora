<template>
  	<div class="headerMenu">
			<div class="titleMenu">Menu</div>
			<div class="infoTitleText">BMW Data</div>
			<div class="buttonBox"> <a href="javascript:void(0)" class="btn upload"  @click="masterDataUploadVisible=true">Upload</a>
				<!-- <a href="javascript:void(0)" class="btn download" v-on:click="doExport">Download</a> </div> -->
				<a href="javascript:void(0)" class="btn download">Download</a> 
			</div>
			<MasterDataUpload :masterDataUploadVisible="masterDataUploadVisible"></MasterDataUpload>
		</div>
</template>

<script>
	import MasterDataUpload from './MasterDataUpload'
	export default {
		name: 'MasterDataHeaderMenu',
		data(){
			return {
				masterDataUploadVisible:false
			}
		},
		components: {
			MasterDataUpload
		},
		methods:{
			// openUploadPage: function () {
			// 		this.masterDataUploadVisible = true
			//     this.$refs.upload.clearFiles()
			//     this.checkMessages = []
			//     $('.masterModal').show()
			//     $('.uploadSuccess').hide()
			//     this.handleRemove()
			// },
		}
	}
</script>

<style scoped lang="less">
	.headerMenu:after{
		content: '';
		display: block;
		height: 0;
		clear: both;
	}
	.titleMenu {
		padding: 25px 0 5px 50px;
		font-size: 14px;
		color: #333;
		float: left;
	}
	.infoTitleText{
		padding: 25px 0 5px 12%;
		font-size: 14px;
		color: #333;
		float: left;
	}
	.headerMenu .buttonBox {
		float: right;
		margin-right: 9.5%;
	}
	.headerMenu .buttonBox .btn {
		display:inline-block;
		margin-top: 10px;
		padding: 0;
		width: 142px;
		height: 35px;
		line-height: 35px;
		background-color: #cdcdcd;
		box-shadow: 0 2px 4px 0 #E7E7E8;
		border-radius: 10px;
		color: #656b6a;
		text-align: center;
		font-size: 18px;
	}
	.headerMenu .buttonBox .upload {
		margin-right: 20px;
		background: #FFFFFF;
		border: 1px solid #3577B1;
		border-radius: 10px;
		font-family: BMWTypeCondensedRegular;
		font-size: 18px;
		color: #3B60A7;
		letter-spacing: 0;
	}
</style>