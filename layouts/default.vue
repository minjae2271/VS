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
          <v-btn text @click="showLoginDialog">
            <div>로그인</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row no-gutters>
        <v-col cols="12" md="4"> </v-col>
        <v-col cols="12" md="8">
          <nuxt />
        </v-col>
      </v-row>
    </div>
    <login-form :dialog="showDialog" v-on:dialogChange="showLoginDialog" />
  </v-app>
</template>

<script>
import LoginForm from "~/components/LoginForm";
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    showLoginDialog() {
      this.showDialog = !this.showDialog;
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