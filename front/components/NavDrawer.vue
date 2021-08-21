<template>
  <v-list dense>
    <!-- <button @click="gogo">gogo</button> -->
    <nuxt-link :to="`/posts/${page}/`">
      <v-list-item-title>
        전체보기
      </v-list-item-title>
    </nuxt-link>
    <v-list-item v-for="(postSubject, i) in postSubjects" :key="i" link>
      <v-list-item-content>
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
    postSubjects() {
      return this.$store.state.admins.postSubjects.filter(v => v.PostTypeId === this.page);
    },
    postCategories() {
      return this.$store.state.admins.postCategories;
    }
  },
  // methods: {
  //    gogo(){
  //   console.log($nuxt.$route.name)
  //   //return location.reload();
  //    //if you want to send any data into server before redirection then you can do it here
  //   return this.$router.push("/search?q=");
  //   //
  //   //this.$forceUpdate();
  // },
  // }
};
</script>

<style></style>
