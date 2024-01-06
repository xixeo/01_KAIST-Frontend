export default function getData () {
  var test = 'speech-bubble.svg'
  return [
    { index: 1, title: '품질일보', daily: '3월10일 수요일', dailyInfo: 'speech-bubble', isExpandable: true },
    { index: 2, title: '주요품질문제점', daily: '3월10일 수요일', dailyInfo: 'checked', isExpandable: true },
    { index: 3, title: '1차 검사 클린 합격률', daily: '98%', dailyInfo: 'bar-chart', isExpandable: true },
    { index: 4, title: '검사재검률', daily: '0.2%', dailyInfo: 'magnifying-glass', isExpandable: true },
    { index: 5, title: '선주 검사 위임률', daily: '13%', dailyInfo: 'checked', isExpandable: true },
    { index: 6, title: 'NDT 합격률', daily: '98%', dailyInfo: 'like', isExpandable: true }
  ]
}
