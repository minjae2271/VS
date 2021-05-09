<template>
  <v-list dense>
    <v-list-item v-for="postSubject in postSubjects" :key="postSubject" link>
      <!-- <v-list-item-icon>
        <v-icon>{{ postSubject.postSubjectName }}</v-icon>
      </v-list-item-icon> -->

      <v-list-item-content>
        <v-list-item-title>{{ postSubject.postSubjectName }}</v-list-item-title>
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
  }
};
</script>

<style></style>
