<template>
  <div>
    <v-select
      v-model='postTypeIdSelect'
      :hint='`${postTypeIdSelect}`'
      :items='postTypes'
      item-text='postTypeName'
      item-value='id'
      dense
      solo
      >
    </v-select>
    <v-select
      v-model='postSubjectIdSelect'
      :hint='`${postSubjectIdSelect}`'
      :items='postSubjects'
      item-text='postSubjectName'
      item-value='id'
      dense
      solo
    >
    </v-select>
    <div class='post-category-list-box'>
      <div class="post-type-chip-box" v-for='(postCategory, i) in postCategories' :key='i'>
          <v-chip
          class="chip"
          color="teal"
          text-color="white"
          @click="onSelectCategory(postCategory.id)"
          >
          {{postCategory.postCategoryName}}
          </v-chip>
      </div>
    </div>
    <post-form v-if="postTypeIdSelect === 1 && postSubjectIdSelect == 1" :postTypeId="postTypeIdSelect" :postSubjectId="postSubjectIdSelect" :postCategoryId="postCategoryIdSelect"></post-form>
  </div>
</template>

<script>
import PostForm from "~/components/PostForm";
import UpdateForm from '~/components/UpdateForm';

export default {
  components: {
    PostForm,
    UpdateForm
  },
  data(){
    return {
      postTypeIdSelect: null,
      postSubjectIdSelect: null,
      postCategoryIdSelect: null,
    }
  },
  methods: {
    onSelectCategory(categoryId){
      this.postCategoryIdSelect = categoryId;
    }
  },
  computed: {
    postTypes(){
        return this.$store.state.admins.postTypes;
    },
    postSubjects(){
        return this.postTypeIdSelect === null ? ["Type을 선택하세요"] : this.$store.state.admins.postSubjects.filter(v => v.PostTypeId === this.postTypeIdSelect);
    },
    postCategories(){
        return this.$store.state.admins.postCategories;
    },
    updatePost() {
      return this.$store.state.posts.updatePost;
    },
  },
}
</script>

<style scoped>
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
