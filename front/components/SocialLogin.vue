<template>
  <div id="naverIdLogin" @click="onClickNaverLogin"></div>
</template>

<script>
export default {
  data() {
    return {
      naverLogin: {}
    };
  },
  mounted() {
    this.naverLogin = new naver.LoginWithNaverId({
      clientId: "AgLMoPpLVWI4wuTDo22X",
      callbackUrl: `http://localhost:3000/loginCallback`,
      isPopup: true,
      callbackHandle: true,
      loginButton: {
        /* 로그인 버튼의 타입을 지정 */
        color: "green",
        type: 3,
        height: 50
      }
    });
    this.naverLogin.init();
  },
  methods: {
    onClickNaverLogin() {
      const that = this;
      this.naverLogin.getLoginStatus(function(status) {
        if (status) {
          const email = that.naverLogin.user.getEmail();
          const nickname = that.naverLogin.user.getNickName();
          // var profileImage = naverLogin.user.getProfileImage();
          // var birthday = naverLogin.user.getBirthday();
          // var age = naverLogin.user.getAge();
          // var uniqId = naverLogin.user.getId();
          console.log(email, nickname);
          that.$emit("closeModal", { email, nickname });
        } else {
          console.log("AccessToken이 올바르지 않습니다.");
        }
      });
    }
  }
};
</script>

<style></style>
