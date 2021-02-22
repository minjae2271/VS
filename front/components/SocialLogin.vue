<template>
<div>
  <div id="naverIdLogin" @click="onClickNaverLogin"></div>
  <div id="kakaoIdLogin" @click="kakaoLogin">
      <img
        src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
        width="230"
        height="50"
      />
  </div>
</div>
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
          console.log(that.naverLogin.user);
          that.$emit("closeModal", { email, nickname });
        } else {
          console.log("AccessToken이 올바르지 않습니다.");
        }
      });
    },
    kakaoLogin(){
        Kakao.init('69b08c096cea52c0d39b7fb5fab9d569');
        console.log(Kakao.isInitialized())
        Kakao.Auth.authorize({
          redirectUri: 'http://localhost:3000/login_callback_kakao',
        })
    },
  }
};
</script>

<style></style>
