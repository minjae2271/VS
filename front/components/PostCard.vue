<template>
  <v-card class="mx-auto" max-width="100%">
    <v-card-title>
      <h3>
        <nuxt-link :to="'/post/'+post.id">
          {{ post.title }}
        </nuxt-link>
      </h3>
    </v-card-title>
    <v-container>
      <v-row no-gutters>
        <v-col cols="6">
          <v-img
            :src="`http://localhost:3005/${post.Images[0].src}`"
            height="300px"
            width="100%"
          />
          <h3 class="text-center">{{ post.content1 }}</h3>
        </v-col>
        <v-col cols="6">
          <v-img
            :src="`http://localhost:3005/${post.Images[1].src}`"
            height="300px"
            width="100%"
          />
          <h3 class="text-center">{{ post.content2 }}</h3>
        </v-col>
      </v-row>
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
</template>

<script>
import CommentForm from "~/components/CommentForm";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  components: {
    CommentForm
  },
  data() {
    return {};
  }
};
</script>

<style scoped>

</style>
