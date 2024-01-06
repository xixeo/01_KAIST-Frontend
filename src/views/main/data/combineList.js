export default function getData () {
  var test = 'ship_img01.png'
  return [
    { index: 1, title: 'P/C', subTitle: 'H2788 (3/10일)', number: 216, unit: '건', dDay: 'D-21', img: require(`@/assets/images/${test}`) },
    { index: 2, title: 'CONT', subTitle: 'H4161 (3/10일)', number: 11, unit: '건', dDay: 'D-31', img: require(`@/assets/images/ship_img02.png`) },
    { index: 3, title: 'LNG', subTitle: 'H3145 (3/10일)', number: 57, unit: '건', dDay: 'D-21', img: require(`@/assets/images/ship_img03.png`) },
    { index: 4, title: 'LPG', subTitle: 'H2788 (3/10일)', number: 34, unit: '건', dDay: 'D-10', img: require(`@/assets/images/ship_img04.png`) }
  ]
}
