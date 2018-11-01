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
  }
}

export default mutations
