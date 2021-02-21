<template>
  <div>
  <div>카카오 로그인</div>
  </div>

</template>

<script>
export default {
    mounted(){
        Kakao.init('69b08c096cea52c0d39b7fb5fab9d569');
        Kakao.Auth.login({
        scope: 'profile, account_email, gender',
        success(authObj){
            console.log(authObj);
            Kakao.API.request({
                url: '/v2/user/me',
                success(res){
                    const kakao_account = res.kakao_account;
                    console.log(kakao_account);
                    Kakao.Auth.setAccessToken(authObj.access_token);
                    console.log(authObj.access_token);
                    console.log(this)
                    let email = res.kakao_account.email
                    console.log(email)
                },
                fail(err){
                    console.error(err);
                }
            });
        },
        fail(err){
            console.error(err);
        }
        });
        // try {
        //     this.$store.dispatch('users/logIn', {
        //         id: this.id,
        //         nickname: this.nickname,
        //         profile_image_url: this.profile_image_url
        //     });
        // } catch(err){
        //     console.error(err)
        // }
    },
    data(){
        return {
            id: '',
            nickname: '',
            profile_image_url: ''
        }
    }
//   mounted() {
//     const qs = require('qs')
//     let accessToken = null
//     const parameter = {
//       grant_type: 'authorization_code',
//       client_id: '5bb891c05f068896313c14f58efd8d5e',
//       //redirect_uri: 'http://localhost:3000/login_callback_kakao',
//       code: this.$route.query.code
//     }
//     axios.post('https://kauth.kakao.com/oauth/token', qs.stringify(parameter), {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//         }
//       })
//       .then((res) => {
//         accessToken = res.data.access_token
//         console.log(accessToken);
//         this.$router.push({
//           path: '/signup',
//           params: {
//             accessToken
//           }
//         })
//       })
//   }
}
</script>

<style>

</style>