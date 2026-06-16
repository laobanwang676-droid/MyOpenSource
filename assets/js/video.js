const videoProjects = {
  bms: {
    title: '基于RT-Thread的多串锂电池管理系统(BMS)',
    source: 'https://github.com/laobanwang676-droid/bms_rtthread.git',
    domestic: 'https://live.csdn.net/v/529526'
  },
  weather: {
    title: '基于FreeRTOS的智能天气时钟',
    source: 'https://github.com/laobanwang676-droid/Weather_Clock.git',
    domestic: 'https://live.csdn.net/v/527847'
  },
  balance: {
    title: '多模态两轮自平衡系统',
    source: 'https://github.com/laobanwang676-droid/Balance_Car.git',
    domestic: 'https://live.csdn.net/v/527845'
  }
};

(function () {
  var params = new URLSearchParams(window.location.search);
  var projectKey = params.get('project') || 'weather';
  var project = videoProjects[projectKey] || videoProjects.weather;
  var title = document.getElementById('video-title');
  var sourceLink = document.getElementById('source-link');
  var domesticLink = document.getElementById('domestic-link');

  document.title = project.title + ' - 项目演示视频';

  if (title) title.textContent = project.title;
  if (sourceLink) sourceLink.href = project.source;
  if (domesticLink) domesticLink.href = project.domestic;
})();
