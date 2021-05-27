<template>
  <div>
      <p>{{postTypeId}}</p>
      <p>{{subjectId}}</p>
      <p>{{categoryId}}</p>
      <p>{{mainPosts}}</p>
  </div>
</template>

<script>
export default {
    asyncData({params}){
        return {
            postTypeId: params.postType,
            subjectId: params.subject,
            categoryId: params.category
        }
    },
   async fetch({store, params}){
        return await store.dispatch('posts/loadSearchPosts', { 
            reset: true,
            postTypeId: params.postType,
            postSubjectId: params.subject,
            categoryId: params.category
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
                postSubjectId: params.subject,
                categoryId: params.category
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