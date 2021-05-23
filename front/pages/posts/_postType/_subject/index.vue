<template>
  <div>
      {{subjectId}}
      {{mainPosts}}
  </div>
</template>

<script>
export default {
    asyncData({params}){
        return {
            subjectId: params.subject
        }
    },
    async fetch({store, params}){
        return store.dispatch('posts/loadSearchPosts', { 
            reset: true,
            postTypeId: 1,
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
            this.$store.dispatch('posts/loadPosts');
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