<template>
  <v-app>
    <div>
      <v-toolbar dark color="green">
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
            <v-btn text nuxt to="/signup" :style="{ display: 'flex', alignItems: 'center' }">
              회원가입
            </v-btn>
          </v-container>
          <v-container
            v-else
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            <div>{{ me.nickname }}님, 반가워요.</div>
            <v-btn text @click="logOut">
              로그아웃
            </v-btn>
          </v-container>
        </v-toolbar-items>
      </v-toolbar>
      <v-row no-gutters>
        <v-col cols="12" md="4"> </v-col>
        <v-col cols="12" md="8">
          <nuxt />
        </v-col>
      </v-row>
    </div>
    <login-form :dialogprop="showDialog" v-on:dialogChange="showLoginDialog" />
  </v-app>
</template>

<script>
import LoginForm from "~/components/LoginForm";
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      showDialog: false
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    showLoginDialog() {
      this.showDialog = !this.showDialog;
    },
    logOut() {
      this.$store.dispatch("users/logOut");
      alert("다음에 봐요!");
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  }
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
  display: block;
}
</style>
