<template>
  <div>
    <div class="rightContent" id="rightContent">
      <div class="rightBox" id="rightBox">
        <div class="infoTitle"></div>
        <div class="table-box">
          <div class="select-content">
            <div class="select-box">
              <el-select multiple collapse-tags id="brand" name="brand" class="select" v-model="conditions.brand"  @change="getCmpModelList();search(1, false)" placeholder="Brand">
                <el-option
                  v-for="(d,i) in cmpBrandList"
                  :key="d.id"
                  :label="d.nameEn"
                  :value="d.id">
                </el-option>
              </el-select>
            </div>
            <div class="select-box">
              <el-select multiple collapse-tags id="Model" name="Model" class="select" v-model="conditions.model" @change="getCmpModelRangeList();search(1, false)" placeholder="Model">
                <el-option
                  v-for="(d,i) in cmpModelList"
                  :key="d.model"
                  :label="d.model"
                  :value="d.model">
                </el-option>
              </el-select>
            </div>
            <div class="select-box">
              <el-select multiple collapse-tags id="ModelRange" name="ModelRange" class="select" v-model="conditions.modelRange" @change="getCmpEngineList();search(1, false)" placeholder="Model_Range">
                <el-option
                  v-for="(d,i) in cmpModelRangeList"
                  :key="d.modelRange"
                  :label="d.modelRange"
                  :value="d.modelRange">
                </el-option>
              </el-select>
            </div>
            <div class="select-box">
              <el-select multiple collapse-tags id="Engine" name="Engine" class="select" v-model="conditions.engine" @change="search(1, false)" placeholder="Engine">
                <el-option
                  v-for="(d,i) in cmpEngineList"
                  :key="d.engine"
                  :label="d.engine"
                  :value="d.engine">
                </el-option>
              </el-select>
            </div>
            <div id="searchDate">
              <div class="select-box">
                <el-date-picker
                  v-model="value4"
                  type="month"
                  format="MM/yyyy"
                  @change="changingDate"
                  placeholder="选择月">
                </el-date-picker>
              </div>
            </div>
            <div class="input-box">
              <input class="input-style" type="text" name="code" v-model="conditions.variant">
              <button type="button" class="search" v-on:click="search(1, false)"> <span class="text"></span> </button>
            </div>
          </div>
          <div class="tableInfo">
            <table border="0" align="center" cellpadding="0" cellspacing="0">
              <tr class="th">
                <th></th>
                <th>No.</th>
                <th>Brand <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Model <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Model_Range <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Engine <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Variant <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Variant_short <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Segment</th>
                <th>MSRP(¥)</th>
                <th>D/C </th>
                <th>TP(¥)</th>
                <th>MIX</th>
                <th>HP(KW)</th>
                <th>Log</th>
              </tr>
            </table>
            <div class="overScroll">
                <table border="0" align="center" cellpadding="0" cellspacing="0">
                  <tr v-for="(d,i) in listData" v-cloak>
                      <td class="text-minIcon"></td>
                      <td>{{listSize * (pageInfo.initPage -1) + i + 1}}</td>
                      <td>{{ d.cmpBrand.nameEn }}</td>
                      <td>{{ d.model }}</td>
                      <td>{{ d.modelRange }}</td>
                      <td>{{ d.engine }}</td>
                      <td>{{ d.carNameEn }}</td>
                      <td>{{ d.nickname }}</td>
                      <td v-if="d.segment">{{d.segment}}</td>
                      <td v-else>-</td>
                      <td >{{ accounting.formatMoney(d.rrPrice, "¥", 0) }}</td> 
                      <td>{{ d.discountPercentage }}</td>
                      <td>{{ accounting.formatMoney(d.tsPrice, "¥", 0) }}</td>
                      <td>{{ d.mixPercentage }}</td>
                      <td>{{ d.powerHP }}</td>
                      <td><img src="../assets/images/log.png" width="18" height="17" class="logIcon"/></td>
                  </tr>
                </table>
            </div>
          </div>
        </div>
        <!--分页-->
        <el-pagination
          page
          v-bind:page-count="pageInfo.pageCount"
          v-bind:init-page="pageInfo.initPage"
          ref="paginator"
          @current-change="togglePage($event)"
          background
          layout="prev, pager, next"
        >
        </el-pagination>
          <!-- <paginator v-bind:page-count="pageInfo.pageCount"  v-bind:init-page="pageInfo.initPage" @toggle-page="togglePage($event)" ref="paginator"></paginator> -->
      </div>
    </div>
  </div>
</template>
<script>
  // import commonJs from '../common/js/common.js'
  import accounting from 'accounting'
  export default {
    name:'MasterDataCmp',
    data(){
      return{
        value4:new Date(),
        conditions: {
          brand: [],
          model: [],
          engine: [],
          modelRange: [],
          yearMonth: '',
          variant: '',
        },
        // listSize: commonJs.listSize,
        listData: [],
        cmpBrandList: [],
        cmpModelList: [],
        cmpModelRangeList: [],
        cmpEngineList: [],
        referenceDate: '',
        pageInfo: {
          pageCount: 0,
          initPage: 0,
        },
        fileList: [],
        checkMessages: [],
        errBeforUpload: '',
        value: 'Nothing Selected',
        nothingSelected: 'Nothing Selected',
        upLoadData: {
          'yearMonth': '',
        },
        accounting:accounting
      }
    },
    created(){
      this.getCmpBrandList()
    },
    mounted(){
      this.search(1, false)
    },
    methods:{
      changingDate () {
        let monthsen = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let monthsnumber = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        setTimeout(() => {
          let arr = $('.el-date-editor .el-input__inner')[0].value.split('/')
          monthsnumber.forEach((item, i) => {
            if (item === arr[0]) {
              $('.el-date-editor .el-input__inner')[0].value = monthsen[i] + arr[1]
            }
          })
        }, 10)
      },
      getCmpBrandList: function () {
        var self = this;
        var dataArray = {}
        dataArray['enabled'] = 'true'
        dataArray['size'] = 9999
        dataArray['sort'] = 'id'
        self.$http.get('repo/cmpBrands/list', {
          params: dataArray
        }).then(res => {
          if (res.status == 200) {
          self.cmpBrandList = res.data.cmpBrands
          }
        })
      },
      // 取得所有Model
      getCmpModelList: function () {
        var self = this;
        self.conditions.model = [];
        var dataArray = {}
        if (this.conditions.brand.length > 0) {
          dataArray["cmpBrandId"] = '= ' + self.conditions.brand;
        }
        dataArray['size'] = 9999
        dataArray['sort'] = 'cmpBrandId,model'
        self.$http.get('repo/cmpModelVs/list', {
          params: dataArray
        }).then(res => {
          if (res.status == 200) {
            self.cmpModelList = res.data.cmpModelVs
          }
        })
      },
       // 取得所有ModelRange
      getCmpModelRangeList: function () {
        var self = this;
        self.conditions.modelRange = [];
        var dataArray = {}
        if (this.conditions.brand.length > 0 && this.conditions.model.length > 0) {
          dataArray["cmpBrandId"] = '= ' + self.conditions.brand;
          dataArray["model"] = '= ' + self.conditions.model;
          dataArray['size'] = 9999
          dataArray['sort'] = 'cmpBrandId,model,modelRange'
          self.$http.get('repo/cmpModelRangeVs/list', {
            params: dataArray
          }).then(res => {
            if (res.status == 200) {
              self.cmpModelRangeList = res.data.cmpModelRangeVs;
            }
          })
        } else {
          self.cmpModelRangeList = [];
        }
      },
      // 取得所有Engine
      getCmpEngineList: function () {
        var self = this;
        self.conditions.engine = [];
        var dataArray = {}
        if (this.conditions.brand.length > 0 && this.conditions.model.length > 0 && this.conditions.modelRange.length > 0) {
          dataArray["cmpBrandId"] = '= ' + self.conditions.brand;
          dataArray["model"] = '= ' + self.conditions.model;
          dataArray["modelRange"] = '= ' + self.conditions.modelRange;
          dataArray['size'] = 9999
          dataArray['sort'] = 'cmpBrandId,model,modelRange,engine'
          self.$http.get('repo/cmpEngineVs/list', {
            params: dataArray
            }).then(res => {
                if (res.status == 200) {
                 self.cmpEngineList = res.data.cmpEngineVs
                }
          })
        }
      },
      search: function (page, isDel) {
        if (page === 1) {
          this.$data.pageInfo.initPage = 1
        }
        var self = this
        var dataArray = {}
        var chooseAllFlag = false;
        if(this.conditions.brand.length != 0){
        	for(var i = 0; i < this.conditions.brand.length; i++){
        		var index = this.conditions.brand[i];
        		if(index == 0){
        			chooseAllFlag = true;
        			break;
        		}
        	}
        }
        if(!chooseAllFlag){
          if (this.conditions.brand.length > 0) {
              dataArray['cmpBrand.id'] = '= ' + self.conditions.brand
          } 	
        }else{
        	this.conditions.brand = [0];
        }
        if (this.conditions.model.length > 0) {
          dataArray.model = '= ' + self.conditions.model
        }
        if(this.conditions.modelRange.length > 0){
        	dataArray.modelRange = '= ' + self.conditions.modelRange;
        }
        if (this.conditions.engine.length > 0) {
          dataArray.engine = '= ' + self.conditions.engine
        }
        var searchDate = this.value4;
        if (searchDate) {
          dataArray.yearMonth = '= ' + searchDate.format('yyyymm', null);
        }
        if (this.conditions.variant !== '') {
          dataArray.carNameEn = 'like %' + this.conditions.variant + '%'
        }
        if (isDel && this.$data.listData.length === 1) { // 该页最后一行
          dataArray['page'] = this.$data.pageInfo.initPage - 2
        } else {
          dataArray['page'] = this.$data.pageInfo.initPage - 1
        }
        // dataArray.sort = 'id,asc'
        dataArray.enabled = true
        //记得放开
        // $('.loadingDiv').show()
        self.$http.get('repo/cmpProducts/list', {
          params: dataArray
        }).then(res => {
          if (res.status == 200) {
            self.listData = res.data.cmpProducts
            self.pageInfo.initPage = res.data.page.number + 1
            self.pageInfo.pageCount = res.data.page.totalPages
            if (self.listData.length === 0) {
              // TODO 莫有数据的时候肿么办
            }else{
              for (var i = 0; i < self.listData.length; i++) {
                self.listData[i].rrPrice = accounting.formatMoney(self.listData[i].rrPrice, "¥", 0);
                self.listData[i].discountPercentage = accounting.formatNumber(self.listData[i].discountPercentage * 100, 2, ',') + '%';
                self.listData[i].tsPrice = accounting.formatMoney(self.listData[i].tsPrice, "¥", 0);
                self.listData[i].mixPercentage = accounting.formatNumber(self.listData[i].mixPercentage * 100, 2, ',') + '%';
              }
            }
          //
          }
        })
      },
      togglePage: function (indexPage) {
        this.$data.pageInfo.initPage = indexPage
        this.search()
      },
      
    }
  }
</script>
<style scoped lang="less">
  .rightContent {
    width: 74%;
    margin-left: 25px;
    font-family: 'bmwRg';
    overflow-y: overlay;
    overflow-x: hidden;
    color: #717592;
    float: left;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 #E4E4E4;
    border-radius: 4px;
  }
  .rightBox {
    background-color: #fff;
    margin: 4px;
    overflow: hidden;
    min-height: 263px;
  }
  .table-box {
    height: auto;
  }
  .table-box .select-content {
    height: 25px;
    margin-top: 20px;
    margin-left: 10px;
  }
  .table-box .select-box {
    width: 175px;
    height: 22px;
    float: left;
    margin-right: 10px;
  }
  .table-box .select-box .select {
    display: inline-block;
    width: 100%;
  }
  .table-box .select-box .el-input--suffix, .table-box .select-box .el-input, .table-box .select-box .el-input__inner {
    height: 20px;
    font-size: 14px;
    color: #666;
    float: left;
    line-height: 20px;
    width: 100%;
  }
  .table-box .select-box .el-input--suffix, .table-box .select-box .el-input, .table-box .select-box .el-input__inner {
    height: 20px;
    font-size: 14px;
    color: #666;
    float: left;
    line-height: 20px;
    width: 100%;
  }
  .table-box .select-box input {
    width: 100%!important;
  }
  .table-box .input-box {
    float: right;
    position: relative;
  }
  .table-box .input-box .input-style {
    position: relative;
    right: 13px;
    padding-left: 10px;
    border: 1px solid #dcdfe6;
    height: 21px;
    border-radius: 3px;
    width: 157px;
  }
  .table-box .input-box .search{
    width:20px;
    height:20px;
    background:url(../assets/images/search-icon.png) center center/16px 16px no-repeat;
    border:none;
    right: 43px;
    position: relative;
    top: 4px;
  }
  .tableInfo table {
    border-collapse: collapse;
    height: auto;
    overflow: hidden;
    width: 98.5%;
    margin: 10px 10px 0;
  } 
  .tableInfo .overScroll {
    height: 380px;
    overflow-y: scroll;
  }
  .tableInfo table {
    border-collapse: collapse;
    height: auto;
    overflow: hidden;
    width: 98.5%;
    margin: 10px 10px 0;
  }
  .tableInfo table tr:nth-child(2n+1) {
    /* opacity: 0.71; */
    background: #E9EEF4;
  }
  .tableInfo table tr:first-child {
    border-bottom: 1px solid #6B98BE;
  }
  .tableInfo table tr.th th {
    background-color: #fafaf9;
    height: 42px;
    line-height: 42px;
    color: #656b6a;
    font-size: 14px;
    font-weight: bold;
    padding: 0 5px;
  }
  .tableInfo table tr.th th:nth-child(1){
    width:1.6%;
  }
  .tableInfo table tr.th th:nth-child(2){
    width:2.57%;
  }
  .tableInfo table tr.th th:nth-child(3){
    width:5.5%;
  }
  .tableInfo table tr.th th:nth-child(4){
    width:5.7%;
  }
  .tableInfo table tr.th th:nth-child(5){
    width:7.6%;
  }
  .tableInfo table tr.th th:nth-child(6){
    width:8%;
  }
  .tableInfo table tr.th th:nth-child(7){
    width:18%;
  }
  .tableInfo table tr.th th:nth-child(8){
    width:12%;
  }
  .tableInfo table tr.th th:nth-child(9){
    width:8%;
  }
  .tableInfo table tr.th th:nth-child(10){
    width:7.8%;
  }
  .tableInfo table tr.th th:nth-child(11){
    width:3.8%;
  }
  .tableInfo table tr.th th:nth-child(12){
    width:7.4%;
  }
  .tableInfo table tr.th th:nth-child(13){
    width:6.1%;
  }
  .tableInfo table tr.th th:nth-child(14){
    width:4.6%;
  }
  .tableInfo table tr.th th:nth-child(15){
    width:2.3%;
  } 
  .tableInfo table tr td {
    border: none;
    line-height: 42px;
    vertical-align: middle;
    font-size: 14px;
    color: #000000;
    font-weight: 300;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 5px;
  }
  .text-minIcon {
    background: url(../assets/images/text-minIcon.png) center center/12px 12px no-repeat;
    width: 25px;
  }
  .tableInfo table tr td:nth-child(1) {
    width: 1.6%;
  }
  .tableInfo table tr td:nth-child(2) {
    width: 2.57%;
  }
  .tableInfo table tr td:nth-child(3){
    width:5.5%;
  }
  .tableInfo table tr td:nth-child(4){
    width:5.7%;
  }
  .tableInfo table tr td:nth-child(5){
    width:7.6%;
  }
  .tableInfo table tr td:nth-child(6){
    width:8%;
  }
  .tableInfo table tr td:nth-child(7){
    width:18%;
  }
  .tableInfo table tr td:nth-child(8){
    width:12%;
  }
  .tableInfo table tr td:nth-child(9){
    width:7%;
  }
  .tableInfo table tr td:nth-child(10){
    width:8.3%;
  }
  .tableInfo table tr td:nth-child(11){
    width:3.3%;
  }
  .tableInfo table tr td:nth-child(12){
    width:8.4%;
  }
  .tableInfo table tr td:nth-child(13){
    width:6.1%;
  }
  .tableInfo table tr td:nth-child(14){
    width:3.6%;
  }
  .tableInfo table tr td:nth-child(15){
    width:3.3%;
  }

</style>


