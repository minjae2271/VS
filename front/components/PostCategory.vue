<template>
  <v-container>
      <div class='post-category-form-box'>
          <h2>소분류</h2>
          <v-form ref='form' v-model='valid' @submit='onSubmitPostCategoryForm'>
              <v-text-field v-model='postCategory' :rules='postCategoryRule'/>
              <v-btn id='submitPostCategoryBtn' type="submit">소분류 등록</v-btn>
          </v-form>
      </div>
      <div class='post-category-list-box'>
        <div class="post-type-chip-box" v-for='(postCategory, i) in postCategories' :key='i'>
            <v-chip
            close
            color="teal"
            text-color="white"
            @click:close="close(postCategory.id)">
                {{postCategory.postCategoryName}}
            </v-chip>
        </div>
      </div>
  </v-container>
</template>

<script>
export default {
    props: {
        postCategories: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            valid: false,
            postCategory: '',
            postCategoryRule:[
                v => !!v.trim() || "소분류를 입력하세요"                
            ]
        }
    },
    methods: {
        async onSubmitPostCategoryForm(){
            if(this.$refs.form.validate()){
                await this.$store.dispatch('admins/addPostCategory', {
                    postCategory: this.postCategory
                });
            } else {
                alert("소분류를 입력하세요 ㅠㅠ");
            }
        },
        async close(postCategory){
            alert("정말 소분류를 삭제 하시겠습니까?");
            await this.$store.dispatch('admins/deletePostCategory', {
                postCategoryId: postCategory
            })
        }
    }
}
</script>

<style>
.post-category-form-box
{
    margin-top: 20px;     
}
.post-category-list-box
{
    margin-top: 20px;  
    display: flex;   
}
</style>