<template>
  <v-layout column>
    로그인 진행 중입니다. 잠시 후 창이 닫힙니다.
  </v-layout>
</template>

<script>
export default {
  layout: "empty",
  mounted() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "AgLMoPpLVWI4wuTDo22X",
      callbackUrl: `http://localhost:3000/loginCallback`,
      isPopup: false,
      callbackHandle: true
    });

    naverLogin.init();

    window.addEventListener("load", function() {
      naverLogin.getLoginStatus(function(status) {
        if (status) {
          var email = naverLogin.user.getEmail();
          if (email == undefined || email == null) {
            alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
            naverLogin.reprompt();
            return;
          }
          window.self.close();
        } else {
          console.log("callback 처리에 실패하였습니다.");
        }
      });
    });
  }
};
</script>

<style></style>
