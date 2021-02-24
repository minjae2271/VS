<template>
  <v-layout column>
    로그인 진행 중입니다. 잠시 후 창이 닫힙니다.
  </v-layout>
</template>

<script>
export default {
  layout: "empty",
  mounted() {
    const that = this;

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
          var nickname = naverLogin.user.getNickName();
          var profileImage = naverLogin.user.getProfileImage();
          console.log(naverLogin.user);

          that.$store.dispatch("users/logIn", {
            id: email,
            nickname: nickname,
            profile_image_url: profileImage
          });

          if (email == undefined || email == null) {
            alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
            naverLogin.reprompt();
            return;
          }

          window.location.replace("http://localhost:3000");
        } else {
          console.log("callback 처리에 실패하였습니다.");
          console.log("AccessToken이 올바르지 않습니다.");
        }
      });
    });
  }
};
</script>

<style></style>
