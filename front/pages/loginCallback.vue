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
      isPopup: false /* 팝업을 통한 연동처리 여부 */
    });

    naverLogin.init();

    window.addEventListener("load", function() {
      naverLogin.getLoginStatus(function(status) {
        if (status) {
          /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
          var email = naverLogin.user.getEmail();
          if (email == undefined || email == null) {
            alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
            /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
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
