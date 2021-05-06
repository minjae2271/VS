<template>
  <v-container>
      <div class='post-type-form-box'>
          <h2>대분류 등록</h2>
          <v-form ref='form' v-model='valid' @submit='onSubmitPostTypeForm'>
              <v-text-field v-model='postType' :rules='postTypeRule'/>
              <v-btn id='submitPostTypeBtn' type='submit'>대분류 등록</v-btn>
          </v-form>
      </div>
      <div class='post-type-list-box'>
          <div class="post-type-chip-box" v-for='(postType, i) in postTypes' :key='i'>
            <v-chip
            close
            color="teal"
            text-color="white"
            @click:close="close(postType.id)"
            @click="updatePostType(postType.id)">
                {{postType.postTypeName}}
            </v-chip>
          </div>
      </div>
  </v-container>
</template>

<script>
export default {
    props: {
        postTypes: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            valid: false,
            postType: '',
            postTypeRule:[
                v => !!v.trim() || "대분류를 입력하세요"                
            ],
        }
    },
    methods: {
        async onSubmitPostTypeForm(){
            if(this.$refs.form.validate()){
                await this.$store.dispatch('admins/addPostType', {
                    postType: this.postType
                });
            } else{
                alert("대분류를 입력하세요ㅜㅜ");
            }
        },
        async close(PostTypeId){
            if(!confirm("정말 대분류를 삭제 하시겠습니까?")){
                alert("취소 하였습니다.");
            } else {
                await this.$store.dispatch('admins/deletePostType', {
                    postTypeId: PostTypeId
                })
            }
        },
        async updatePostType(postTypeId){
            alert('update');
        }
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
    display: flex;
}
</style>