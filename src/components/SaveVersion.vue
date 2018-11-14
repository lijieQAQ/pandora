<template>
  <el-dialog
    :visible.sync="saveVersionVisible"
    width='485px'
    top='20vh'
    :show-close=false
  >
    <div class="modal fade" id="saveModal">
      <div class="modal-dialog editModal saveModal">
        <div class="modal-header">
          <h4 class="modal-title" id="myModalEdit">
            <span class="iconTitle"></span>
            Save
            <div class="underline"></div>
          </h4>
        </div>
        <div class="modal-content">
          <div class="modal-body">
            <fieldset class="select-box widthAuto">
              <div class="control-group" style="margin-top: 10px">
                <div class="controls input-append">
                  <label for="name">Select Version</label>
                  <div id="saveInput">
                    <el-select v-model="saveVersion.version" placeholder="Please Select Version"
                               @change="changeSaveVersion($event)">
                      <el-option v-for="item in saveVersion.versionList" :label="item.versionName" :key="item"
                                 :value="item.versionNumber"><span style="float:right">{{ item.yearMonth }}</span>{{
                        item.versionName }}
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="control-group">
                <div class="controls input-append">
                  <label for="name">Version Description</label>
                  <input type="text" v-model="saveVersion.versionDescription" placeholder="">
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="modal-footer">
          <div class="btnBox">
            <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal" @click='closeSaveVersion()'>
              Cancel
            </button>
            <button type="button" class="btn btn-primary btnConfirm" @click="saveData()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>

export default {
  name: 'saveVersion',
  data () {
    return {
      carScreen: this.$store.state.carScreen
    }
  },
  methods: {
    closeSaveVersion: function () {
      this.$emit('closeSaveVersion', false)
    },
    fadeCor: function () {
      $('.versionArrow').css('background-color', 'transparent')
    },
    changeSaveVersion: function (val) {
      for (var i in this.saveVersion.versionList) {
        var sel = this.saveVersion.versionList[i]
        if (sel.versionNumber === val) {
          this.saveVersion.versionDescription = sel.versionName
          break
        }
      }
      this.$emit('changeSaveVersion', this.saveVersion)
    },
    saveData: function () {
      let self = this
      if (this.carScreen.carLanes.length == 0) {
        return
      }

      var versionName = this.saveVersion.versionDescription
      if (!versionName) {
        versionName = 'version' + this.saveVersion.version
      }

      var route = {
        userName: localStorage.username,
        yearMonth: (new Date()).format('yyyymm'),
        versionNumber: this.saveVersion.version,
        versionName: versionName,
        rows: this.carScreen.carLanes,
        tpShowFlg: this.tpShowFlg
      }
      //待改
      // $('.loadingDiv').show();
      self.$http.post('priceladder/saveVersion', route).then(res => {
        if (res.status == 200) {
          this.$emit('closeSaveVersionModifyNewColumn', route)
        }
      })
      // $.ajax({
      //   url: '/priceladder/saveVersion',
      //   contentType: 'application/json;charset=utf-8',
      //   type: 'POST',
      //   dataType: 'json',
      //   data: JSON.stringify(route),
      //   async: false,
      //   beforeSend: function (request) {
      //     request.setRequestHeader('Authorization', localStorage.token)
      //   },
      //   success: function (data) {
      //     $('#showSavedTime').css('display','block');
      //     $('.versionCloseIcon').css('display','block');
      //     $('.priceInfoTitle .saveTime .saveTimeBorderB').css('border-bottom','none');
      //     $('.loadingDiv').hide();
      //     if (data.code == 0) {
      //       $('#saveModal').modal('hide');
      //       $('#saveSuccessModal').modal('show');
      //       var addRowDateValue = $('#versionDate').datetimepicker('getDate');
      //       self.nowDate = (new Date()).format('mm/dd/yyyy \v hh:MM:ss');
      //       if (addRowDateValue.format('yyyymm') == (new Date()).format('yyyymm')) {
      //         self.getVersionList(new Date());
      //         self.initSaveVersionList();
      //         for (var k in self.versionList) {
      //           var sel = self.versionList[k];
      //           if (sel.versionNumber == route.versionNumber) {
      //             self.version = sel.id;
      //             break;
      //           }
      //         }
      //       }
      //     } else {
      //       alert(data.msg);
      //     }
      //   },
      //   error: function (result, status) {
      //     $('.loadingDiv').show();
      //     alert("网络有问题，请检查！");
      //   },
      // })
    }
  },
  props: {
    saveVersionVisible: Boolean,
    saveVersion: Object,
    tpShowFlg: Boolean
  }
}
</script>

<style scoped lang='less'>
  .saveModal {
    width: 590px;
    height: 236px;
    background: #fff;
  }

  .modal-dialog {
    margin: 220px auto;
  }

  .editModal .modal-header {
    border-bottom: none;
    padding: 15px;
  }

  .editModal .modal-title {
    margin: 0 30px;
    font-size: 18px;
    color: #606060;
    text-align: left;
    font-weight: normal;
  }

  .editModal .modal-title .iconTitle {
    position: relative;
    left: -7px;
    width: 30px;
    height: 12px;
    display: inline-block;
    background: url(../assets/images/model-titleIcon.png) 100% 100% no-repeat;
    background-size: 26px;
  }

  .editModal .modal-title .underline {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, #7BA0F1, #64C3EE, #fff);
  }

  .editModal .widthAuto {
    width: 486px;
    margin: 0 44px;
    border: none;
  }

  .modal-content {
    /* position: relative; */
    /* background-color: #fff; */
    border: 0px solid #999;
    border-radius: 0px;
    outline: 0;
    box-shadow: none;
  }

  .saveModal .select-box .control-group {
    margin-bottom: 10px;
  }

  .editModal .control-group {
    clear: both;
    overflow: hidden;
    position: relative;
    height: 46px;
  }

  .editModal .widthAuto label {
    float: left;
    width: 121px;
    text-align: left;
  }

  .editModal label {
    font-size: 14px;
    color: #666;
    font-weight: normal;
  }

  #saveInput {
    float: right;
  }

  #saveModal .editModal .input-append input {
    width: 337px;
  }

  .editModal .modal-footer {
    border-top: 0px;
    background: #fff;
    padding: 0;
    text-align: center;
  }

  .editModal .modal-footer .btnBox {
    width: 400px;
    margin: 0 auto;
  }

  .saveModal .modal-footer .btn {
    margin-top: 0;
  }

  .editModal .modal-footer .btnCancel {
    color: #A6A6A6;
    margin-right: 60px;
    background: #FFF;
    border: 1px solid #A6A6A6;
    border-radius: 3px;
  }

  .editModal .modal-footer .btn {
    width: 120px;
    height: 34px;
    border-radius: 2px;
    font-size: 18px;
    border: 0px;
    margin-left: 0;
    line-height: 36px;
    margin-bottom: 36px;
    border: 1px solid gray;
  }

  .btn {
    padding: 0;
  }

  .editModal .modal-footer .btnConfirm {
    color: #FFF;
    background: #FFF;
    border: 1px solid #2D9DEA;
    border-radius: 3px;
    background-image: linear-gradient(-90deg, #2D9DEA 0%, #1464D0 100%);
  }
</style>


