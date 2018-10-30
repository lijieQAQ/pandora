// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/styleHign.css'
import http from './common/js/http'
import App from './App'
import 'jquery'
import VueNumeric from 'vue-numeric'
import VeeValidate, { Validator } from 'vee-validate'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueNumeric)
Vue.use(VeeValidate)

Validator.extend('exists', {
  messages: {
    zh_CN: function (field) {
      return '文件不存在或没有内容'
    }
  },
  validate: function (value) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].size <= 0) {
        return false
      }
    }
    return true
  }
})

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      required: function (field) {
        if (field === '角色' || field === '所属公司' || field === '文件' ||
          field === '性别' || field === '出生日期' || field === '所属外协' ||
          field === '种类' || field === '开始工区' || field === '结束工区' ||
          field === '供应商' || field === '担当') {
          return '请选择' + field
        } else if (field === '请在地图上选择工区区域') {
          return field
        } else {
          return 'Please input ' + field + '. '
        }
      },
      alpha_dash: function (field) {
        return field + '只能输入字母数字破折号下划线'
      },
      email: function (field) {
        return 'Please enter the accurate ' + field + '. '
      },
      mimes: function (field) {
        return '请选择有效的文件类型：*.xlsx *.xls'
      },
    },
    attributes: {
      // 动态监控页面-START
      'searchForm.monitorDate': '监控日期',
      // 动态监控页面-END
      // POI表单导入页面-START
      'referenceDate': '基准日',
      'poiImport.userName': '担当',
      'inputFile': '文件',
      // POI表单导入页面-END
      // 用户一览页面-START
      'addAccount.userName': '用户名',
      'addAccount.hashedPassword': '密码',
      'addAccount.email': '电子邮箱',
      'addAccount.displayName': '姓名',
      'addAccount.companyId': '所属公司',
      'addAccount.role': '角色',
      'addAccount.validFrom': '有效期开始日期',
      'addAccount.validThru': '有效期结束日期',
      // 用户一览页面-END
      // 供应商一览页面-START
      'addBase.code': '编码',
      'addBase.name': '供应商名',
      'addBase.nameAbbreviation': '简称',
      'addBase.address': '地址 ',
      'addBase.contactPerson': '联系人',
      'addBase.tel': '电话',
      'addBase.email': '邮箱',
      'addBase.type': '类型',
      'addBase.workingDayTimeStart': '作业开始时间',
      'addBase.workingDayTimeEnd': '作业结束时间',
      'addBase.remark': '备注',
      'r.restStart': '休息开始时间',
      'r.restEnd': '休息结束时间',
      // 供应商一览页面-END
      // 工作日历一览-START
      'addCalendar.targetFrom': '起始日期',
      'addCalendar.targetTo': '终止日期',
      'addCalendar.startTime': '工作开始时间',
      'addCalendar.endTime': '工作结束时间',
      'editCalendar.startTime': '标准作业开始时间',
      'editCalendar.endTime': '标准作业结束时间',
      // 'r.restStart': '休息开始时间',
      // 'r.restEnd': '休息结束时间'
      // 工作日历一览-END
      // 外协一览-START
      'addCompany.name': '外协名称',
      'addCompany.nameAbbreviation': '外协简称',
      'addCompany.address': '地址 ',
      'addCompany.contactPerson': '联系人',
      'addCompany.contactPersonTel': '联系人电话 ',
      'addCompany.ceoName': '负责人',
      'addCompany.ceoTelNo': '负责人电话 ',
      'addCompany.email': '邮箱',
      'addCompany.remark': '备注',
      // 外协一览-END
      // 字典值管理页面-START
      'addDict.valueInLong': '值',
      'addDict.valueInText': '值',
      // 字典值管理页面-END
      // 司机一览-START
      'addDriver.displayName': '姓名',
      'addDriver.sex': '性别',
      'addDriver.telNo': '联系方式',
      'addDriver.birthday': '出生日期',
      'addDriver.companyName': '所属外协',
      'addDriver.identification': '身份证',
      'addDriver.licenceNo': '驾照',
      'addDriver.licenceCapability': '车型',
      // 司机一览-END
      // 路线单价一览-START
      'addFromToCost.typeId': '种类',
      'addFromToCost.startLocationId': '开始工区',
      'addFromToCost.endLocationId': '结束工区',
      'addFromToCost.cost': '交通时间',
      // 路线单价一览-END
      // 工区一览-START
      'addLocation.base.name': '供应商名字',
      'addLocation.code': '工区编码',
      'addLocation.name': '工区名',
      'addLocation.remarks': '备注',
      'addLocation.range': '请在地图上选择工区区域',
      // 工区一览-END
      // 线路一览-START
      'addRoute.code': '路线编号',
      'addRoute.companyId': '所属公司',
      'addRoute.latestNextDayDeliverTime': '最晚次日纳时',
      'addRoute.averageSpeed': '平均速度',
      // 线路一览-END
      // 特定日工作时间一览-START
      'addSingularDay.singularDayFrom': '起始日期',
      'addSingularDay.singularDayTo': '终止日期',
      'addSingularDay.startTime': '工作开始时间',
      'addSingularDay.endTime': '工作结束时间',
      'addSingularDay.baseId': '供应商',
      // 特定日工作时间一览-END
      // 车辆一览-START
      'addVehicle.plateNumber': '车牌号',
      'addVehicle.type': '车型',
      'addVehicle.companyId': '所属外协',
      // 车辆一览-END
      // 线路分组管理-START
      'addRouteGroup.companyId': '所属外协',
      'addRouteGroup.groupName': '组名'
      // 线路分组管理-END
    }
  }
}

Validator.extend('compareTime', {
  messages: {
    zh_CN: function (field) {
      return '开始时间不能大于结束时间'
    }
  },
  validate: function (value, args) {
    var t11 = args[0].split(':')
    var t21 = value.split(':')

    if (Number(t11[0] * 60) + Number(t11[1]) > Number(t21[0] * 60) + Number(t21[1])) {
      return false
    } else {
      return true
    }
  }
})

// POI表单导入页面
Validator.extend('exists', {
  messages: {
    zh_CN: function (field) {
      return '文件不存在或没有内容'
    }
  },
  validate: function (value) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].size <= 0) {
        return false
      }
    }
    return true
  }
})

// 供应商一览页面/工作日历一览页面
Validator.extend('timeHM', {
  messages: {
    zh_CN: function (field) {
      return '注意时间格式(例:09:23)'
    }
  },
  validate: function (value, args) {
    return value.length !== 0 && /^(0[0-9]|1[0-9]|2[0-9]|30):([0-5][0-9])$/.test(value)
  }
})
//自定义
Validator.extend('isnumber', {
  messages: {
    en: function(field) {return 'The ' + field + ' field is required.'},
  },
  validate: function (value) {
	  if(typeof(value) == "number"){
		  return value <= 0 ? false : true; 
	  }
    return false
  },
})

// 密码的校验规则
Validator.extend('password', {
  messages: {
    zh_CN: function (field) {
      return 'Non-compatible Password.'
    }
  },
  validate: function (value) {
    // return value.length !== 0 && /^(0[0-9]|1[0-9]|2[0-9]|30):([0-5][0-9])$/.test(value)
    var num = 0
    var rule1 = /\d+/
    var rule2 = /[a-z]+/
    var rule3 = /[A-Z]+/
    var rule4 = /[~!@#$%^&*{};,.?/'"_\-=+():[\]<>]/
    var rule5 = /^.{6,16}$/
    var flag1 = rule1.test(value)
    var flag2 = rule2.test(value)
    var flag3 = rule3.test(value)
    var flag4 = rule4.test(value)
    var flag5 = rule5.test(value)
    if (flag1) {
      num = num + 1
    }
    if (flag2) {
      num = num + 1
    }
    if (flag3) {
      num = num + 1
    }
    if (flag4) {
      num = num + 1
    }
    if (!(num > 2 && flag5)) {
      return false
    }
    return true
  }
})
const custom = {
  en : {
    attributes: {
      'menuhub.addRow.addCar.carNameEn' : 'Variant',
      'menuhub.addRow.addCar.nickname'  : 'Variant(Short)',
      'menuhub.addRow.addCar.model'     : 'Model',
      'menuhub.addRow.addCar.packageCode': 'PC',
      'menuhub.addRow.addCar.engine': 'Engine',
      'menuhub.addRow.addCar.rrPrice': 'MSRP',
      'menuhub.addRow.addCar.tsPrice': 'T/P',
      'menuhub.editCar.carNameEn': 'Variant',
      'menuhub.editCar.nickname': 'Variant(Short)',
      'menuhub.editCar.model': 'Model',
      'menuhub.editCar.packageCode': 'PC',
      'menuhub.editCar.engine': 'Engine',
      'menuhub.editCar.rrPrice': 'MSRP',
      'menuhub.editCar.tsPrice': 'T/P',
      'editCar.carNameEn': 'Variant',
      'editCar.nickname': 'Variant(Short)',
      'editCar.model': 'Model',
      'editCar.packageCode': 'PC',
      'editCar.engine': 'Engine',
      'editCar.rrPrice': 'MSRP',
      'editCar.tsPrice': 'T/P',
      'addRow.addCar.carNameEn' : 'Variant',
      'addRow.addCar.nickname'  : 'Variant(Short)',
      'addRow.addCar.model'     : 'Model',
      'addRow.addCar.packageCode': 'PC',
      'addRow.addCar.engine': 'Engine',
      'addRow.addCar.rrPrice': 'MSRP',
      'addRow.addCar.tsPrice': 'T/P',
      'changeCarB.rrPrice': 'MSRP',
      'changeCarA.rrPrice': 'MSRP',

    },
  },
}
Validator.localize(dictionary)
Validator.localize(custom)

// axios封装
Vue.use(http)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    VueNumeric
  },
  template: '<App/>'
})
