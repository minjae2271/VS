<template>
  <div>
    <div>제목</div>
    <v-sheet
      class="mx-auto"
      max-width="100%"
      :style="{ padding: '0 0 100px 0' }"
    >
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item v-for="n in 15" :key="n">
          <post-Card />
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import PostCard from "~/components/PostCard";
export default {
  components: {
    PostCard
  },
  data() {
    return {
      model: null
    };
  },
  computed: {
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    }
  }
};
</script>

<style></style>
