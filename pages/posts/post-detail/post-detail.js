// pages/posts/post-detail.js
var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad(option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });

    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },

  setMusicMonitor() {
    wx.onBackgroundAudioPlay((event) => {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId = this.data.currentPostId) {
        if (app.globalData.g_currentMusicPostId === this.data.currentPostId) {
          this.setData({
            isPlayingMusic: true
          });
        }
      }
      app.globalData.g_isPlayingMusic = true;
    });

    wx.onBackgroundAudioPause((event) => {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.currentPostId = this.data.currentPostId) {
        if (app.globalData.g_currentMusicPostId === this.data.currentPostId) {
          this.setData({
            isPlayingMusic: false
          });
        }
      }
      app.globalData.g_isPlayingMusic = false;
    });

    wx.onBackgroundAudioStop((event) => {
      this.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
    });
  },

  onCollectionTap() {
    this.getPostsCollectedAsy();
  },

  getPostsCollectedAsy() {
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        console.log(res);
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      },
    })
  },

  showToast(postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : ' 取消成功',
      duration: 1000,
      icon: "success"
    });
  },

  onShareTap() {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消',
        })
      }
    })
  },

  onMusicTap() {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
      app.globalData.g_currentMusicPostId = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      });
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
      app.globalData.g_isPlayingMusic = true;
    }
  }
})