import AJAX from '../libs/Ajax/index'

import { API_URL } from '../constants/index'

export default {
  /**
   * get common data service
   * @param {Function} fn - get common data service callback
   */
  getCommonDataService(fn) {
    AJAX.call(this, `${API_URL}/common`, 'GET', null, fn)
  },
}
