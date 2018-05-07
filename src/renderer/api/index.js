'use strict'
import axios from 'axios'

let _options = {
  baseURL: '/netease',
  method: 'get',
  timeout: 5000,
  transformRequest: [function (data, headers) {
    return data
  }]
}

let api = {
  request: (commit, options, mutation) => {
    return new Promise((resolve, reject) => {
      axios({..._options, ...options}).then(res => {
        commit(mutation, res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  axios
}

export default api
