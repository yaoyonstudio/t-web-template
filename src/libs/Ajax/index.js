export default function ajax(url, method, params, fn, errFn) {
  if (!url) return
  var _options = {
    type: method || 'GET',
    url: url,
    data: params || null,
    dataType: 'json',
    success: function(res) {
      if (typeof fn === 'function') {
        fn(res)
      }
    },
    error: function(error) {
      if (typeof errFn === 'function') {
        errFn(error)
      }
    },
  }
  return $.ajax(_options)
}
