<template>
  <div>
    <div class="rightContent" id="rightContent">
      <div class="rightBox" id="rightBox">
        <div class="infoTitle">
        </div>
        <div class="table-box">
          <div class="select-content">
            <div class="select-box">
              <el-select class="select" multiple collapse-tags v-model="conditions.series"
                         @change="getBmwESeriesList();getBmwModelsList();search(1, false)" placeholder="Series">
                <el-option
                  v-for="(d,i) in bmwSeriesList"
                  :key="d.id"
                  :label="d.nameEn"
                  :value="d.id">
                </el-option>
              </el-select>
            </div>
            <div class="select-box">
              <el-select class="select" multiple collapse-tags v-model="conditions.eSeries"
                         @change="getBmwModelsList();search(1, false)" placeholder="E-Series">
                <el-option
                  v-for="(d,i) in bmwESeriesList"
                  :key="d.id"
                  :label="d.nameEn"
                  :value="d.id">
                </el-option>
              </el-select>
            </div>
            <div class="select-box">
              <el-select class="select" multiple collapse-tags v-model="conditions.model" @change="search(1, false)"
                         placeholder="Model">
                <el-option
                  v-for="(d,i) in bmwModelList"
                  :key="d.model"
                  :label="d.model"
                  :value="d.model">
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
              <button type="button" class="search" v-on:click="search(1, false)"><span class="text"> </span></button>
            </div>
          </div>
          <div class="tableInfo">
            <table border="0" align="center" cellpadding="0" cellspacing="0">
              <tr class="th">
                <th></th>
                <th>No.</th>
                <th>Series <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>E-Series <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Model <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>PackageCode</th>
                <th>Variant <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Variant_short <img src="../assets/images/left-arrow.png" alt=""></th>
                <th>Segment</th>
                <th>MSRP(￥)</th>
                <th>D/C</th>
                <th>TP(￥)</th>
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
                  <td>{{d.bmwESeries.bmwSeries.nameEn}}</td>
                  <td>{{d.bmwESeries.nameEn}}</td>
                  <td>{{d.model}}</td>
                  <td>{{d.packageCode}}</td>
                  <td>{{d.carNameEn}}</td>
                  <td>{{d.nickname}}</td>
                  <td v-if="d.segment">{{d.segment}}</td>
                  <td v-else>-</td>
                  <td>{{d.rrPrice}}</td>
                  <td>{{d.discountPercentage}}</td>
                  <td>{{d.tsPrice}}</td>
                  <td>{{d.mixPercentage}}</td>
                  <td>{{d.powerHP}}</td>
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

<script type="text/javascript">
import accounting from 'accounting'
import '../common/js/common.js'

export default {
  name: 'MasterDataBmw',
  data () {
    return {
      value4: new Date(),
      listData: [],
      pageInfo: {
        pageCount: 0,
        initPage: 0
      },
      bmwSeriesList: [],
      bmwESeriesList: [],
      bmwModelList: [],
      conditions: {
        series: [],
        eSeries: [],
        model: [],
        yearMonth: '',
        variant: ''
      },
      accounting: accounting
    }
  },
  created () {
    this.geteseriesOrModerRangeNameBmwSeriesList()
  },
  mounted () {
    this.search(1, false)
  },
  methods: {
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
    getBmwSeriesList: function () {
      var self = this
      var dataArray = {}
      dataArray['enabled'] = 'true'
      dataArray['size'] = 9999
      dataArray['sort'] = 'nameEn'
      self.$http.get('repo/bmwSeries/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.bmwSeriesList = res.data.bmwSeries
        }
      })
    },
    getBmwESeriesList: function () {
      var self = this
      self.conditions.eSeries = []
      var dataArray = {}
      if (this.conditions.series !== '' && this.conditions.series.length != 0) {
        dataArray['bmwSeries.id'] = '= ' + this.conditions.series
      }
      dataArray['enabled'] = 'true'
      dataArray['size'] = 9999
      dataArray['sort'] = 'nameEn'
      self.$http.get('repo/bmwESeries/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.bmwESeriesList = res.data.bmwESeries
        }
      })
    },
    getBmwModelsList: function () {
      var self = this
      self.conditions.model = []
      var dataArray = {}
      if (this.conditions.eSeries != '' && this.conditions.eSeries.length != 0) {
        dataArray['bmwESeriesId'] = '= ' + this.conditions.eSeries
        dataArray['size'] = 9999
        dataArray['sort'] = 'model'
        self.$http.get('repo/bmwModels/list', {
          params: dataArray
        }).then(res => {
          if (res.status == 200) {
            self.bmwModelList = res.data.bmwModels
          }
        })
      } else {
        self.bmwModelList = {}
      }
    },
    search: function (page, isDel) {
      if (page === 1) {
        this.$data.pageInfo.initPage = 1
        //          this.$data.pageInfo.curPage = 1
      }
      var self = this
      var dataArray = {}
      var chooseAllFlag = false
      if (this.conditions.series.length != 0) {
        for (var i = 0; i < this.conditions.series.length; i++) {
          var index = this.conditions.series[i]
          if (index == 0) {
            alert(1111)
            chooseAllFlag = true
            break
          }
        }
      }
      if (!chooseAllFlag) {
        if (this.conditions.series != '' && this.conditions.series != 0 && this.conditions.series.length != 0) {
          dataArray['bmwESeries.bmwSeries.id'] = '= ' + this.conditions.series
        }
      } else {
        this.conditions.series = [0]
      }

      if (this.conditions.eSeries != '' && this.conditions.eSeries.length != 0) {
        dataArray['bmwESeries.id'] = '= ' + this.conditions.eSeries
      }
      if (this.conditions.model != '' && this.conditions.model != self.nothingSelected && this.conditions.model.length != 0) {
        dataArray.model = '= ' + this.conditions.model
      }
      var searchDate = this.value4

      if (searchDate) {
        dataArray.yearMonth = '= ' + searchDate.format('yyyymm')
      }
      if (this.conditions.vabmwProductsriant != '') {
        dataArray.carNameEn = 'like %' + this.conditions.variant + '%'
      }
      if (isDel && this.$data.listData.length === 1) { // 该页最后一行
        dataArray['page'] = this.$data.pageInfo.initPage - 2
      } else {
        dataArray['page'] = this.$data.pageInfo.initPage - 1
      }
      // dataArray.sort = 'id,asc'
      dataArray.enabled = true

      self.$http.get('repo/bmwProducts/list', {
        params: dataArray
      }).then(res => {
        if (res.status == 200) {
          self.listData = res.data.bmwProducts
          self.pageInfo.initPage = res.data.page.number + 1
          self.pageInfo.pageCount = res.data.page.totalPages
          if (self.listData.length === 0) {
            //              self.zeroMsg = commonZeroMsg
          } else {
            self.zeroMsg = ''
            for (var i = 0; i < self.listData.length; i++) {
              //                var tpPrice = self.listData[i].rrPrice * (1 - (self.listData[i].discountPercentage * 100));
              self.listData[i].rrPrice = accounting.formatMoney(self.listData[i].rrPrice, '¥', 0)
              //                self.listData[i].discountPercentage = accounting.formatNumber(self.listData[i].discountPercentage * 100, 2, ',') + '%'
              self.listData[i].discountPercentage = accounting.formatNumber(self.listData[i].discountPercentage * 100, 2, ',') + '%'
              self.listData[i].tsPrice = accounting.formatMoney(self.listData[i].tsPrice, '¥', 0)
              self.listData[i].mixPercentage = accounting.formatNumber(self.listData[i].mixPercentage * 100, 2, ',') + '%'
            }
          }
        }
      })
    },
    togglePage: function (indexPage) {
      this.$data.pageInfo.initPage = indexPage
      this.search()
    }
  }
}
</script>

<style scoped lang='less'>
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

  .table-box .input-box .search {
    width: 20px;
    height: 20px;
    background: url(../assets/images/search-icon.png) center center/16px 16px no-repeat;
    border: none;
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

  .tableInfo table tr.th th:nth-child(1) {
    width: 1.6%;
  }

  .tableInfo table tr.th th:nth-child(2) {
    width: 2.57%;
  }

  .tableInfo table tr.th th:nth-child(3) {
    width: 5.5%;
  }

  .tableInfo table tr.th th:nth-child(4) {
    width: 5.7%;
  }

  .tableInfo table tr.th th:nth-child(5) {
    width: 7.6%;
  }

  .tableInfo table tr.th th:nth-child(6) {
    width: 8%;
  }

  .tableInfo table tr.th th:nth-child(7) {
    width: 18%;
  }

  .tableInfo table tr.th th:nth-child(8) {
    width: 12%;
  }

  .tableInfo table tr.th th:nth-child(9) {
    width: 8%;
  }

  .tableInfo table tr.th th:nth-child(10) {
    width: 7.8%;
  }

  .tableInfo table tr.th th:nth-child(11) {
    width: 3.8%;
  }

  .tableInfo table tr.th th:nth-child(12) {
    width: 7.4%;
  }

  .tableInfo table tr.th th:nth-child(13) {
    width: 6.1%;
  }

  .tableInfo table tr.th th:nth-child(14) {
    width: 4.6%;
  }

  .tableInfo table tr.th th:nth-child(15) {
    width: 2.3%;
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

  .tableInfo table tr td:nth-child(3) {
    width: 5.5%;
  }

  .tableInfo table tr td:nth-child(4) {
    width: 5.7%;
  }

  .tableInfo table tr td:nth-child(5) {
    width: 7.6%;
  }

  .tableInfo table tr td:nth-child(6) {
    width: 8%;
  }

  .tableInfo table tr td:nth-child(7) {
    width: 18%;
  }

  .tableInfo table tr td:nth-child(8) {
    width: 12%;
  }

  .tableInfo table tr td:nth-child(9) {
    width: 7%;
  }

  .tableInfo table tr td:nth-child(10) {
    width: 8.3%;
  }

  .tableInfo table tr td:nth-child(11) {
    width: 3.3%;
  }

  .tableInfo table tr td:nth-child(12) {
    width: 8.4%;
  }

  .tableInfo table tr td:nth-child(13) {
    width: 6.1%;
  }

  .tableInfo table tr td:nth-child(14) {
    width: 3.6%;
  }

  .tableInfo table tr td:nth-child(15) {
    width: 3.3%;
  }

</style>
