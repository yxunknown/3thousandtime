// pages/detail/detail.js

const date = require('../../utils/date.js');

Page({

  /**
   * Page initial data
   */
  data: {
    progress: {},
    progressNum: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    var p = JSON.parse(wx.getStorageSync('d_progress'));
    this.setData({
      progress: p,
    });
    // calculate progress
    const now = new Date().getTime();
    const st = date.getTime(p.startTime);
    const et = date.getTime(p.endTime);
    var pn = (now - st) * 100 / (et - st);
    pn = Math.ceil(pn);
    if (pn > 100) {
      pn = 100;
    }
    if (pn < 0) {
      pn = 0;
    }
    this.setData({
      progressNum: pn,
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    // clear detail data
    wx.removeStorageSync('d_progress');
    wx.removeStorageSync('d_index');
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  delBtnTap: function() {
    wx.showModal({
      title: '提示',
      content: '是否删除该进度？',
      confirmColor: '#D72E3D',
      cancelColor: '#249D3D',
      confirmText: '删除',
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          // delete progress
          const ps = JSON.parse(wx.getStorageSync('progresses'));
          console.log(ps[0]);
          console.log(ps[1]);
          const index = wx.getStorageSync('d_index');
          ps.splice(index, 1);
          var newPs = JSON.stringify(ps);
          wx.setStorageSync('progresses', newPs);
          // back to pre page
          wx.navigateBack({
            delta: 1
          });
        } else if (res.cancel) {
          // to do nothing
        }
      }
    })
  },
  inputTitle: function(e) {
    const p = this.data.progress;;
    this.setData({
      progress: {
        name: e.detail.value,
        startTime: p.startTime,
        endTime: p.endTime
      },
    });
     // update storage
    const progresses = JSON.parse(wx.getStorageSync('progresses'));
    const index = wx.getStorageSync('d_index');
    progresses.splice(index, 1, this.data.progress);
    wx.setStorageSync('progresses', JSON.stringify(progresses));
  },
  startDateChange: function(e) {
    var p = this.data.progress;
    this.setData({
      progress: {
        name: p.name,
        startTime: e.detail.value,
        endTime: p.endTime
      },
    });
    p = this.data.progress;
    // calculate progress
    const now = new Date().getTime();
    const st = date.getTime(p.startTime);
    const et = date.getTime(p.endTime);
    var pn = (now - st) * 100 / (et - st);
    pn = Math.ceil(pn);
    if (pn > 100) {
      pn = 100;
    }
    if (pn < 0) {
      pn = 0;
    }
    this.setData({
      progressNum: pn,
    });
     // update storage
    const progresses = JSON.parse(wx.getStorageSync('progresses'));
    const index = wx.getStorageSync('d_index');
    progresses.splice(index, 1, this.data.progress);
    wx.setStorageSync('progresses', JSON.stringify(progresses));
  },
  endDateChange: function(e) {
    var p = this.data.progress;
    this.setData({
      progress: {
        name: p.name,
        startTime: p.startTime,
        endTime: e.detail.value
      },
    });
    p = this.data.progress;
    // calculate progress
    const now = new Date().getTime();
    const st = date.getTime(p.startTime);
    const et = date.getTime(p.endTime);
    var pn = (now - st) * 100 / (et - st);
    pn = Math.ceil(pn);
    if (pn > 100) {
      pn = 100;
    }
    if (pn < 0) {
      pn = 0;
    }
    this.setData({
      progressNum: pn,
    });
    // update storage
    const progresses = JSON.parse(wx.getStorageSync('progresses'));
    const index = wx.getStorageSync('d_index');
    progresses.splice(index, 1, this.data.progress);
    wx.setStorageSync('progresses', JSON.stringify(progresses));
  }
})