<template>
  <v-container>
      <h1>ADMIN</h1>
      <post-type :postTypes='postTypes'></post-type>
      <post-subject :postTypes='postTypes' :postSubjects='postSubjects'></post-subject>
      <post-category :postCategories='postCategories'></post-category>
  </v-container>
</template>

<script>
import PostType from '../components/PostType';
import PostSubject from '../components/PostSubject';
import postCategory from '../components/PostCategory';

export default {
    components: {
        PostType,
        PostSubject,
        postCategory
    },
    data() {
        return {

        }
    },
    async fetch({ store }) {
        await store.dispatch('admins/loadPostCategories');
        await store.dispatch('admins/loadPostSubjects');
        return await store.dispatch('admins/loadPostTypes');
    },
    computed: {
        postTypes(){
            return this.$store.state.admins.postTypes;
        },
        postSubjects(){
            return this.$store.state.admins.postSubjects;
        },
        postCategories(){
            return this.$store.state.admins.postCategories;
        }
    },
    methods: {

    }
}
</script>

<style scoped>
.post-type-form-box
{
    margin-top: 20px;
}
.post-type-list-box
{
    margin-top: 20px;
}
.post-subject-form-box
{
    margin-top: 20px;   
}
.post-subject-list-box
{
    margin-top: 20px;      
}
.post-category-form-box
{
    margin-top: 20px;     
}
.post-category-list-box
{
    margin-top: 20px;     
}
</style>