<template>
  <v-list dense>
    <v-list-item v-for="postSubject in postSubjects" :key="postSubject.id" link>
      <v-list-item-content>
        <v-list-item-title
          @click="selectedPostSubject(postSubject.PostTypeId, postSubject.id)"
          >{{ postSubject.postSubjectName }}</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  computed: {
    postTypes() {
      return this.$store.state.admins.postTypes;
    },
    postSubjects() {
      return this.$store.state.admins.postSubjects;
    },
    postCategories() {
      return this.$store.state.admins.postCategories;
    }
  },
  methods: {
    selectedPostSubject(postTypeId, postSubjectId) {
      console.log(postTypeId, postSubjectId);
      this.dispatch('posts/loadFilteredPost', {
        reset: true,
        postTypeId,
        postSubjectId
      });
    }
  }
};
</script>

<style></style>
