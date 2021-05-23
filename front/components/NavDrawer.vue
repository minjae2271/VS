<template>
  <v-list dense>
    <v-list-item v-for="(postSubject, i) in postSubjects" :key="i" link>
      <v-list-item-content>
        {{ page }}
        <nuxt-link :to="`/${page}/` + postSubject.id" append>
          <v-list-item-title>{{
            postSubject.postSubjectName
          }}</v-list-item-title>
        </nuxt-link>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      allowNull: false
    }
  },
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
