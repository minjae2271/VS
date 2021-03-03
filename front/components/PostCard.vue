<template>
  <v-card class="mx-auto" max-width="100%">
    <v-container>
      <v-row no-gutters>
        <v-col cols="6">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="300px"
            width="100%"
          />
        </v-col>
        <v-col cols="6">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            height="300px"
            width="100%"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-card-title>
      <h3>
        <nuxt-link :to="'/post/1'">
          {{ post[0].title }}
        </nuxt-link>
      </h3>
    </v-card-title>

    <v-card-subtitle class="pb-0">
      {{ post[0].contents[0] }} VS {{ post[0].contents[1] }}
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
  },
  computed: {
    post() {
      return this.$store.state.posts.mainPosts;
    }
  }
};
</script>

<style></style>
