<script>
import router from '@/router'

// Logout 정의 부분
// 유저 정보와 토큰을 삭제한 이후, 화면을 재갱신한다.
// 자동적으로 /login 화면으로 이동
export default {
  name: 'logout',
  created () {
    this.$store.dispatch('Logout').then(() => {
      //location.reload()
      //router.replace('/login')
      this.$router.push("/login")

    })
  },
  render: (h) => h()
}
</script>
