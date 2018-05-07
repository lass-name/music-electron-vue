import server from '@/api'
import * as types from '../mutation-type'

const state = {
  radio_categories: []
}

const getters = {
  radio_categories: state => state.radio_categories
}

const actions = {
  getRadioCategories ({commit}, playload) {
    return server.request(commit, playload, types.GET_RADIO_CATEGORIES)
  }
}

const mutations = {
  [types.GET_RADIO_CATEGORIES] (state, {data}) {
    state.radio_categories = data.categories
  }
}

export default {
  state, getters, actions, mutations
}
