<template>
  <v-list dense>
    <nuxt-link :to="`/posts/${page}/`">
      <v-list-item-title>
        전체보기
      </v-list-item-title>
    </nuxt-link>
    <v-list-item v-for="(postSubject, i) in postSubjects" :key="i" link>
      <v-list-item-content>
        {{ page }}
        <nuxt-link :to="`/posts/${page}/` + postSubject.id" >
          <v-list-item-title>
            {{postSubject.postSubjectName}}
          </v-list-item-title>
        </nuxt-link>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      allowNull: false
    }
  },
  computed: {
    // postTypes() {
    //   return this.$store.state.admins.postTypes;
    // },
    postSubjects() {
      return this.$store.state.admins.postSubjects.filter(v => v.PostTypeId === this.page);
    },
    postCategories() {
      return this.$store.state.admins.postCategories;
    }
  }
};
</script>

<style></style>
