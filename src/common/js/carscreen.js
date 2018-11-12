import * as d3 from 'd3'
/**
 * Show of PriceLadder
 * Parameters:options
 *   carLanes : Lane of Car
 *   totalWidth : Width of whole screen
 *   width : Width of car panel
 *   height : Height of car panel
 *   range : Range of total height
 *   maxRowNumEveryPage : Max row count per page
 *   minRowNumEveryPage : Min row count per page
 *   unit : Pixel of per 10 thousand RMB
 *   draw : Function that draw your div
 */
var CarScreen = function (options) {
  var localOptions = options || {}
  this.carLanes = localOptions.carLanes || []
  this.totalWidth = localOptions.totalWidth || 100
  this.width = localOptions.width || 200
  this.height = localOptions.height || 50
  this.range = localOptions.range || [0, 400]
  this.maxRowNumEveryPage = localOptions.maxRowNumEveryPage || 8
  this.minRowNumEveryPage = localOptions.minRowNumEveryPage || 3
  this.unit = localOptions.pos || 4
  this.maxPageCnt = 5
  this.draw = localOptions.draw || function () {
  }
  this.currentPageIndex = 0
  this.curCarLanes = []
  this.tpShowFlg = true
}

CarScreen.prototype = {
  addCarLane: function (carLane) {
    if (this.carLanes.length > (this.maxPageCnt * this.maxRowNumEveryPage)) {
      console.log('Too many rows to add! The row count should be less than:' + (this.maxPageCnt * this.maxRowNumEveryPage))
      return false
    }
    this.carLanes.push(carLane)
    this.rescale()
    return true
  },

  computeTotalPage: function () {
    this.pageCnt = this.carLanes.length / this.maxRowNumEveryPage + 1
  },
//12
  computeRowPos: function (pageIndex, tpShowFlg) {
    var len = this.carLanes.length
    if (tpShowFlg) {
      this.maxRowNumEveryPage = 5
    } else {
      this.maxRowNumEveryPage = 8
    }
    if (len <= 5) {
      return [0, len]
    }

    if (((pageIndex + 1) * this.maxRowNumEveryPage) > len) {
      return [pageIndex * this.maxRowNumEveryPage, len]
    }
    // 0  5
    return [(pageIndex * this.maxRowNumEveryPage), ((pageIndex + 1) * this.maxRowNumEveryPage)]
  },

  sortByRRPrice: function (a, b) {
    if (parseInt(a['rrPrice']) < parseInt(b['rrPrice'])) {
      return 1
    }

    if (parseInt(a['rrPrice']) > parseInt(b['rrPrice'])) {
      return -1
    }
    return 0
  },

  sortByInsRRPrice: function (a, b) {
    if (parseInt(a.ins['rrPrice']) < parseInt(b.ins['rrPrice'])) {
      return 1
    }

    if (parseInt(a.ins['rrPrice']) > parseInt(b.ins['rrPrice'])) {
      return -1
    }

    return 0
  },

  sortByCarVIdx: function (a, b) {
    if (parseInt(a['idx']) > parseInt(b['idx'])) {
      return 1
    }

    if (parseInt(a['idx']) < parseInt(b['idx'])) {
      return -1
    }

    return 0
  },

  sortByPrice: function (a, b) {
    if (parseInt(a.sortPrice) < parseInt(b.sortPrice)) {
      return 1
    }

    if (parseInt(a.sortPrice) > parseInt(b.sortPrice)) {
      return -1
    }

    return 0
  },

  isForwardNextEnable: function (tpShowFlg) {
    var len = this.carLanes.length
    // if(tpShowFlg){
    //    this.maxRowNumEveryPage = 5;
    //  }else{
    //    this.maxRowNumEveryPage = 8;
    //  }
    if (this.currentPageIndex < parseInt((len - 1) / this.maxRowNumEveryPage)) {
      return true
    }
    return false
  },

  isForwardPreviousEnable: function () {
    if (this.currentPageIndex > 0) {
      return true
    }
    return false
  },

  forwardNextPage: function () {
    if (!this.isForwardNextEnable(this.tpShowFlg)) {
      return
    }
    this.currentPageIndex = this.currentPageIndex + 1
    this.rescale()
  },

  forwardPreviousPage: function () {
    if (!this.isForwardPreviousEnable()) {
      return
    }
    this.currentPageIndex = this.currentPageIndex - 1
    // this.tpShowFlg = tpShowFlg;
    this.rescale()
  },

  rescale: function () {
    this.curCarLanes = []
    var pagePos = this.computeRowPos(this.currentPageIndex, this.tpShowFlg)
    var devideCnt = ((pagePos[1] - pagePos[0]) < this.minRowNumEveryPage) ? this.minRowNumEveryPage : (pagePos[1] - pagePos[0])
    this.width = this.totalWidth / devideCnt
    var priceRange = []
    var rescaleLine = 0

    var pageCars = []

    for (var i = pagePos[0]; i < pagePos[1]; i++) {
      // 车辆为0
      if (this.carLanes[i].cars.length == 0) {
        continue
      }
      var numberFlag = 1
      for (var j in this.carLanes[i].cars) {
        this.carLanes[i].cars[j].numberFlag = numberFlag
        pageCars.push({
          'idx': i,
          'vIdx': i - pagePos[0],
          'ins': this.carLanes[i].cars[j],
          'sortPrice': this.carLanes[i].cars[j]['rrPrice'],
          'column': 'left'
        })
        numberFlag++
      }
      this.carLanes[i].cars.sort(this.sortByRRPrice)
      priceRange.push(parseInt(this.carLanes[i].cars[0]['rrPrice']))
      priceRange.push(parseInt(this.carLanes[i].cars[this.carLanes[i].cars.length - 1]['rrPrice']))
    }
    if (this.tpShowFlg) {
      // 克隆一个数组，把排序价格设为折后价,标识折后价个列，合并数组
      var tsPriceCars = $.extend(true, {}, pageCars)
      for (var i in tsPriceCars) {
        var pageCar = tsPriceCars[i]
        pageCar.sortPrice = pageCar.ins['tsPrice']
        pageCar.column = 'right'
        pageCars.push(pageCar)
      }
    }
    // Sort
//    pageCars.sort(this.sortByInsRRPrice);
    // 根据sortPrice排序
    pageCars.sort(this.sortByPrice)
    // 分组
    var pageCarGroup = []
    for (var i in pageCars) {
      var car = pageCars[i]
      // 这里需要计算分组值
//      var simRrPrice = (Math.round(car.ins.rrPrice / Math.pow(10,4))) * Math.pow(10,4);
      var simPrice = (Math.round(car.sortPrice / Math.pow(10, 4))) * Math.pow(10, 4)
      // 分组开始
      var fFlg = false
      for (var j in pageCarGroup) {
        var carGroup = pageCarGroup[j]
        if (carGroup.simPrice == simPrice) {
          carGroup.cars.push(car)
          fFlg = true
          break
        }
      }
      if (!fFlg) {
        var newCarGroup = {
          'simPrice': simPrice,
          'cars': [],
        }
        newCarGroup.cars.push(car)
        pageCarGroup.push(newCarGroup)
      }
    }
    // 每个carLane的末尾坐标
    var realCarLanes = []
    for (var i = pagePos[0]; i < pagePos[1]; i++) {
      // 左列
      var carLane = $.extend({}, this.carLanes[i])
      // 右列
      var column = $.extend({}, this.carLanes[i])
      carLane.cars = []
      column.cars = []
      realCarLanes.push({
        'idx': i,
        'tailPos': 0,
        'rightTail': 0,
        'ins': carLane,
        'column': column
      })
    }

    // 上一个组的top坐标
    var top = 0
    // 上组价格的值
    var preSortPrice = 0
    var preRrPrice = 0
    for (var i in pageCarGroup) {
      var carGroup = pageCarGroup[i]
      var tailPosAry = []
      for (var j in carGroup.cars) {
        var car = carGroup.cars[j]
        var tailPos = realCarLanes[car.vIdx].tailPos
        var rightTail = realCarLanes[car.vIdx].rightTail
        tailPosAry.push(tailPos)
        tailPosAry.push(rightTail)
      }
      // 组内最大尾部距离
      var y = d3.max(tailPosAry)
      // 偏移量
      var offset = 0
      if (preSortPrice !== 0) {
        offset = (preSortPrice - carGroup.simPrice) / 10000 * this.unit
      }
      // 确定每组的top坐标
      var x = top + offset
      if (x >= y) {
        top = x
      } else {
        top = y
      }
      // 上一列标识
      var preVIdx = null
      // 上一辆车的model
      var preModel = null
      // 上一辆车的packageCode
      var perPackageCode = null
      // 上一辆车的short
      var preShort = null
      // 上一辆车prePercent
      var prePercent = null
      // 根据每列排序
      //
      var preTop = null
      carGroup.cars.sort(this.sortByCarVIdx)
      var ln = 0
      var rn = 0
      var mergeFlag = true
      for (var j in carGroup.cars) {
        var car = carGroup.cars[j]
        car.ins.mergename = ' '
        car.ins.showNickname = false
        if (preVIdx === null) {
          car.ins.top = top
          if (car.column == 'left') {
            realCarLanes[car.vIdx].tailPos = top + this.height
            realCarLanes[car.vIdx].ins.cars.push(car.ins)
            ln++
          } else {
            realCarLanes[car.vIdx].rightTail = top + this.height
            realCarLanes[car.vIdx].column.cars.push(car.ins)
            rn++
          }
        } else {
          if (preVIdx === car.vIdx) {
            if (car.column === 'left') {
              car.ins.top = top + (this.height * ln)
              realCarLanes[car.vIdx].tailPos = top + (this.height * (ln + 1))
              if (car.ins.model === preModel && car.ins.rrPrice === preRrPrice && car.ins.packageCode != 'ZMC') {
                // 需要合并车辆
                if (mergeFlag) {
                  if (car.column === 'left') {
                    car.ins.top = preTop
                    realCarLanes[car.vIdx].tailPos = preTop + this.height
                    car.ins.mergename = this.mergeName(preShort, car.ins.nickname)
                    car.ins.mergePercent = this.mergePercent(prePercent, car.ins.mixPercentage)
                    mergeFlag = false
                    ln--
                    if (rn > 0) {
                      rn--
                      realCarLanes[car.vIdx].rightTail = top + (this.height * (rn + 1))
                    }
                    realCarLanes[car.vIdx].tailPos = top + (this.height * (ln + 1))
                  }
                }
              }
              realCarLanes[car.vIdx].ins.cars.push(car.ins)
              ln++
            } else {
              car.ins.top = top + (this.height * rn)
              realCarLanes[car.vIdx].rightTail = top + (this.height * (rn + 1))
              realCarLanes[car.vIdx].column.cars.push(car.ins)
              rn++
            }
          } else {
            car.ins.top = top
            if (car.column === 'left') {
              realCarLanes[car.vIdx].tailPos = top + this.height
              realCarLanes[car.vIdx].ins.cars.push(car.ins)
              ln = 1
              rn = 0
            } else {
              realCarLanes[car.vIdx].rightTail = top + this.height
              realCarLanes[car.vIdx].column.cars.push(car.ins)
              ln = 0
              rn = 1
            }
            mergeFlag = true
          }
        }
        preVIdx = car.vIdx
        preModel = car.ins.model
        preShort = car.ins.nickname
        prePercent = car.ins.mixPercentage
        preSortPrice = car.sortPrice
        preRrPrice = car.ins.rrPrice
        preTop = car.ins.top
      }
      preRrPrice = carGroup.simPrice
    }
    // 将计算好的数组赋予真实显示的数组
    this.curCarLanes = realCarLanes
    if (!this.tpShowFlg) {
      if (this.curCarLanes.length == 0) {
        this.forwardPreviousPage()
        window.forwarePage(this.tpShowFlg)
      }
    }

//    var minPrice = d3.min(priceRange);
//    var maxPrice = d3.max(priceRange);
//    var scale = d3.scaleLinear().domain([minPrice, maxPrice]).range(this.range);
//    var data = [];
//    for (var j = pagePos[0]; j < pagePos[1]; j++) {
//
//      var cars = this.carLanes[j].cars;
//      var prePosTop = 0 - this.height;
//      var posLeft = (j - pagePos[0]) * this.width;
//      this.carLanes[j].left = posLeft;
//      this.carLanes[j].width = this.width;
//
//      for (var idx in this.carLanes[j].cars) {
//        var car = this.carLanes[j].cars[idx];
//        var posTop = this.range[1] - scale(parseInt(car['rrPrice']));
//        if (posTop - prePosTop < this.height) {
//            posTop = prePosTop + this.height;
//        }
//
//        car['top'] = posTop;
//        car['showDiscountPercentage'] = car.discountPercentage * 100;
//        car['showMixPercentage'] = car.mixPercentage * 100;
//        prePosTop = posTop;
//      }
//
//      var curCar = {
//        "idx" : j,
//        "ins" : this.carLanes[j]
//      };
//
//      this.curCarLanes.push(curCar);
//    }
  },

  clear: function () {
    this.carLanes = []
    this.currentPageIndex = 0
  },

  isMoveLeftEnable: function (idx) {
    if (idx == 0) {
      return false
    }
    return true
  },

  isMoveRightEnable: function (idx) {
    if (idx == (this.carLanes.length - 1)) {
      return false
    }
    return true
  },

  moveLeft: function (index) {
    if (!this.isMoveLeftEnable(index)) {
      return
    }
    var arr = this.carLanes
    arr[index] = arr.splice(index - 1, 1, arr[index])[0]
    this.rescale()
  },

  moveRight: function (index) {
    if (!this.isMoveRightEnable(index)) {
      return
    }
    var arr = this.carLanes
    arr[index] = arr.splice(index + 1, 1, arr[index])[0]
    this.rescale()
  },

  deleteRow: function (index) {
    this.carLanes.splice(index, 1)
    if (this.carLanes.length % 5 == 0) {
      this.forwardPreviousPage()
      //待改，暂时注释掉这个方法，不好写
      // window.forwarePage(this.tpShowFlg)
    }
    this.rescale()
  },

  setRow: function (idx, carLane) {
    this.carLanes[idx] = carLane
    this.rescale()
  },

  setCar: function (car, laneIndex, carIndex) {
    this.carLanes[laneIndex].cars[carIndex] = car
    this.rescale()
  },

  getCurrentGridClass: function (tpShowFlg) {
    var gridCnt = 0
    var gridCnt2 = 0
    if (tpShowFlg) {
      gridCnt = this.curCarLanes.length < 3 ? 3 : this.curCarLanes.length
      return 'grid' + gridCnt
    } else {
      if (this.curCarLanes.length <= 4) {
        gridCnt2 = 44
      } else if (this.curCarLanes.length === 5) {
        gridCnt2 = 55
      } else if (this.curCarLanes.length === 6) {
        gridCnt2 = 66
      } else if (this.curCarLanes.length === 7) {
        gridCnt2 = 77
      } else {
        gridCnt2 = 88
      }
      // gridCnt2 = this.curCarLanes.length <= 4 ? 44 : 88;
      return 'grid' + gridCnt2
    }
    // var gridCnt = this.curCarLanes.length < 3 ? 3 : this.curCarLanes.length;

  },

  getCarRRPriceClass: function (brand) {
    if (brand === 'BMW') {
      return 'bg1c69d4'
    } else if (brand === 'Audi') {
      return 'bg006600'
    } else if (brand === 'MB') {
      return 'bge60000'
    }
  },

  getCarTPPriceClass: function (brand) {
    if (brand === 'BMW') {
      return 'bg7286ab'
    } else if (brand === 'Audi') {
      return 'bg41a741'
    } else if (brand === 'MB') {
      return 'bgef9490'
    }
  },

  getMathRound: function (number) {
    return (Math.round(number / Math.pow(10, 4))) * Math.pow(10, 4)
  },

  mergeName: function (preName, name) {
    if (name.indexOf('/') != -1) {
      return name
    }
    var preNameArr = preName.split(' ')
    var nameArr = name.split(' ')
    if (preNameArr[0] == nameArr[0]) {
      var mergeName = name + ' / '
      for (var i = 1; i < preNameArr.length; i++) {
        mergeName += preNameArr[i] + ' '
      }
    } else {
      return name + ' / ' + preNameArr
    }
    return mergeName
  },
  mergePercent: function (prePercent, percent) {
    var mergePercent = prePercent + '/' + percent
    return mergePercent
  }
}
export default CarScreen
