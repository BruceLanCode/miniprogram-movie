// pages/movies/movie-detail/movie-detail.js
import Movie from './class/Movie.js';
var app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    movie: {},
  },
  onLoad(options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    var movie = new Movie(url);
    movie.getMovieData((movie) => {
      this.setData({
        movie
      });
    })
  },
  viewMoviePhoto() {
    var photoUrl = app.globalData.doubanBase + `/v2/movie/subject/${this.data.movie.movieId}/photos`;
    util.http(photoUrl,(data) => {
      var photoUrls = [];
      if (data.photos) {
        photoUrls = data.photos.map((photo) => photo.cover);
      } else {
        photoUrls.push(this.data.movie.movieImg);
      }
      wx.previewImage({
        current: photoUrls[0],
        urls: photoUrls,
      });
    });
  }
})