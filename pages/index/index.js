//index.js
//获取应用实例
const app = getApp()
const date = require('../../utils/date.js')
Page({
  data: {
    progresses: [],
  },

  onReady: function () {
    var progressJsonStr = wx.getStorageSync('progresses');
    if (progressJsonStr === "") {
      progressJsonStr = '['+ date.getThisYearProgress() + ']';
    }
    wx.setStorageSync('progresses', progressJsonStr);
    //update ui here
    setInterval(() => {
      try {
        const now = new Date().getTime();
        const progress = JSON.parse(wx.getStorageSync('progresses'));
        const pary = [];
        for (let i = 0; i < progress.length; i++) {
          const p = progress[i];
          const st = date.getTime(p.startTime);
          const et = date.getTime(p.endTime);
          var pro = (now - st) * 100 / (et - st);
          if (pro > 100) {
            pro = 100;
          }
          if (pro < 0) {
            pro = 0;
          }
          pary.push({
            name: p.name,
            progress: pro
          })
        }
        this.setData({
          progresses: pary,
        })
      } catch(e) {

      }

    }, 1000);
  },

  addBtnTap: function(event) {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },
  toDetail: function(e) {
    wx.removeStorageSync('d_progress');
    wx.removeStorageSync('d_index');
    const index = e.currentTarget.id;
    const progress = JSON.parse(wx.getStorageSync('progresses'))[index];
    wx.setStorageSync('d_progress', JSON.stringify(progress));
    wx.setStorageSync('d_index', index);
    wx.navigateTo({
      url: '/pages/detail/detail',
    });
  }
})
