<template>
  <v-container>
      <v-card>
          <v-card-title>
              회원가입
          </v-card-title>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
              <v-text-field 
                label="Email"
                v-model="email"
                type="email"
                required
                clearable
                :rules="emailRules"/>
            <v-text-field 
                v-model="password"
                :rules="passwordRules"
                label="Password"
                type="password"
                required
            />
            <v-text-field
                v-model="passwordCheck"
                :rules="passwordCheckRules"
                label="Password Check"
                type="password"
                required
            />
            <v-text-field 
                v-model="nickname"
                :rules="nicknameRules"
                label="nickname"
                type="nickname"
                required
            />
            <v-btn type="submit">가입</v-btn>
        </v-form>
      </v-card>
      <v-container>
          <social-login />
      </v-container>
  </v-container>
</template>

<script>
import SocialLogin from '~/components/SocialLogin'

export default {
    components: {
        SocialLogin,
    },
    data(){
        return {
            valid: false,
            email: '',
            password: '',
            passwordCheck: '',
            nickname: '',
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
        }
    },
    computed: {
        me(){
            return this.$store.state.users.me;
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
                    })
                }
                catch{
                    alert('회원가입 실패')
                }
            } else {
                alert('회원가입 양식을 확인해주세요')
            }
        },
    }
}
</script>

<style>

</style>