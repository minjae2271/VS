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
              :rules="emailRules"
            />
            <v-text-field
              label="Password"
              v-model="pw"
              type="password"
              required
              solo
              :rules="pwRules"
            />
          </v-container>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              type="submit"
              :disabled="!valid"
              @click="showLoginDialog"
            >
              로그인!
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
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
      pw: "",
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
          nickname: "VS"
        });
      } else {
        alert("로그인 실패! ㅠㅠ");
      }
    }
  }
};
</script>

<style></style>
