<template>
  <div>
    <div id="naverIdLogin"></div>
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
      loginButton: {
        color: "green",
        type: 3,
        height: 50
      }
    });
    this.naverLogin.init();
  },
  methods: {
    kakaoLogin() {
      Kakao.init("69b08c096cea52c0d39b7fb5fab9d569");
      console.log(Kakao.isInitialized());
      Kakao.Auth.authorize({
        redirectUri: "http://localhost:3000/login_callback_kakao"
      });
    }
  }
};
</script>

<style></style>
