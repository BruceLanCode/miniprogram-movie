// pages/movies/movies.js

var app = getApp();
Page({
  data: {
    inTheater: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false
  },

  onLoad() {
    var inTheaterUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=3';
    this.getMovieListData(inTheaterUrl, "inTheaters", "正在热映");
  },

  getMovieListData(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url,
      method: 'GET',
      header: {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
        "Cookie": "bid=njxJV-K1nWE; __utma=30149280.477029892.1520304162.1520304162.1520304162.1; __utmc=30149280; __utmz=30149280.1520304162.1.1.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmt=1; __utmb=30149280.6.5.1520304162"
      },
      success: function(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle);
      }
    })
  },

  processDoubanData(moviesDouban, settedKey, categoryTitle) {
    var movies = [];

  }
})