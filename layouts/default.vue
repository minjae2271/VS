<template>
  <v-app>
    <div>
      <v-app-bar dark color="green" fixed>
        <v-toolbar-title>
          <nuxt-link to="/">Versus</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-text-field
            hide-details
            label="search"
            prepend-icon="mdi-magnify"
            :style="{ display: 'flex', alignItems: 'center' }"
          />
          <v-container
            v-if="!me"
            :style="{ display: 'flex', alignItems: 'center', width: '200px' }"
          >
            <v-btn text @click="showLoginDialog">
              <div>로그인</div>
            </v-btn>
            <v-btn
              text
              nuxt
              to="/signup"
              :style="{ display: 'flex', alignItems: 'center' }"
            >
              회원가입
            </v-btn>
          </v-container>
          <v-container
            v-else
            :style="{ display: 'flex', alignItems: 'center', width: '200px' }"
          >
            <v-btn
              text
              nuxt
              to="/profile"
              :style="{ display: 'flex', alignItems: 'center' }"
            >
              <div>프로필</div>
            </v-btn>
            <v-btn text @click="logOut">
              <div>로그아웃</div>
            </v-btn>
          </v-container>
        </v-toolbar-items>
      </v-app-bar>
      <v-row no-gutters justify="center">
        <v-col>
          <nuxt />
        </v-col>
      </v-row>
    </div>
    <login-form :dialogprop="showDialog" v-on:dialogChange="showLoginDialog" />
    <versus-footer />
  </v-app>
</template>

<script>
import LoginForm from "~/components/LoginForm";
import VersusFooter from "~/components/VersusFooter";
export default {
  components: {
    LoginForm,
    VersusFooter,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    showLoginDialog() {
      this.showDialog = !this.showDialog;
    },
    logOut() {
      this.$store.dispatch("users/logOut");
      this.$router.push({ path: "/" });
      alert("다음에 봐요!");
    },
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
  display: block;
}
</style>
