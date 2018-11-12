<template>
  <el-dialog
    :visible.sync="deleteColumnVisible"

    width='485px'
    top='20vh'
    :show-close = false
  >
    <div class="modal fade" :id="'modalRmRow' + deleteColumnMark" tabindex="-1" role="dialog" aria-labelledby="myModalEdit" aria-hidden="true">
      <div class="modal-dialog editModal saveModal clearAll">
        <div class="modal-content">
          <div class="modal-body">
            <h4 class="text-center removeColumn">Are you sure to delete this column?</h4>
            <div class="clearAllDeleteIcon"></div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="btnBox">
            <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal" @click="showNameCor(),closeDeleteColumnDialog()">Cancel</button>
            <button type="button" class="btn btn-primary btnConfirm" data-dismiss="modal" @click="deleteRow(deleteColumnMark),showNameCor(),closeDeleteColumnDialog()">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import CarScreen from '../common/js/carscreen.js'
import store from '../store'
export default {
  name:'DeleteColumn',
  data(){
    return{
      carScreen: this.$store.state.carScreen
    }
  },
  methods:{
    closeDeleteColumnDialog: function () { 
      this.$emit('closeDeleteColumnDialog',false)
    },
    showNameCor: function(){
      $('.versionArrow').css('background-color','#fff');
    },
    deleteRow: function(deleteColumnMark){
      store.commit('DELETEROW_CARSCREEN', deleteColumnMark)
      this.$emit('confirmDleate','createArrow')
    },
  },
  props:{
    deleteColumnVisible:Boolean,
    deleteColumnMark: Number,
    priceBoxWidth: Number,
    windowScreenWidth: Number
  }
}
</script>
<style scoped lang='less'>
.modal.in .modal-dialog {
  -webkit-transform: translate(0,0);
  -ms-transform: translate(0,0);
  -o-transform: translate(0,0);
  transform: translate(0,0);
}
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
.modal-content {
  position: relative;
  background-color: #fff;
  border: 0px solid #999;
  border-radius: 0px;
  outline: 0;
  box-shadow: none;
}
.clearAll .modal-body .removeColumn {
  margin-bottom: 26px;
}

.clearAll .modal-body .text-center {
  margin-top: 36px;
  margin-bottom: 10px;
  color: #606060;
  font-size: 18px;
  font-weight: normal;
}
.clearAll .modal-body .clearAllDeleteIcon {
  width: 100%;
  height: 55px;
  margin-bottom: 30px;
  margin-top: 20px;
  background: url(../assets/images/deleteIcon.png) 50% 100% no-repeat;
  background-size: 50px;
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
.btn {
  padding: 0;
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
</style>


