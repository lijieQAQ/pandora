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
  [types.SETCAR_CARSCREEN] (state, params) {
    state.carScreen.setCar(params.c, params.i, params.j)
  },
  [types.DELETEROW_CARSCREEN] (state, status) {
    state.carScreen.deleteRow(status)
  },
  [types.RESCALE_CARSCREEN] (state, status) {
    state.carScreen.rescale()
  },
  [types.SETROW_CARSCREEN] (state, params) {
    state.carScreen.setRow(params.a,params.b)
  },




}

export default mutations
