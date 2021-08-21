<template>
    <div class="post-card-box grey lighten-5">
      <v-row class="post-card-row" no-gutters>
        <v-col
          class="post-card-col"
          v-for="(post, i) in mainPosts"
          :key="i"
          cols="12"
          sm="6"
          md="3"
        >
          <post-card elevation="4" :post="post" />
        </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
    // asyncData({params}){
    //     return {
    //         postTypeId: params.postType,
    //         subjectId: params.subject
    //     }
    // },
    async fetch({store, params}){
        return await store.dispatch('posts/loadSearchPosts', { 
            reset: true,
            postTypeId: params.postType,
            postSubjectId: params.subject
      });
    },
    computed: {
        mainPosts() {
            return this.$store.state.posts.mainPosts.filter(post => post != null);
        },
        hasMorePost() {
            return this.$store.state.posts.hasMorePost;
        },
    },
    methods: {
        onScroll() {
        if (
            window.scrollY + document.documentElement.clientHeight >
            document.documentElement.scrollHeight - 300
        ) {
            if (this.hasMorePost) {
            this.$store.dispatch('posts/loadSearchPosts', { 
                postTypeId: params.postType,
                postSubjectId: params.subject
      });
            }
        }
        },
    },  
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    }
}
</script>

<style>
.post-card-box{
  margin: 0 1rem;
}

</style>