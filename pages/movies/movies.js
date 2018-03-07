// pages/movies/movies.js
var util = require('../../utils/util.js');
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
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=3';
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=3';
    this.getMovieListData(inTheaterUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  getMovieListData(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url,
      method: 'GET',
      success: function(res) {
        that.processDoubanData(res.data, settedKey, categoryTitle);
      }
    })
  },

  processDoubanData(moviesDouban, settedKey, categoryTitle) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject =   moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0,6) + '...';
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
      var readyData = {};
      readyData[settedKey] = {
        categoryTitle,
        movies
      };
      this.setData(readyData);
    }
  },

  onBindFocus() {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onCancelTap() {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },

  onBlur(event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + '/v2/movie/search?q=' + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },

  onMoreTap(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: '/pages/movies/more-movie/more-movie?category=' + category
    })
  }
})