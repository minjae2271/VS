<template>
  <v-card class="mx-auto" max-width="100%">
    <v-card-title>
      <h3>
        <nuxt-link :to="'/post/1'">
          1억 받고 재입대 vs 바로 전역
        </nuxt-link>
      </h3>
    </v-card-title>

    <v-card-subtitle class="pb-0">
      Number 10
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text>
        Share
      </v-btn>

      <v-btn color="orange" text>
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CommentForm from "~/components/CommentForm";

export default {
  components: {
    CommentForm
  },
  data() {
    return {};
  }
};
</script>

<style></style>
