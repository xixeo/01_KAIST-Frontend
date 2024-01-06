<template>
  <div class="lg:w-2/3 xl:w-2/3 m-auto my-10 lg:my-20 px-2">
    <h1 class="text-lg lg:text-3xl">서비스 이용에 불편을 드려 죄송합니다.<br>요청하신 페이지를 찾을 수 없습니다.</h1>
    <p class="text-center my-10 text-base word_keep">
      요청하신 페이지의 주소가 잘못 입력되었거나,<br><br>
      페이지 주소의 변경 혹은 삭제로 인해 현재 사용하실 수 없습니다.<br><br>
      입력하신 페이지의 주소가 정확한지 다시 한번 확인 해주시기 바랍니다.
    </p>
    <button class="m-2 btn_small_01 lg:btn_big_01" @click="back()"><span>이전페이지</span></button>
    <button class="m-2 btn_small_02 lg:btn_big_02" @click="goMain()"><span>메인으로</span></button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    back () {
      this.$router.go(-1)
    },
    goMain () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.word_keep {
  word-break: keep-all;
}
</style>
