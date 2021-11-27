<template>
  <v-container>
    <v-card
      flat
      :class="comment.parent_id !== 0 ? 'ml-15' : ''"
    >
      <v-container>
        <v-row>
          <v-col class="pa-0" cols="1">
            <v-card
              :class="comment.commentType === 0 ? 'red lighten-4' : 'blue lighten-4'"
              width="100%"
              height="100%"
              flat
            >
            </v-card>
          </v-col>
          <v-col class="ml-1" cols="10">
            <v-row>
              <v-col class="pa-0">
                <v-list-item-avatar class="ma-0" color="teal">
                  <span>{{ comment.User.nickname[0] }}</span>
                </v-list-item-avatar>
              </v-col>
              <v-col class="pa-0">
                <v-list-item-content class="pa-0">
                  <v-list-item-title>{{ comment.User.nickname }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="ml-auto" cols="3" align-self="center">
                <v-container>
                  <v-row align="center" justify="end">
                    <v-col class="pa-0" cols="2">
                      <v-icon
                        v-if="me != null && me.id === comment.User.id"
                        @click="removeComment(post.id, comment.id)"
                      >
                        mdi-delete
                      </v-icon>
                    </v-col>
                    <v-col class="pt-3" cols="2">
                      <v-icon
                        v-if="me != null && me.id === comment.User.id"
                        @click="toggleEditForm"
                      >
                        mdi-square-edit-outline
                      </v-icon>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <template v-if="editForm">
              <comment-form-update
                :comment="comment"
                :type="'edit'"
                @toggleEditForm="toggleEditForm"
              />
            </template>
            <template v-else>
              <v-card-text class="pa-0 mt-3">
                <pre>{{ comment.content }}</pre>
              </v-card-text>
            </template>
            <v-card-actions class="pa-0">
              <v-spacer></v-spacer>
              <v-btn text @click="onClickThumbup">
                <v-icon dense>{{ thumbupIcon }}</v-icon>
              </v-btn>
              <!-- <v-btn text @click="onClickThumbdown">
                <v-icon dense>{{ thumbdownIcon }}</v-icon>
              </v-btn> -->
              <!-- 답글달기 버튼 -->
              <v-btn @click="displaySubCommentForm">
                답글달기
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
    </v-card>
    <template v-if="subCommentForm">
      <sub-comment-form
        :commentId="comment.id"
        :postId="post.id"
        :groupId="comment.group_id"
        :page="page"
      />
    </template>
  </v-container>
</template>

<script>
import CommentFormUpdate from './CommentFormUpdate.vue';
import SubCommentForm from './SubCommentForm.vue';

export default {
  components: {
    CommentFormUpdate,
    SubCommentForm
  },
  props: {
    post: {
      type: Object,
      required: false
    },
    page: {
      type: Number,
      required: true
    },
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contents: [this.post.content1, this.post.content2, this.post.content3],
      editForm: false,
      subCommentForm: false
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    liked() {
      const me = this.$store.state.users.me;
      return (this.comment.Likers || []).find(v => v.id === (me && me.id));
    },
    disliked() {
      const me = this.$store.state.users.me;
      return (this.comment.Dislikers || []).find(v => v.id === (me && me.id));
    },
    thumbupIcon() {
      return this.liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline';
    },
    thumbdownIcon() {
      return this.disliked ? 'mdi-thumb-down' : 'mdi-thumb-down-outline';
    }
  },
  created() {
    // this.$store.dispatch('posts/countLikers', { commentId: this.comment.id });
  },
  methods: {
    toggleEditForm() {
      this.editForm = !this.editForm;
    },
    async removeComment(postId, commentId) {
      await this.$store.dispatch('posts/removeComment', { postId, commentId });
    },
    onClickThumbup() {
      if (!this.me) {
        return alert('need login');
      }
      if (this.liked) {
        return this.$store.dispatch('posts/unlikeComment', {
          commentId: this.comment.id,
          postId: this.comment.PostId
        });
      }
      if (this.disliked) {
        this.$store.dispatch('posts/undislikeComment', {
          commentId: this.comment.id,
          postId: this.comment.PostId
        });
      }
      return this.$store.dispatch('posts/likeComment', {
        commentId: this.comment.id,
        postId: this.comment.PostId
      });
    },
    onClickThumbdown() {
      if (!this.me) {
        return alert('need login');
      }
      if (this.disliked) {
        return this.$store.dispatch('posts/undislikeComment', {
          commentId: this.comment.id,
          postId: this.comment.PostId
        });
      }
      if (this.liked) {
        this.$store.dispatch('posts/unlikeComment', {
          commentId: this.comment.id,
          postId: this.comment.PostId
        });
      }
      return this.$store.dispatch('posts/dislikeComment', {
        commentId: this.comment.id,
        postId: this.comment.PostId
      });
    },
    displaySubCommentForm() {
      this.subCommentForm = !this.subCommentForm;
    }
  }
};
</script>

<style></style>
