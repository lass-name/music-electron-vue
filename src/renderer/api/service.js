let _options = {
  get: (serviceName, url, method = 'get', data = {}, isJson = false, timeout = 5000, baseURL = '/netease') => {
    let headers = {} // {'service_name': `${serviceName}`}
    headers = isJson ? {...headers, 'Content-Type': 'application/json'} : headers
    baseURL = 'http://localhost:3000'
    return {url, baseURL, timeout, method, params: !isJson && data, data: isJson && data, headers}
  }
}

export const common = (url, method, data, isJson, timeout, baseURL) => {
  return _options.get('userservice', url, method, data, isJson, timeout, baseURL)
}

// export default users
