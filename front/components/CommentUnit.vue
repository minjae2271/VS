<template>
  <v-container>
    <v-card :class="comment.parent_id !== 0 ? 'ml-15' : ''" flat>
      <v-container
        style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25)"
      >
        <v-row>
          <div>
            <v-card
              :class="
                comment.commentType === 0 ? 'red lighten-4' : 'blue lighten-4'
              "
              style="border-bottom-left-radius: 10px;"
              width="36px"
              height="100%"
              flat
            >
            </v-card>
          </div>
          <v-col class="ml-0">
            <v-row>
              <v-col class="pl-0">
                <v-list-item-avatar color="teal" class="mr-1">
                  <span>{{ comment.User.nickname[0] }}</span>
                </v-list-item-avatar>
                <span>{{ comment.User.nickname }}</span>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            <template v-if="editForm">
              <comment-form-update
                :comment="comment"
                :type="'edit'"
                @toggleEditForm="toggleEditForm"
              />
            </template>
            <template v-else>
              <span class="pl-3">{{ comment.content }}</span>
            </template>
            <v-card-actions class="pa-0">
              <v-spacer></v-spacer>
              <v-btn text @click="onClickThumbup">
                <v-icon dense>{{ thumbupIcon }}</v-icon>
              </v-btn>
              <v-btn @click="displaySubCommentForm" plain>
                답글달기
              </v-btn>
              <!-- 댓글메뉴 버튼 -->
              <v-menu offset-y bottom center>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon x-large v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-icon
                  v-if="me != null && me.id === comment.User.id"
                  @click="removeComment(post.id, comment.id)"
                >
                  mdi-delete
                </v-icon>
                <v-icon
                  v-if="me != null && me.id === comment.User.id"
                  @click="toggleEditForm"
                >
                  mdi-square-edit-outline
                </v-icon>
              </v-menu>
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
