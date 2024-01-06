export default function getData () {
  var test = 'map01.svg'
  return [
    { index: 1, title: '본사 MAP', map: require(`@/assets/images/map/${test}`), isExpandable: true },
    { index: 2, title: '해양 MAP', map: require('@/assets/images/map/map02.svg'), isExpandable: true },
    { index: 3, title: '온산 MAP', map: require('@/assets/images/map/map03.svg'), isExpandable: true },
    { index: 4, title: '용연 MAP', map: require('@/assets/images/map/map04.svg'), isExpandable: true }
  ]
}
