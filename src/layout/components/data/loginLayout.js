export default {
  bgImage: require(`@/assets/images/bg/background.png`), //2021-10-13 by lyj
  layout: {
    columns: 10,
    header: {
      row: [1, 1],
      col: [1, 10],
      class: 'pb-1',
      title: {
        label: 'IGns Framework'
      }
    },
    domainSelection: { row: [2, 1], col: [2, 8], class: '' },
    id: { row: [3, 1], col: [2, 8], class: '' },
    pw: { row: [4, 1], col: [2, 8], style: 'height: 2.5rem;' },
    autologin: { row: [5, 1], col: [2, 3], class: '', style: 'margin-top: 0.5rem; padding-bottom: 1.5rem;', use: true },
    // register: { row: [4, 1], col: [6, 4], class: 'mt-2 pb-6', use: false },
    login: { row: [6, 1], col: [2, 8], class: '' },
    footer: {
      row: [7, 1],
      col: [1, 10],
      class: 'pt-10',
      isOnlyImage: true,
      ciImage: {
        src: require('@/assets/images/ci/topLogo.png'), //2021-10-13 by lyj
        style: 'display: inline-block; object-position: center; margin: 10% 30% 10% 41%;',
        class: ''
      }
    }
  }
}
