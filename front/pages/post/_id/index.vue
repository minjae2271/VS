<template>
  <v-container v-if="post">
    <v-card class="mx-auto" max-width="100%">
      <v-container class="post-title">
        <h2>
          <!-- 게시글 제못 -->
          {{ post.title }}
        </h2>
        <!-- 작성자 정보 -->
        <div class="post-info d-flex pa-1 mt-2">
          <!-- 닉네임 -->
          <div class="post-info-nickname d-felx align-center">
            <i class="fas fa-user ml-2"></i>
            <small v-if="post.User">{{ post.User.nickname}}</small>
            <small v-else>사라진 사용자</small>
          </div>
          <!-- 조회수 -->
          <div class="post-info-view d-flex align-center">
            <i class="fas fa-search ml-4"></i>
            <small class="ml-1">{{post.view_cnt}}</small>
          </div>
        </div>
        <div class="post-info-view d-flex mt-2 align-center justify-end">
          <i class="far fa-clock ml-2 mr-1"></i>
          <small>{{post.createdAt}}</small>
        </div>
      </v-container>
      <v-container class="post-container">
        <div class="test">test</div>
        <!-- <v-row class="post-row fill-height" fluid no-gutters v-if="post.Images.length === 2"> -->
        <v-row class="post-row fill-height" fluid no-gutters>  
          <v-col cols="6">
            <v-container class="wrapper rounded">
              <v-img
                :src="post.Images[0].src"
                class="post-img rounded"
                @click="onPickContent(0)"
              />
            </v-container>
          </v-col>
          <v-col cols="6">
            <v-container class="wrapper rounded">
              <v-img
                aspect-ratio="16/9"
                :src="post.Images[1].src"
                class="post-img rounded"
                @click="onPickContent(1)"
              />
            </v-container>
          </v-col>
        </v-row>
        <!-- <v-row class="post-row" no-gutters v-else-if="post.Images.length === 1">
          <v-container>
            <v-img contain max-height="300" :src="post.Images[0].src" />
          </v-container>
        </v-row> -->
      </v-container>
      <v-container class="content-name">
        <v-btn class="content-name-1 py-3" depressed color="red lighten-4">
          <h2 class="text-center" @click="onPickContent(0)">
            {{ post.content1 }}
          </h2>
        </v-btn>
        <v-btn class="content-name-2 py-3" depressed color="blue lighten-4">
          <h2 class="text-center" @click="onPickContent(1)">
            {{ post.content2 }}
          </h2>
        </v-btn>
      </v-container>
      <v-container class="content-condition">
        <p>{{ post.condition }}</p>
      </v-container>
      <v-card-actions>
        <v-btn color="orange" text>
          공유하기
        </v-btn>

        <!-- <v-btn color="orange" text>
          결과보기
        </v-btn> -->
        <v-spacer></v-spacer>
        <v-btn
          color="orange"
          text
          nuxt
          :to="'/post/' + post.id + '/updatePost'"
        >
          수정하기
        </v-btn>
        <v-btn v-if="canDelete" color="orange" text @click="removePost()">
          삭제하기
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- 댓글 입력 form -->
    <comment-form :post-id="post.id" :page="page"/>
    <v-card class="mt-5" flat>
      <v-icon>mdi-message-text</v-icon>
      {{ post.countComments }}개의 댓글
    </v-card>
    <v-container>
      <v-row>
        <v-col>
          <comments-list :post="post" :page="page"/>
        </v-col>
      </v-row>
      <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pageLength || 0" 
        :total-visible="5"
        @input="loadComments()"
      >
      </v-pagination>
  </div>
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
    canDelete() {
      const me = this.$store.state.users.me;
      return !!(this.post.UserId === (me && me.id));
    },
    pageLength() { //pagination에 표시되는 숫자들
      const post = this.$store.state.posts.mainPosts.find(
        v => v.id === parseInt(this.$route.params.id, 10)
      );
      const commentsLen = post.countComments; //comment의 총 길이
      const pageLen = parseInt(commentsLen % 10) === 0 ? parseInt(commentsLen / 10) : parseInt(commentsLen / 10 + 1);
      // 10 => 한번에 불러오는 댓글의 갯수 (limit), 10으로 나누었을 때 나머지가 있으면 페이지 ++1
      return pageLen;
    },
  },
  async fetch({ store, params }) {
    await store.dispatch('posts/viewCnt', { postId: params.id });
    await store.dispatch('posts/loadPost', params.id);
    // await store.dispatch('posts/loadPicks', { postId: params.id });
    await store.dispatch('posts/countComments', {postId: params.id});
    return await store.dispatch('posts/loadComments', { postId: params.id, page: 1});
  },
  data() {
    return {
      page: 1
    };
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
    },
    async loadComments() {
      await this.$store.dispatch('posts/loadComments', { postId: this.$route.params.id, page: this.page });
    },
  }
  //middleware: "authenticated",
};
</script>

<style scoped>
.post-title h2 {
  text-align: left;
}

.post-info
{
  background-color: cornflowerblue;
}

.post-container
{
  height: 40vh;
}

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

.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: cornflowerblue;
}

.post-row {
  max-height: 400px;
  min-height: 200px;
}

.post-img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* display: block; */
  object-fit: fill;
  
}

.test
{
  width: 10vw;
  height: 10vh;
  border: 1px solid gray;
  background-color: aquamarine;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
