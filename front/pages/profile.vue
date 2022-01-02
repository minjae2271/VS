<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>{{ me.nickname }}님 프로필</v-subheader>
      </v-container>
    </v-card>
    <template>
      <v-tabs v-model="tabs">
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <!-- User Info -->
        <v-tab-item>
          <profile-info></profile-info>
        </v-tab-item>
        <!-- User Pick Post List -->
        <v-tab-item>
          <v-list dense>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in mainPosts" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-tab-item>
        <!-- Comment List -->
        <v-tab-item> </v-tab-item>
      </v-tabs-items>
    </template>
  </v-container>
</template>

<script>
import CommentsList from '~/components/CommentsList';
import UserCommentsList from '~/components/UserCommentsList';

export default {
  components: { CommentsList, UserCommentsList },
  data() {
    return {
      tabs: null,
      items: [
        { tab: '회원 정보', content: 'post' },
        { tab: '작성 글', content: 'comment' }
      ],
      selectedItem: 1,
      post_items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' }
      ]
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me == null
        ? ''
        : this.$store.state.users.me;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts.filter(post => post != null);
    },
    comments() {
      return this.$store.state.posts.comments;
    },
    profile() {
      return this.$store.state.profile.myProfile;
    }
  },
  async fetch({ store }) {
    await store.dispatch('users/loadUser');
    await store.dispatch('posts/loadUserPosts', {
      userId: store.state.users.me.id,
      reset: true
    });
    console.log('profile.vue-fetch 1', store.state.users.me.id);
    await store.dispatch('posts/loadUserComments', {
      userId: store.state.users.me.id,
      reset: true
    });
    await store.dispatch('profile/loadProfile', {
      myId: store.state.users.me.id,
      reset: true
    });
    console.log('profile.vue - fetch');
    return;
  },
  middleware: 'authenticated',
  methods: {}
};
</script>

<style></style>
