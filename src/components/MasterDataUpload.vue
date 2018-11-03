<template>
  <el-dialog
    :visible.sync="masterDataUploadVisible"
    center
    class="sixColumnMain"
    width='45%'
    top='15vh'
    show-close=false
  >
    <div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <!-- upload model -->
      <div class="modal-dialog masterModal" id="uploadDialog">
        <div class="modal-header">
          <h4 class="modal-title">
            <span class="iconTitle"></span>
              Upload
            <div class="underline"></div>
          </h4>
        </div>
        <div class="modal-content" >
          <div class="modal-body">
            <fieldset class="select-box">
              <label for="name">Select Upload Month</label>
              <div class="control-group">
                <div id="uploadDate" class="controls input-append date form_datetime" data-link-field="dtp_input1">
                  <el-date-picker
                    v-model="value4"
                    type="month"
                    format="MM/yyyy"
                    @change="changeDate"
                    placeholder="选择月">
                  </el-date-picker>
                  <!-- <span class="add-on"><i class="icon-th"></i></span>  -->
                </div>
              </div>
            </fieldset>
            <div class="uploadBox dashed">
              <!--drag 支持拖拽--><!--------action处是接口哟～～～-------->
              <el-upload
                class="upload-demo"
                action="http://localhost:8080/bmw/product/upload"
                ref="upload"
                :on-remove="handleRemove"
                :multiple="false"
                :show-file-list="true"
                :on-progress="handleProgress"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-change="handleChange"
                accept=".xls,.xlsx"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                :auto-upload="false"
                :data="upLoadData"
                :headers="headers"
                :limit="1"
                name="excel">
                <el-button size="small" type="primary"></el-button>
                <div slot="tip" class="el-upload__tip color555" style="font-size: 18px">Drop files here to upload or choose files</div>
                <div slot="tip" class="el-upload__tip color999" style="opacity: 0.5;margin-top:0">Only support Excel format with size limit of 5MB</div>
              </el-upload>
              <div class="masterTip" v-if="checkMessages.length != 0">
                <!-- 上传成功不显示，失败显示错误信息 -->
                <div class="masterTipTop">Clank!</div>
                <div class="masterTipBottom">
                  <li v-for="(d,i) in checkMessages">
                    <a href="javascript:void(0)">
                      <span class="cicle"></span>{{d}}</a>
                  </li>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btnBox">
              <button id="doImportCancel" type="submit" class="btn btn-default" @click="masterDataUploadVisible=false">Cancel</button>
              <button id="doImport" type="button" class="btn btn-primary" data-toggle="modal" @click="doImport2()" disabled>Confirm</button>
              <div class="modal fade" id="myBtn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- upload success tip -->
      <!--上传成功，成功信息-->
      <div class="modal-dialog uploadSuccess" style="display: none">
        <div class="modal-content">
          <div class="modal-body">
            <p>Upload Save Successful!</p>
            <img src="../assets/images/uploadSuccessfulIcon.png"> 
          </div>
        </div>
      </div>
      <!-- /.modal -->
    </div>
    <span slot="footer" class="dialog-footer"></span>
  </el-dialog>
</template>

<script>
  export default {
    name:'MasterDataUpload',
    data(){
      return{
        value4:new Date(),
        fileList: [],
        upLoadData: {
          'yearMonth': '',
        },
        checkMessages: [],
        
      }
    },
    props: {
      masterDataUploadVisible: Boolean
    },
    computed: {
      headers: function () {
        return {
          'Authorization': localStorage.token
        }
      }
    },
    methods:{
      handleRemove: function (file, fileList) {
        this.checkMessages = []
        if (!fileList || fileList.length == 0) {
          $('.uploadBox .el-upload').css("display", "block")
          $('.uploadBox .el-upload__tip').css("display", "block")
          $('.dashed').css("border", "dashed 1px #1c69d4")
          $('#doImport').attr("disabled", true);
          $('.uploadBox .el-upload-list').css("display", "none")
        }
      },
      handleProgress: function (event, file, fileList) {
        if (event.percent != 0) {
          $('.uploadBox .el-upload').css("display", "none");
          $('.uploadBox .el-upload__tip').css("display", "none")
          $('.dashed').css({ "border": "none", "background": "#ffffff" })
        }
      },
      handleSuccess: function (response, file, fileList) {
        alert(response,file,fileList)
        // $('#uploadModal').modal('hide')
        if (response.success == '0') {
          // this.$refs.upload.clearFiles()
          // $('#doImport').attr("disabled",true);
          // $('#uploadSuccessModal').modal('show')
          $('.masterModal').hide()
          $('.uploadSuccess').show()
        } else {
          // $('#uploadErrorModal').modal('show')
          if (response.error) {
            this.checkMessages.push(response.error);
          }
          for (var k = 0; response.checkMessages && k < response.checkMessages.length; k++) {
            var megLines = response.checkMessages[k];
            for (var j = 0; megLines && j < megLines.length; j++) {
              this.checkMessages.push("Line." + (k + 1) + " : " + megLines[j]);
            }
          }
        }

        //如果成功显示成功弹窗
      },
      handleError: function (response, file, fileList) {
        $('#doImport').attr("disabled", false);
        if (response.id != '101') {
          $('.masterTip').css("display", "block")
        }
      },
      handleChange: function (response, file) {
        if (!file || file.length == 0) {
          $('#doImport').attr("disabled", true);
          $('.uploadBox .el-upload-list').css("display", "none")
        } else {
          $('#doImport').attr("disabled", false);
          $('.uploadBox .el-upload-list').css("display", "block")
        }
      },
      beforeAvatarUpload: function (file) {
        const isExcel = (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        const isLt5M = file.size / 1024 / 1024 / 1024 / 1024 / 1024 < 5;
        if (!isExcel) {
          // 上传文件只能是 xls、xlsx 格式!
          this.$message.error('Can only upload files in xls or xlsx format!');
        }
        if (!isLt5M) {
          // 上传文件大小不能超过 5MB!
          this.$message.error('Can only upload files within 5MB!');
        }
        return isExcel && isLt5M;
      },
      doImport2: function () {
        var uploadDate = this.value4
        if (uploadDate) {
          this.upLoadData.yearMonth = uploadDate.format("yyyymm")
        }
        this.$refs.upload.submit()
        $('#doImport').attr("disabled", true);
      },
    }

  }
</script>

<style scoped lang="less">
  .masterModal .modal-header {
    border-bottom: 0px;
  }
  #uploadDialog .modal-title {
    margin-left: 30px;
    font-size: 18px;
    color: #606060;
  }
  .modal-title {
    margin: 0 30px !important;
    padding: 15px;
    line-height: 1.42857143;
  }
  #uploadDialog .modal-title .iconTitle {
    position: relative;
    left: -7px;
    width: 30px;
    height: 12px;
    display: inline-block;
    background: url(../assets/images/model-titleIcon.png) 100% 100% no-repeat;
    background-size: 26px;
  }
  .modal-title .underline {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #7BA0F1, #64C3EE, #fff);
  }
  .modal-content {
    position: relative;
    background-color: #fff;
    border: 0px solid #999;
    border-radius: 0px;
    outline: 0;
    box-shadow: none;
  }
  .masterModal .modal-body {
    font-size: 14px;
    color: #333;
    padding: 20px;
    padding-top: 0;
  }
  .masterModal .select-box {
    margin-left: 25px;
    min-width: 0;
    padding: 0;
    border: 0;
  }
  .masterModal .select-box label {
    line-height: 25px;
    font-weight: normal;
    color: #5d5f57;
    float: left;
  }
  .masterModal .select-box .form_datetime .el-date-editor {
    width: 190px;
    height: 25px;
    border: #d8d8d8 1px solid;
    padding-left: 10px;
    float: left;
    margin-left: 10px;
  }
  .masterModal .select-box .form_datetime .add-on{
    position: absolute;
    width: 20px;
    height: 20px;
    background:  url(../assets/images/min-date-cion.png) 80% 80% no-repeat;;
  }
  .masterModal .dashed {
    border: solid 1px #D9D9D9 !important;
    border-radius: 4px;
  }

  .masterModal .uploadBox, .masterModal .uploading {
    width: 664px;
    height: 294px;
    margin: 0 auto;
    background: #F2F3F9;
    margin-top: 20px;
    color: #D9D9D9;
  }
  .uploadBox .upload-demo {
    height: auto;
    margin: 0 auto;
  }
  .uploadBox .upload-demo .el-upload__tip {
    font-size: 18px;
    text-align: center;
    margin-top:7px;
  }
  .color555 {
    color: #606060 !important;
  }
  .uploadBox .el-button--primary, .uploadBox .el-button--primary:hover, .uploadBox .el-button--primary:active, .el-button--primary.is-active, .el-button--primary:focus {
    background-size: 44px;
    background-image: url(../assets/images/uploadIconNew.png);
    background-repeat: no-repeat;
    background-color: transparent;
    width: 47px;
    height: 42px;
    cursor: pointer;
    margin: 0 auto;
    border: none;
    text-align: center;
  }
  .uploadBox .el-upload__input {
    display: none !important;
  }
  .uploadBox .upload-demo .el-upload__tip {
    font-size: 14px;
    text-align: center;
  }
  .masterModal .modal-footer {
    display: block;
    width: 756px;
    height: 92px;
    border: none;
    padding: 0;
  }
  .masterModal .modal-footer .btnBox {
    width: 300px;
    margin-top: 20px !important;
    margin: 0 auto;
  }
  .headerMenu .buttonBox .masterModal .modal-footer #doImportCancel {
    float: left;
    margin-right: 60px;
    color: #999;
    background: #f7faf9;
    border: #dfe5e6 solid 1px;
  }
  .headerMenu .buttonBox .masterModal .modal-footer .btnBox .btn {
    width: 120px;
    height: 34px;
    border-radius: 3px;
    text-align: center;
    font-size: 16px;
    border: 0px;
    margin: 0 0 20px 0;
  }
  .headerMenu .buttonBox .btn {
    margin-top: 10px;
    padding: 0;
    width: 142px;
    height: 35px;
    line-height: 35px;
    /* background-image: linear-gradient(90deg, #2D9DEA 0%, #1464D0 98%); */
    background-color: #cdcdcd;
    box-shadow: 0 2px 4px 0 #E7E7E8;
    border-radius: 10px;
    color: #656b6a;
    text-align: center;
    font-size: 18px;
  }
  .headerMenu .buttonBox .masterModal .modal-footer .btn-primary {
    float: left;
    color: #fff;
    background-image: linear-gradient(-90deg, #2D9DEA 0%, #1464D0 100%);
  }

  .headerMenu .buttonBox .masterModal .modal-footer .btn {
    width: 120px;
    height: 34px;
    border-radius: 3px;
    text-align: center;
    font-size: 16px;
    border: 0px;
    margin: 0 0 20px 0;
  }
  .headerMenu .buttonBox .btn {
    margin-top: 10px;
    padding: 0;
    width: 142px;
    height: 35px;
    line-height: 35px;
    /* background-image: linear-gradient(90deg, #2D9DEA 0%, #1464D0 98%); */
    background-color: #cdcdcd;
    box-shadow: 0 2px 4px 0 #E7E7E8;
    border-radius: 10px;
    color: #656b6a;
    text-align: center;
    font-size: 18px;
  }

</style>


