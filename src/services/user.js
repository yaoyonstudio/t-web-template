import AJAX from '../libs/Ajax/index'

import { API_URL } from '../constants/index'

export default {
  /**
   * login service
   * @param {Object} params - login params ({ username: String, password: String })
   * @param {Function} fn - login callback
   */
  loginService(params, fn) {
    AJAX.call(this, `${API_URL}/user`, 'GET', params, fn)
  },
}
