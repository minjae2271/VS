<template>
  <div class="text-center">
    <v-dialog v-model="dialogprop" @click:outside="showLoginDialog" width="500">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->

      <v-card>
        <v-card-title class="headline grey lighten-1">
          로그인
        </v-card-title>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-container>
            <v-text-field
              label="Email"
              v-model="email"
              type="email"
              required
              solo
              clearable
              tabindex="1"
              :rules="emailRules"
            />
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              required
              solo
              tabindex="2"
              :rules="pwRules"
            />
          </v-container>

          <v-container>
            <v-card-text>
              소셜 로그인으로 간편하게 로그인 하세요.
            </v-card-text>
          </v-container>

          <v-container>
            <v-row justify="center">
              <social-login @closeModal="onSocialLogin" />
            </v-row>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              type="submit"
              :disabled="!valid"
              @click="onSubmitForm"
            >
              로그인!
            </v-btn>
          </v-card-actions>
        </v-form>
        <div class="sign-up">
          <p>
            아직 회원이 아니세요? 
          </p>
          <div @click="toSignUp">
            <nuxt-link to="/signup"><p> 계정생성</p></nuxt-link>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SocialLogin from "~/components/SocialLogin.vue";

export default {
  components: { SocialLogin },
  props: {
    dialogprop: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "이메일을 입력해주세요",
        v => /.+@.+\..+/.test(v) || "이메일 형식을 지켜주세요."
      ],
      pwRules: [v => !!v || "비밀번호를 입력해주세요"]
    };
  },
  methods: {
    showLoginDialog() {
      this.$emit("dialogChange");
      this.$refs.form.reset();
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("users/logIn", {
          email: this.email,
          password: this.password,
        });
        this.$emit("dialogChange");
        this.$refs.form.reset();
      } else {
        alert("로그인 실패! ㅠㅠ");
      }
    },
    onSocialLogin(payload) {
      this.$store.dispatch("users/logIn", {
        email: payload.email,
        nickname: payload.nickname,
        profile_image_url: payload.profileImage
      });
      this.$emit("dialogChange");
    },
    toSignUp(){
      this.$emit("dialogChange");
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.sign-up{
  display: flex;
  justify-content: center;
}
</style>
