export default function getData() {
  return {
    columns: 2,
    editorList: [
      {
        id: 'template',
        title: {
          label: 'template',
          width: '20%' // 라벨 길이
          // class: '', // title class
          // style: '' // title style
        },
        value: '',
        option: {
          type: 'select', // select/input
          kind: 'default', // default/filter
          placeholder: '템플릿',
          width: '70%', // 박스 길이
          // class: 'bg-red-300',
          style: 'margin-top: -7px;'
        },
        itemList: [],
        position: {
          row: [1, 1],
          col: [1, 2]
          // class: 'bg-red-300 h-10'
        }
      }
    ]
  }
}
