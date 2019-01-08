module.exports = {
  money: price => {
    return "￥" + price.toFixed(2)
  },
  date: date => {
    if(date == ""){
      return '还没有登录过'
    }
    return new Date(date).toLocaleString()
    // let _date = new Date(date)
    // return `${_date.getFullYear()}年${('0' + (_date.getMonth() + 1)).substring(-1, 2)}月${('0' + _date.getDate()).substring(-1, 2)}日 ${('0' + _date.getHours()).substring(-1, 2)}:${('0' + _date.getMinutes()).substring(-1, 2)}:${('0' + _date.getSeconds()).substring(-1, 2)}`
  }
}