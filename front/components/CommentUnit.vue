<template>
  <v-container>
    <!-- {{ comment }} -->
    <v-card
      flat
      :color="comment.commentType == 0 ? 'red lighten-4' : 'blue lighten-4'"
    >
      <v-container>
        <v-row class="d-flex">
          <v-col cols="1">
            <v-list-item-avatar color="teal">
              <span>{{ comment.User.nickname[0] }}</span>
            </v-list-item-avatar>
          </v-col>
          <v-col>
            <v-list-item-content>
              <v-list-item-title>{{ comment.User.nickname }}</v-list-item-title>
              <span>{{ contents[comment.commentType] }}</span>
              <p>{{ comment.commentType }}</p>
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
                <v-col class="pa-0" cols="2">
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
        <v-card-text class="pt-3">
          <pre>{{ comment.content }}</pre>
        </v-card-text>
      </v-container>
      <v-divider></v-divider>
    </v-card>

    <comment-form-update
      v-if="editForm"
      :comment="comment"
      :type="'edit'"
      @toggleEditForm="toggleEditForm"
    />
  </v-container>
</template>

<script>
import CommentFormUpdate from './CommentFormUpdate.vue';
export default {
  components: {
    CommentFormUpdate
  },
  props: {
    post: {
      type: Object,
      required: false
    },
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      contents: [this.post.content1, this.post.content2, this.post.content3],
      editForm: false
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    toggleEditForm() {
      this.editForm = !this.editForm;
    },
    async removeComment(postId, commentId) {
      await this.$store.dispatch('posts/removeComment', { postId, commentId });
    }
  }
};
</script>

<style></style>
