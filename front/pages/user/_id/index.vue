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
        <v-tab-item>
          <v-container class="post-card-box grey lighten-5">
            <v-row class="post-card-row" no-gutters>
              <v-col
                class="post-card-col"
                v-for="(post, i) in mainPosts"
                :key="i"
                cols="12"
                sm="6"
                md="3"
              >
                <post-card elevation="4" :post="post" />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <user-comments-list :comments="userComments" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </v-container>
</template>

<script>
import UserCommentsList from '~/components/UserCommentsList';
export default {
  components: { UserCommentsList },
  data() {},
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainPosts() {
      //   return this.$store.state.posts.mainPosts;
      return this.$store.state.posts.mainPosts.filter(post => post != null);
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('users/loadUser');
    await store.dispatch('posts/loadPosts');
    await store.dispatch('posts/loadUserPosts', {
      userId: params.id,
      reset: true
    });
    // await store.dispatch('posts/loadOther');
    return;
  },
  data() {
    return {
      tabs: null,
      items: [
        { tab: '참여 글', content: 'post' },
        { tab: '작성 댓글', content: 'comment' }
      ]
    };
  },
  methods: {}
};
</script>

<style></style>
