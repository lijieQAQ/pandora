import * as types from './mutation-types'

// import {generateMixed} from './../common/js/common'
// 同步方法
const mutations = {
  [types.UPDATE_CARSCREEN] (state, status) {
    state.carScreen = status
  },
  [types.ADD_CARSCREEN] (state, status) {
    state.carScreen.addCarLane(status)
  },
  [types.CLEAR_CARSCREEN] (state, status) {
    state.carScreen.clear()
  },
  [types.SETCAR_CARSCREEN] (state, canshu1, canshu2, canshu3) {
    state.carScreen.setCar(canshu1, canshu2, canshu3)
  }

}

export default mutations
