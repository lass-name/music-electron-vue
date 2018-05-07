// import server from '@/api'
import * as types from '../mutation-type'

const state = {
  current_person_albums: []
}

const getters = {
  current_person_albums: state => state.current_person_albums
}

const actions = {
  setCurrentAlbum ({commit}, playload) {
    commit(types.SET_CURRENT_ALBUMS, playload)
  }
}

const mutations = {
  [types.SET_CURRENT_ALBUMS] (state, data) {
    state.current_person_albums = data
  }
}

export default {
  state, getters, actions, mutations
}
