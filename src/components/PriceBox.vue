<template>
  <div class="priceBox" :class="{'font_small': fontStyle === 'small'}">
    <ul v-if="carScreen.curCarLanes.length > 0" v-bind:class="carScreen.getCurrentGridClass(tpShowFlg)">
      <!-- <li class="box center" v-for="(carLane, i) in carScreen.curCarLanes">
        <div class="carType">
          <div :class="carScreen.getCarRRPriceClass(carLane.ins.brandNameEn)" class="top-bar"></div>

          <div class="carLogo" @dblclick="openModifyModal(carLane.ins, false, carLane.idx, 'rowDate' + carLane.idx)"> 
            <img v-bind:src="'./images/' + carLane.ins.brandNameEn + '.png'"/> 
            <el-tooltip open-delay="1000" class="item" effect="dark" v-bind:content="carLane.ins.bmwFlg ? carLane.ins.seriesNameEn : carLane.ins.model - carLane.ins.bmwFlg ? carLane.ins.eseriesNameEn : carLane.ins.engine" placement="top">
                      <el-button class="carLogoName" >{{ carLane.ins.bmwFlg ? carLane.ins.seriesNameEn : carLane.ins.model }}-{{ carLane.ins.bmwFlg ? carLane.ins.eseriesNameEn : carLane.ins.engine }}</el-button>
            </el-tooltip>
          </div>

          <div class="attrSlect">
            <div class="dateTimeCover"></div>
            <div class="cover" @dblclick="openModifyModal(carLane.ins, false, carLane.idx, 'rowDate' + carLane.idx)"></div>
            
            <div class="icon">

              <div class="dropdown">
                <div class=" arr-more dropdown-toggle" id="more5" data-toggle="dropdown"><span class="caret"></span> </div>
                <ul class="dropdown-menu" role="menu" aria-labelledby="more5">
                  <li role="presentation">
                    <div class="buttonBox" id="editMask">
                      <a role="menuitem" tabindex="-1" href="javascript:void(0)" @click="openModifyModal(carLane.ins, false, carLane.idx, 'rowDate' + carLane.idx)"><i class="modify-icon"></i>Modify Column Content</a>
                    </div>
                  </li>
                  <li role="presentation">
                    <i v-bind:class="{arrDisabled: !carScreen.isMoveLeftEnable(carLane.idx)}" class="arr-l" @click="carScreen.moveLeft(carLane.idx),createArrow()"></i>
                    <i v-bind:class="{arrDisabled: !carScreen.isMoveRightEnable(carLane.idx)}" class="arr-r" @click="carScreen.moveRight(carLane.idx),createArrow()"></i>
                  </li>
                    <div class="modal fade" :id="'modalRmRow' + i" tabindex="-1" role="dialog" aria-labelledby="myModalEdit" aria-hidden="true">
                      <div class="modal-dialog editModal saveModal clearAll">
                        <div class="modal-content">
                          <div class="modal-body">
                            <h4 class="text-center removeColumn">Are you sure to delete this column?</h4>
                            <div class="clearAllDeleteIcon"></div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <div class="btnBox">
                            <button type="submit" class="btn btn-default btnCancel" data-dismiss="modal" @click="showNameCor()">Cancel</button>
                            <button type="button" class="btn btn-primary btnConfirm" data-dismiss="modal" @click="carScreen.deleteRow(i),createArrow(),showNameCor()">Confirm</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </ul>
              </div>
              <a role="menuitem" tabindex="-1" href="javascript:void(0)" data-toggle="modal" :data-target="'#modalRmRow' + i" ><i v-if="tpShowFlg" class="delete-icon" @click="fadeCor()"></i></a>
            </div>
            
            <div class="date-box">
              <form action="" class="form-horizontal">
                <fieldset>
                  <div class="control-group">
                    <div class="controls input-append date form_datetime rowDate" data-date-format="mm yyyy" data-link-field="dtp_input1" v-bind:id="'rowDate' + carLane.idx">
                      <input size="8" type="text" id="dataInput" :value="convertYearMonth2Date(carLane.ins.yearMonth).format('m/yyyy')" readOnly style="border:none;font-size:14px" readonly>
                      <span class="add-on"><i class="icon-th"></i></span> </div>
                  </div>
                </fieldset>
              </form>
            </div>

          </div>

        </div>
        <div class="line"></div>
      </li> -->
    </ul>
    <div class="clearfloat"></div>
  </div>
</template>

<script>
  import CarScreen from '../common/js/carscreen.js'
  export default {
    
    name:"PriceBox",
    data(){
      return{
        carScreen: {},
      }
    },
    created(){
      this.carScreen = new CarScreen();
    },
    methods:{

    },

  }
</script>

