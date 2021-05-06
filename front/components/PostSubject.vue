<template>
  <v-container>
      <div class='post-subject-form-box'>
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
          <v-form ref='form' v-model='valid' @submit='onSubmitPostSubjectForm'>
              <v-text-field v-model='postSubject' :rules='postSubjectRule'/>
              <v-btn id='submitPostSubjectBtn' type='submit'>중분류 등록</v-btn>
          </v-form>
      </div>
      <div class='post-subject-list-box'>
          <div class="post-type-chip-box" v-for='(postSubject, i) in postSubjects' :key='i'>
            <p>{{postSubject}}</p>
            <v-chip
            close
            color="teal"
            text-color="white"
            @click:close="close(postSubject.id)">
                {{postSubject.postSubjectName}}
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
        },
        postSubjects: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            valid: false,
            postSubject: '',
            //select
            postTypeSelect: '',
            items: '',
            //rule
            postSubjectRule:[
                v => !!v.trim() || "중분류를 입력하세요"                
            ],
        }
    },
    methods: {
        async onSubmitPostSubjectForm(){
            if(!this.postTypeSelect){
                alert('대분류를 선택해주세요.')
            } else{
                if(this.$refs.form.validate()){
                    await this.$store.dispatch('admins/addPostSubject', {
                        postTypeId: this.postTypeSelect,
                        postSubject: this.postSubject
                    });
                } else{
                alert("중분류를 입력하세요ㅜㅜ");
              }
            }
        },
        async close(PostSubjectId){
            if(!confirm('정말 중분류를 삭제 하시겠습니까?')){
                alert("취소 되었습니다.");
            } else {
                await this.$store.dispatch('admins/deletePostSubject', {
                    postSubjectId: PostSubjectId
                });
            }
        }
    }
}
</script>

<style scoped>
.post-subject-form-box
{
    margin-top: 20px;   
}
.post-subject-list-box
{
    margin-top: 20px;      
}
</style>