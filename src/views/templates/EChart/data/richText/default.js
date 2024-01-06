export default {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    data: ['즉시', '마케팅광고', '검색엔진', '이메일마케팅', '제휴광고', '비디오광고', '바이두', '구글', '필수', '기타'],
    textStyle: { color: '#fff' }
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        position: 'inner',
        fontSize: 14
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1548, name: '검색엔진' },
        { value: 775, name: '즉시' },
        { value: 679, name: '마케팅광고', selected: true }
      ]
    },
    {
      name: '접속 방법',
      type: 'pie',
      radius: ['45%', '60%'],
      labelLine: {
        length: 30
      },
      label: {
        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 4,

        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            align: 'center'
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0
          },
          b: {
            color: '#4C5058',
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 33
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [3, 4],
            borderRadius: 4
          }
        }
      },
      data: [
        { value: 1048, name: '바이두' },
        { value: 335, name: '즉시' },
        { value: 310, name: '이메일마케팅' },
        { value: 251, name: '구글' },
        { value: 234, name: '제휴광고' },
        { value: 147, name: '필수' },
        { value: 135, name: '비디오광고' },
        { value: 102, name: '기타' }
      ]
    }
  ]
}
