<template>
  <v-container>
    <v-card>
      <v-subheader>글작성</v-subheader>
      <v-text-field v-model="title" label="글제목" rounded outlined />
      <v-row>
        <v-col cols="12" sm="6" v-for="(image, i) in imagePaths" :key="image">
          <v-card>
            <v-img class="postImg" :src="image">
              <v-layout fill-height align-end justify-center> </v-layout>
            </v-img>
            <button @click="onRemoveImage(i)" type="button">제거</button>
          </v-card>
        </v-col>
      </v-row>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
          <v-row>
            <v-col cols="12">
              <input
                ref="imageInput"
                type="file"
                multiple
                hidden
                @change="onChangeImages"
              />
              <v-btn type="button" @click="onClickImageUpload"
                >이미지 업로드</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="content1" label="1번" rounded outlined />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="content2" label="2번" rounded outlined />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="condition" label="조건" rounded outlined />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="hashtag"
                label=" 해쉬태그"
                rounded
                outlined
              />
            </v-col>
          </v-row>
        </v-container>
        <v-btn id="submitBtn" type="submit">등록</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      title: '',
      content1: '',
      content2: '',
      condition: '',
      hashtag: ''
    };
  },
  methods: {
    onChangeImages(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, f => {
        imageFormData.append('image', f); //{ image: [file1, file2]}
      });
      this.$store.dispatch('posts/uploadImages', imageFormData);
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onRemoveImage(index) {
      this.$store.commit('posts/removeImagePath', index);
    },
    async onSubmitForm() {
      this.$store
        .dispatch('posts/addPost', {
          postType: 1,
          postSubject: 1,
          postCategory: 1,
          title: this.title,
          content1: this.content1,
          content2: this.content2,
          condition: this.condition,
          hashtag: this.hashtag
        })
        .then(() => {
          this.title = '';
          this.content1 = '';
          this.content2 = '';
          this.condition = '';
          this.hashtag = '';
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  computed: {
    ...mapState('posts', ['imagePaths'])
  }
};
</script>

<style scoped>
.postImg {
  width: 100px;
  height: 50;
}
</style>
