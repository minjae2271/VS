<template>
  <v-container v-if="post">
    <v-card class="mx-auto" max-width="100%">
      <v-card-title class="post-title">
        <h3>
          {{ post.title }}
        </h3>
      </v-card-title>
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
        <h3 class="text-center" @click="onPickContent(0)">
          {{ post.content1 }}
        </h3>
        <h3 class="text-center" @click="onPickContent(1)">
          {{ post.content2 }}
        </h3>
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
    post() {
      return this.$store.state.posts.mainPosts.find(
        v => v.id === parseInt(this.$route.params.id, 10)
      );
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
    onPickContent(contentNum) {
      this.$store.dispatch('posts/pickContent', {
        postId: this.$route.params.id,
        contentNum
      });
    }
  }
  // middleware: "authenticated",
};
</script>

<style scoped>
.content-name {
  display: flex;
  padding-top: 0;
}

.content-name h3 {
  flex: 1;
}
</style>
