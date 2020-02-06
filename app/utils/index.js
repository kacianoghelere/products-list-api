module.exports = {
  random: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  },
  range: function* (start, end) {
    for (let i = start; i <= end; i++) {
      yield i
    }
  }
}