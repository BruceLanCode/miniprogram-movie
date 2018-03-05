// pages/posts/posts.js
var postData = require('../../data/posts-data.js');
Page({
  data: {

  },
  onLoad() {
    this.setData({
      postList: postData.postList
    });
  },

  onPostTap(event) {
    console.log(event)
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    });
  }, 

  onSwiperTap(evet) {
    console.log(event)
    // var postId = event.target.dataset.postid;
    // wx.navigateTo({
    //   url: 'post-detail/post-detail?id=' + postId,
    // });
  }
})