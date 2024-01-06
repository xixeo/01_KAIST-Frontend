export default function getData() {
  return {
    theme: {
      columns: 2,
      editorList: [
        {
          id: 'theme',
          title: {
            label: 'theme',
            width: '20%' // 라벨 길이
            // class: '', // title class
            // style: '' // title style
          },
          value: '',
          option: {
            type: 'select', // select/input
            kind: 'default', // default/filter
            placeholder: '테마',
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
    },
    devExtreme: {
      columns: 2,
      editorList: [
        {
          id: 'devExtreme',
          title: {
            label: 'devExtreme',
            width: '30%' // 라벨 길이
            // class: '', // title class
            // style: '' // title style
          },
          value: '',
          option: {
            type: 'select', // select/input
            kind: 'default', // default/filter
            placeholder: 'devExtreme 테마',
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
    },
    elementui: {
      columns: 2,
      editorList: [
        {
          id: 'elementui',
          title: {
            label: 'elementui',
            width: '30%' // 라벨 길이
            // class: '', // title class
            // style: '' // title style
          },
          value: '',
          option: {
            type: 'select', // select/input
            kind: 'default', // default/filter
            placeholder: 'elementui 테마',
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
    },
    echart: {
      columns: 2,
      editorList: [
        {
          id: 'echart',
          title: {
            label: 'echart',
            width: '20%' // 라벨 길이
            // class: '', // title class
            // style: '' // title style
          },
          value: '',
          option: {
            type: 'select', // select/input
            kind: 'default', // default/filter
            placeholder: 'echart 테마',
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
}
