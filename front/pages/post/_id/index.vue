<template>
  <v-container v-if="post">
    <p>{{ post }}</p>
    <v-card class="mx-auto" max-width="100%">
      <v-container class="post-title">
        <h3>
          {{ post.title }}
        </h3>
      </v-container>
      <v-container>
        <v-row no-gutters v-if="post.Images.length === 2">
          <v-col cols="6">
            <v-container>
              <v-img
                :src="`http://localhost:3005/${post.Images[0].src}`"
                height="400px"
                width="100%"
                @click="onPickContent(0)"
              />
            </v-container>
          </v-col>
          <v-col cols="6">
            <v-container>
              <v-img
                :src="`http://localhost:3005/${post.Images[1].src}`"
                height="400px"
                width="100%"
                @click="onPickContent(1)"
              />
            </v-container>
          </v-col>
        </v-row>
        <v-row no-gutters v-else-if="post.Images.length === 1">
          <v-container>
            <v-img
              :src="`http://localhost:3005/${post.Images[0].src}`"
              height="400px"
              width="100%"
            />
          </v-container>
        </v-row>
      </v-container>
      <v-container class="content-name">
        <v-btn class="content-name-1" text>
          <h2 class="text-center" @click="onPickContent(0)">{{ post.content1 }}</h2>
        </v-btn>
        <v-btn class="content-name-2" text>
          <h2 class="text-center" @click="onPickContent(1)">{{ post.content2 }}</h2>
        </v-btn>
      </v-container>
      <v-container class="content-condition">
        <p>{{ post.condition }}</p>
      </v-container>
      <v-card-actions>
        <v-btn color="orange" text>
          공유하기
        </v-btn>

        <v-btn color="orange" text>
          결과보기
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="orange"
          text
          nuxt
          :to="'/post/' + post.id + '/updatePost'"
        >
          수정하기
        </v-btn>
        <v-btn
          v-if="canDelete"
          color="orange"
          text
          @click="removePost()"
        >
          삭제하기
        </v-btn>
      </v-card-actions>
    </v-card>
    <comment-form :post-id="post.id" :comment-id="-1" :type="'add'" />
    <v-container>
      <v-row>
        <v-col>
          <comments-list :post="post" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  <div v-else>
    해당 아이디의 게시글이 존재하지 않습니다.
  </div>
</template>

<script>
// post/_id.vue
// po  /1   post/2    post
import CommentForm from '~/components/CommentForm';
import CommentsList from '~/components/CommentsList';

export default {
  components: {
    CommentsList,
    CommentForm
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    post() {
      return this.$store.state.posts.mainPosts.find(
        v => v.id === parseInt(this.$route.params.id, 10)
      );
    },
    canDelete(){
      const me = this.$store.state.users.me;
      return !!(this.post.UserId === (me && me.id));
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('posts/loadPost', params.id);
    await store.dispatch('posts/loadPicks', { postId: params.id });
    return await store.dispatch('posts/loadComments', { postId: params.id });
  },
  data() {
    return {};
  },
  methods: {
    async onPickContent(contentNum) {
      if (!this.me) {
        return alert('로그인이 필요합니다.');
      }
      await this.$store.dispatch('posts/pickContent', {
        postId: this.$route.params.id,
        contentNum
      });
    },
    async removeComment(postId, commentId) {
      await this.$store.dispatch('posts/removeComment', { postId, commentId });
    },
    async removePost() {
      await this.$store.dispatch('posts/removePost', {
        postId: this.$route.params.id
      });
    }
  },
  //middleware: "authenticated",
};
</script>

<style scoped>
.content-name {
  display: flex;
  padding-top: 0;
}

.content-name .content-name-1 {
  flex: 1;
}

.content-name .content-name-2 {
  flex: 1;
}

.content-name h3 {
  flex: 1;
}
</style>
