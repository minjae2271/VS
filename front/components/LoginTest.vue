<template>
  <div id="naverIdLogin">네이버 로그인</div>
</template>

<script>
export default {
  mounted() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "AgLMoPpLVWI4wuTDo22X",
      callbackUrl: `http://localhost:3000/`,
      isPopup: false /* 팝업을 통한 연동처리 여부 */,
      loginButton: {
        color: "green",
        type: 3,
        height: 60
      } /* 로그인 버튼의 타입을 지정 */
    });

    /* 설정정보를 초기화하고 연동을 준비 */
    naverLogin.init();
  },
  head: {
    script: [
      { src: "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js" }
    ]
  }
};
</script>

<style></style>
