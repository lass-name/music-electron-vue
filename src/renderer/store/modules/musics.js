import server from '@/api'
import * as types from '../mutation-type'

const state = {
  current_album_musics: [],
  current_play_muisc: {},
  current_play_music_url: '',
  banners: []
}

const getters = {
  current_album_musics: state => state.current_album_musics,
  current_play_muisc: state => state.current_play_muisc,
  banners: state => state.banners,
  current_play_music_url: state => state.current_play_music_url
}

const actions = {
  setCurrentPlayMuisc ({commit}, playload) {
    commit(types.SET_CURRENT_MUSIC, playload)
  },
  setCurrentPlayMusicUrl ({commit}, playload) {
    return server.request(commit, playload, types.SET_CURRENT_MUSIC_URL)
  },
  getAlbumMuisc ({commit}, playload) {
    return server.request(commit, playload, types.GET_ALBUMS_MUSICS)
  },
  getBanners ({commit}, playload) {
    return server.request(commit, playload, types.GET_BANNERS)
  }
}

const mutations = {
  [types.GET_ALBUMS_MUSICS] (state, {data}) {
    state.current_album_musics = data.playlist
  },
  [types.SET_CURRENT_MUSIC] (state, playload) {
    state.current_play_muisc = playload
  },
  [types.GET_BANNERS] (state, {data}) {
    state.banners = data.banners
  },
  [types.SET_CURRENT_MUSIC_URL] (state, {data}) {
    state.current_play_music_url = data.data[0].url
  }
}

export default {
  state, getters, actions, mutations
}
