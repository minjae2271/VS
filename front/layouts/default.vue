<template>
  <v-app>
    <!-- nav bar -->
    <v-navigation-drawer app temporary absolute v-model="drawer">
      <nav-drawer :page="currentPage"></nav-drawer>
    </v-navigation-drawer>
    <v-app-bar app>
      <!-- title -->
      <v-app-bar-title id="app-bar-title">
        <nuxt-link to="/">Murpick</nuxt-link>
      </v-app-bar-title>
      <!-- postTypes -->
      <v-toolbar-items>
        <v-container
          :style="{ display: 'flex', alignItems: 'center', width: '200px' }"
        >
          <v-btn
            text
            :style="{ display: 'flex', alignItems: 'center' }"
            @click="toggleNav(1)"
          >
            밸런스
          </v-btn>
          <v-btn
            text
            :style="{ display: 'flex', alignItems: 'center' }"
            @click="toggleNav(2)"
          >
            랜덤
          </v-btn>
        </v-container>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
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
          <v-spacer></v-spacer>
          <v-btn
            text
            nuxt
            to="/createpost"
            :style="{ display: 'flex', alignItems: 'center' }"
          >
            글쓰기
          </v-btn>
          <v-avatar color="blue" size="48">
            <img
              v-if="me.profile_image_url"
              :src="me.profile_image_url"
              alt="me.nickname"
            />
            <span v-else>{{ me.nickname }}</span>
          </v-avatar>
          <v-menu offset-y bottom center>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon x-large v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  {{ me.email }}
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-content>
                  <v-btn
                    text
                    nuxt
                    to="/profile"
                    :style="{ display: 'flex', alignItems: 'center' }"
                  >
                    <div>프로필</div>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-btn nuxt to="/" text @click="logOut">
                    <div>로그아웃</div>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-container>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-row fluid justify="center">
        <v-col>
          <nuxt />
        </v-col>
      </v-row>
      <v-btn
        color="blue darken-2"
        dark
        fab
        bottom
        right
        fixed
        @click="$vuetify.goTo(0)"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <login-form
        :dialogprop="showDialog"
        v-on:dialogChange="showLoginDialog"
      />
    </v-main>

    <v-footer>
      <versus-footer />
    </v-footer>
  </v-app>
</template>

<script>
import LoginForm from '~/components/LoginForm';
import VersusFooter from '~/components/VersusFooter';
import NavDrawer from '~/components/NavDrawer';

export default {
  components: {
    LoginForm,
    VersusFooter,
    NavDrawer
  },
  data() {
    return {
      showDialog: false,
      drawer: false,
      currentPage: 0
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
      this.$store.dispatch('users/logOut');
    },
    toggleNav(currentPage) {
      this.drawer = !this.drawer;
      this.currentPage = currentPage;
    }
  }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

a {
  /* color: inherit;
  text-decoration: none; */
  display: block;
}

* {
  box-sizing: border-box;
}

.profile-menu-avatar {
  justify-content: center;
}

a,
a:visited {
  text-decoration: none;
  color: inherit;
}
</style>
