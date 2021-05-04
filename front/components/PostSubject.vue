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
              <v-text-field v-model='postSubject' />
              <v-btn id='submitPostSubjectBtn' type='submit'>중분류 등록</v-btn>
          </v-form>
      </div>
      <div class='post-subject-list-box'>
          <v-chip v-for='(postSubject, i) in postSubjects' :key='i'>
              {{postSubject.postSubjectName}}
          </v-chip>
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
                alert("중분류를 입력하세요");
            }
            }
        },
    }
}
</script>

<style>

</style>