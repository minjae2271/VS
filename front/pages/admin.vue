<template>
  <v-container>
      <h1>ADMIN</h1>
      <div class='post-type-box'>
          <h2>대분류 등록</h2>
          <v-form ref='form' @submit='onSubmitPostTypeForm'>
              <v-text-field v-model='postType'/>
              <v-btn id='submitPostTypeBtn' type='submit'>대분류 등록</v-btn>
          </v-form>
          <p>{{postTypes}}</p>
      </div>
      <div class='post-subject-box mt-5'>
          <h2>중분류 등록</h2>
          <v-select
          v-model='postTypeSelect'
          :hint='`${postTypeSelect}`'
          :items='postTypes'
          item-text='postTypeName'
          item-value='id'
          dense
          solo
          >
          </v-select>
          <v-form ref='form' @submit='onSubmitPostSubjectForm'>
              <v-text-field v-model='postSubject'/>
              <v-btn id='submitPostSubjectBtn' type='submit'>중분류 등록</v-btn>
          </v-form>
          <p>{{postSubjects}}</p>
      </div>
      <div  class='post-category-box mt-5'>
          <h2>소분류</h2>
          <v-form ref='form' @submit='onSubmitPostCategoryForm'>
              <v-text-field v-model='postCategory'/>
              <v-btn id='submitPostCategoryBtn' type="submit">소분류 등록</v-btn>
          </v-form>
          <p>{{postCategories}}</p>
      </div>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            postType: '',
            postCategory: '',
            postSubject: '',
            //select
            postTypeSelect: '',
            items: '',
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
        onSubmitPostTypeForm(){
            this.$store.dispatch('admins/addPostType', {
                postType: this.postType
            })
        },
        onSubmitPostSubjectForm(){
            if(!this.postTypeSelect){
                alert('대분류를 선택해주세요.')
            } else{
                console.log(this.postTypeSelect);
                this.$store.dispatch('admins/addPostSubject', {
                    postTypeId: this.postTypeSelect,
                    postSubject: this.postSubject
                })
            }
        },
        onSubmitPostCategoryForm(){
            this.$store.dispatch('admins/addPostCategory', {
                postCategory: this.postCategory
            })
        },
    }
}
</script>

<style scoped>

</style>