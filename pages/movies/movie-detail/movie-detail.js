// pages/movies/movie-detail/movie-detail.js
import Movie from './class/Movie.js';
var app = getApp();
Page({
  data: {
    movie: {}
  },
  onLoad(options) {
    var movieId = "26861685";
    var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
    var movie = new Movie(url);
    movie.getMovieData((movie) => {
      this.setData({
        movie
      });
    })
  }
})