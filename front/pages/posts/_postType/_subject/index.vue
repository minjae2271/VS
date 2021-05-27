<template>
  <div>
      {{postTypeId}}
      {{subjectId}}
      {{mainPosts}}
  </div>
</template>

<script>
export default {
    asyncData({params}){
        return {
            postTypeId: params.postType,
            subjectId: params.subject
        }
    },
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

</style>