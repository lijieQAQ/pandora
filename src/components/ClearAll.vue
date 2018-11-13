<template>
  <el-dialog
    :visible.sync="clearAllVisible"
    width='485px'
    top='20vh'
    :show-close = false
  >
    <div class="modal fade" id="clearAllModal" tabindex="-1" role="dialog">
      <div class="modal-dialog editModal saveModal clearAll">
        <div class="modal-content">
          <div class="modal-body">
            <h4 class="text-center">
              Are you sure to clear all contents?
            </h4>
            <div class="clearAllDeleteIcon"></div>
          </div>
        </div>
        <div class="modal-footer" style="margin 0 auto">
          <div class="btnBox">
            <button type="submit" style="float:left;margin-right:50px;margin-left:100px;" class="btn btn-default btnCancel" @click='closeClearAll'>Cancel</button>
            <button type="button" style="float:left" class="btn btn-primary btnConfirm" data-dismiss="modal" @click="confirmClearAll(),closeClearAll()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'ClearAll',
  data () {
    return{
      
    }
  },
  props:{
    clearAllVisible: Boolean
  },
  methods:{
    closeClearAll: function () {
      this.$emit('closeClearAll',false)
    },
    confirmClearAll: function () {
      this.$emit('confirmClearAll','clearAll')
    }

  }
}
</script>

<style scoped lang='less'>
.clearAll {
  width: 485px;
  height: 240px;
  -ms-border-radius: 2px;
  border-radius: 2px;
  box-shadow: 0 0 6px 0;
}
.modal-dialog {
  margin: 220px auto;
}
.editModal .modal-content, .editModal .modal-body {
  overflow: hidden;
}
.clearAll .modal-body .text-center {
  margin-top: 36px;
  font-weight: normal;
  margin-bottom: 10px;
  color: #606060;
  font-size: 18px;
}
.clearAll .modal-body .clearAllDeleteIcon {
  width: 100%;
  height: 55px;
  margin-bottom: 40px;
  background: url(../assets/images/deleteIcon.png) 50% 100% no-repeat;
  background-size: 50px;
}
.editModal .modal-footer {
  border-top: 0px;
  background: #fff;
  padding: 0;
  text-align: center;
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

}
.editModal .modal-footer .btnCancel {
  color: #A6A6A6;
  margin-right: 60px;
  background: #FFF;
  border: 1px solid #A6A6A6;
  border-radius: 3px;
}
.editModal .modal-footer .btnConfirm {
  color: #FFF;
  background: #FFF;
  border: 1px solid #2D9DEA;
  border-radius: 3px;
  background-image: linear-gradient(-90deg, #2D9DEA 0%, #1464D0 100%);
}
.btn {
  padding: 0;
}
</style>


