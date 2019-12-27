/********************************* type checking start ******************************** */

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isNumber(value) {
  return typeof value === 'number' && isFinite(value)
}

export function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object
}

export function isNull(value) {
  return value === null
}

export function isUndefined(value) {
  return typeof value === 'undefined'
}

export function isBoolean(value) {
  return typeof value === 'boolean'
}

export function isRegExp(value) {
  return value && typeof value === 'object' && value.constructor === RegExp
}

export function isDate(value) {
  return value instanceof Date
}

export function isError(value) {
  return value instanceof Error && typeof value.message !== 'undefined'
}

export function isSymbol(value) {
  return typeof value === 'symbol'
}

/********************************* type checking end ******************************** */

/**
 * get the {name} query string value
 * @param {String} name
 */
export function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * parse object params to query string(concat with '&')
 * @param {Object} params
 */
export function paramsObjToString(params) {
  if (!params || !isObject(params)) return ''
  if (!Object.keys(params).length) return ''
  let temp = []
  for (let o in params) {
    temp.push(`${o}=${params[o]}`)
  }
  return temp.join('&')
}

/**
 * check mobile
 * @param {String|Number} telephone
 */
export function checkMobile(telephone) {
  if (!telephone) {
    return false
  }
  var re = /^1\d{10}$/
  return re.test(telephone)
}

/**
 * check password (6-32, number|en character)
 * @param {String} password
 */
export function checkPassword(password) {
  if (!password) {
    return false
  }
  // var re = /^[a-z\d]{6,12}$/i
  var re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/i
  return re.test(password)
}

/**
 * check weixin browser
 */
export function isWeixinBrowser() {
  var agent = navigator.userAgent.toLowerCase()
  if (agent.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

/**
 * clear all localStorage
 */
export function clearStorage() {
  if (!window) return
  window.localStorage.clear()
}

/**
 * get localStorage value
 * @param {String} key
 */
export function getValue(key) {
  if (!window) return
  return window.localStorage.getItem(key)
}

/**
 * set localStorage
 * @param {String} key
 * @param {String} value
 */
export function setValue(key, value) {
  if (!window) return
  window.localStorage.setItem(key, value)
}
