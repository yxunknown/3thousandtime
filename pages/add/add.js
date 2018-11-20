// pages/add.js
Page({

  /**
   * Page initial data
   */
  data: {
    startTime: "",
    endTime: "",
    name: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },
  inputTile: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  startDateChange: function(e) {
    this.setData({
      startTime: e.detail.value
    });
  },
  endDateChange: function(e) {
    this.setData({
      endTime: e.detail.value
    });
  },
  add: function() {
    var progressStorage = wx.getStorageSync("progresses");
    if (progressStorage === "") {
      progressStorage = "[]";
    }
    var progressArray = JSON.parse(progressStorage);
    progressArray.push(this.data);
    try {
      wx.setStorageSync('progresses', JSON.stringify(progressArray) + '')
      // add success
      wx.navigateTo({
        url: '/pages/index/index',
      });
    } catch (e) {
      wx.showToast({
        title: '添加失败',
        duration: 2000
      });
    }
  }
})