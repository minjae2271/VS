<template>
  <div>
  <div>카카오 로그인</div>
  </div>
</template>

<script>
export default {
    mounted(){
        const that = this;

        Kakao.init('69b08c096cea52c0d39b7fb5fab9d569');
        Kakao.Auth.login({
        scope: 'profile, account_email, gender',
        success(authObj){
            console.log(authObj);
            Kakao.API.request({
                url: '/v2/user/me',
                success(res){
                    Kakao.Auth.setAccessToken(authObj.access_token);
                    // console.log(authObj.access_token);
                    // console.log(this)
                    let email = res.kakao_account.email
                    let nickname = res.kakao_account.profile.nickname
                    let profile_image_url = res.kakao_account.profile.profile_image_url

                    try {
                        that.$store.dispatch('users/logIn', {
                            id: email,
                            nickname: nickname,
                            profile_image_url: profile_image_url
                        });
                    } catch(err){
                        console.error(err)
                    }
                },
                fail(err){
                    console.error(err);
                },
                always(){
                    that.$router.push({
                        path: '/profile',
                    })
                }
            });
        },
        fail(err){
            console.error(err);
        }
        });
    },
    data(){
        return {
          
        }
    }
}
</script>

<style>

</style>