<template>
  <v-list dense>
    <v-list-item v-for="postSubject in postSubjects" :key="postSubject" link>
      <v-list-item-content>
        <nuxt-link
        :to="'/aVersusB/' + postSubject.id" 
        append>
          <v-list-item-title >{{ postSubject.postSubjectName }}</v-list-item-title>
        </nuxt-link>
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
    loadSearchPosts(postTypeId, postSubjectId){
      this.$store.dispatch('posts/loadSearchPosts', { 
        reset: true,
        postTypeId,
        postSubjectId,
      })
    }
  }
};
</script>

<style></style>
