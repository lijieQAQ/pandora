VeeValidate.Validator.localize('en');

VeeValidate.Validator.extend('exists', {
  messages: {
    en: function(field) {return 'File Not Found'},
  },
  validate: function (value) {
    for (let i = 0; i < value.length; i++) {
      if (value[i].size <= 0) {
        return false
      }
    }
    return true
  },
})

VeeValidate.Validator.extend('isnumber', {
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

Vue.use(VeeValidate, {
  events: ''
});

//自定义validate
const dictionary = {
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

VeeValidate.Validator.updateDictionary(dictionary)
