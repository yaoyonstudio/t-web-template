import { testFun } from './common.js'
import commonService from '../services/common.js'

testFun()

$(document).ready(() => {
  console.log('document ready!')

  commonService.getCommonDataService(res => {
    $('#box').text(res.appTitle)
  })
})
