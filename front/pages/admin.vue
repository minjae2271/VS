<template>
  <v-container>
      <h1>ADMIN</h1>
      <div class="post-type-box">
          <h2>대분류 등록</h2>
          <v-form ref='form' @submit='onSubmitPostTypeForm'>
              <v-text-field v-model="postType"/>
              <v-btn id="submitPostTypeBtn" type="submit">대분류 등록</v-btn>
          </v-form>
      </div>
      <div class="post-subject-box mt-5">
          <h2>중분류 등록</h2>
          <v-combobox
            dense
            hide-selected
            outlined
            solo
          ></v-combobox>

      </div>
      <div>
          <h2>소분류</h2>
          <v-form ref='form' @submit='onSubmitPostCategoryForm'>
              <v-text-field v-model='postCategory'/>
              <v-btn id='submitPostCategoryBtn' type="submit">소분류 등록</v-btn>
          </v-form>
      </div>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            postType: '',
            postCategory: '',
        }
    },
    methods: {
        onSubmitPostTypeForm(){
            this.$store.dispatch('admins/addPostType', {
                postType: this.postType
            })
        },
        onSubmitPostCategoryForm(){

        }
    }
}
</script>

<style scoped>

</style>