export default function () {
  // @vue/component
  return {
    methods: {
      dispatchResize () {
        window.dispatchEvent(new Event('resize'))
      }
    }
  }
}
