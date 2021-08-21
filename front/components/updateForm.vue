<template>
  <v-container>
      <p>{{updatePost}}</p>
      <h1>{{updateImagePaths}}</h1>
    <v-card>
      <v-subheader>글수정</v-subheader>
      <v-text-field v-model="title" label="글제목" shaped outlined />
      <v-row>
        <v-col cols="12" sm="6" v-for="(image,i) in updateImagePaths" :key="i">
          <v-card>
            <v-img
              class="postImg"
              :src="`${image}`"
            >
              <v-layout fill-height align-end justify-center>
              </v-layout>
            </v-img>
            <button @click="onRemoveUpdateImage(i)" type="button">제거</button>
          </v-card>
        </v-col>
      </v-row>
      <v-form ref="form" @submit.prevent="onSubmitForm">
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
            <v-col>
              <v-text-field v-model="condition" label="조건" rounded outlined />
            </v-col>
            <v-col>
              <v-text-field v-model="hashtag" label=" 해쉬태그" rounded outlined/>
            </v-col>
          </v-row>
        </v-container>
        <v-btn id="submitBtn" type="submit" absolute right>수정</v-btn> 
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    updatePost: {
          type: Object,
          required: true,
      }
  },
  data() {
    return {
      title: this.updatePost.title,
      content1: this.updatePost.content1,
      content2: this.updatePost.content2,
      condition: this.updatePost.condition,
      hashtag: "",
    };
  },
  mounted(){
      const hashtags = this.updatePost.Hashtags.map(ele => '#' + ele.name);
      this.hashtag = hashtags;
      
      const updateImagePaths = this.updatePost.Images.map(ele => ele.src);
      this.$store.commit('posts/setUpdateImagePath', updateImagePaths);
  },
  methods: {
    onChangeImages(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, f => {
        imageFormData.append("image", f); //{ image: [file1, file2]}
      });
      this.$store.dispatch("posts/updateImages", imageFormData);
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onRemoveUpdateImage(index) {
      this.$store.commit('posts/removeUpdateImagePath', index);
    },
    onSubmitForm() {
        this.$store.dispatch("posts/updatePost", {
          postType: 1,
          postCategory: 1,
          title: this.title,
          content1: this.content1,
          content2: this.content2,
          condition: this.condition,
          hashtag: this.hashtag,
          postId: this.$route.params.id
      })
      .then(() => {
        this.title = '';
        this.content1 = '';
        this.content2 = '';
        this.condition = '';
        this.hashtag = '';
      })
      .catch((err) => {
        console.error(err);
      })
    }
  },
  computed: {
    ...mapState("posts", ["updateImagePaths"]),
  }
};
</script>

<style scoped>
.postImg
{
  width: 100px;
  height: 50;
}

</style>
