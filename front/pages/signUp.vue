<template>
  <v-container class="signup-container">
          <h1>
            MURPICK
          </h1>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
            <div class="signup-box">
              <div class="signup-input-box">
                <h3>
                  닉네임
                </h3>
                <div class="signup-nickname-box">
                    <v-text-field
                        class="signup-input" 
                        v-model="nickname"
                        :rules="nicknameRules"
                        label="nickname"
                        type="nickname"
                        required
                    /> 
                    <!-- <v-btn type="button" @click="checkNickname">
                        중복확인
                    </v-btn> -->
                </div>
              </div>
              <div class="signup-input-box">
                <h3>
                  이메일
                </h3>
                <div class="signup-email-box">
                    <v-text-field
                        class="signup-input"  
                        label="Email"
                        v-model="email"
                        type="email"
                        required
                        clearable
                        :rules="emailRules"/>
                    <v-btn type="button" @click="sendEmail">
                        인증하기
                    </v-btn>
                </div>
              </div>
              <div class="signup-input-box">
                <h3>
                  이메일 인증
                </h3>
                <div class="signup-emailcheck-box">
                    <v-text-field
                        class="signup-input" 
                        v-model="emailCheck"
                        :rules="emailCheckRules"
                        label="Email Check"
                        required
                    >
                    </v-text-field>
                </div>
              </div>
              <div class="signup-input-box">
                <h3>
                    비밀번호
                </h3>
                <div class="signup-password-box">
                <v-text-field 
                    class="signup-input" 
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                />
                </div>
              </div>
              <div class="signup-input-box">
                <h3>
                    비밀번호 확인
                </h3>
                <div class="signup-passwordcheck-box">
                    <v-text-field
                        class="signup-input" 
                        v-model="passwordCheck"
                        :rules="passwordCheckRules"
                        label="Password Check"
                        type="password"
                        required
                    />
                </div>
              </div>
            <v-btn type="submit">회원가입</v-btn>
          </div>
        </v-form>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            valid: false,
            email: '',
            password: '',
            passwordCheck: '',
            nickname: '',
            emailCheck: '',
            emailRules: [
                v => !!v || 'email required!',
                v => /.+@.+\..+/.test(v) || '이메일 형식으로 작성해주세요',
            ],
            passwordRules: [
                v => !!v || '비밀번호는 필수사항이에요.'
            ],
            passwordCheckRules: [
                v => !!v || '비밀번호 체크는 필수사항이에요.',
                v => this.password === v || '비밀번호가 불일치합니다.'
            ],
            nicknameRules: [
                v => !!v || '닉네임을 입력해주세요 ㅠㅠ'
            ],
            emailCheckRules: [
                v => !!v || '이메일 인증은 필수사항이에요.',
                v => this.authNum === v || '인증번호가 불일치합니다.'
            ]
        }
    },
    computed: {
        me(){
            return this.$store.state.users.me;
        },
        authNum(){
            return this.$store.state.users.authNum;
        }
    },
    watch: {
        me(newVal, oldVal){
            if(newVal){
                this.$router.push({
                    path: '/',
                })
            }
        }
    },
    methods: {
        async onSubmitForm(){
            if(this.$refs.form.validate()){
                try{
                    await this.$store.dispatch('users/signUp', {
                        email: this.email,
                        password: this.password,
                        nickname: this.nickname, 
                    });
                }
                catch{
                    alert('회원가입 실패');
                }
            } else {
                alert('회원가입 양식을 확인해주세요');
            }
        },
        async checkNickname(){
            console.log("nickname Check");
        },
        async sendEmail(){
            try{
                await this.$store.dispatch('users/sendEmail', {
                    email: this.email
                });
            }
            catch{
                alert('이메일 인증 실패');
            }
        }
    }
}
</script>

<style scoped>
.signup-container{
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.signup-nickname-box{
    display: inline-flex;
}
.signup-email-box{
    display: inline-flex;
}
.signup-input{
    width: 220px;
}
</style>