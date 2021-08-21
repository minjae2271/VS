<template>
  <v-container>
    <v-card class="input-box">
      <!-- <v-row>
        <v-col cols="12" sm="6" v-for="(image, i) in imagePaths" :key="image">
          <v-card>
            <v-img class="postImg" :src="image">
              <v-layout fill-height align-end justify-center> </v-layout>
            </v-img>
            <button @click="onRemoveImage(i)" type="button">제거</button>
          </v-card>
        </v-col>
      </v-row> -->
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <!-- 제목 -->
        <div class="title-box">
          <v-text-field
            :rules="postTitleRules"
            v-model="title"
            label="글제목을 입력하세요."
            solo
            outlined
          />
        </div>
        <!-- image start -->
        <div class="image-button-container">
          <!-- crop modal -->
          <crop-modal></crop-modal>
          <div class="image-button-box" v-for="num in 2" :key="num">
            <div v-if="imagePaths[num - 1]" class="image-box">
              <!-- <img :src="imagePaths[num-1]" :alt="image"> -->
              <v-img
                class="Img"
                :src="imagePaths[num - 1]"
                :aspect-ratio="16 / 9"
              >
              </v-img>
              <button @click="onRemoveImage(num - 1)" type="button">
                이미지 제거
              </button>
              <button @click="onCropModal(num - 1)" type="button">
                이미지 크롭
              </button>
            </div>
            <div
              v-else
              class="button-box"
              @drop.prevent="dropInputTag"
              @dragover.prevent
              @click="clickInputTag(num)"
            >
              <input
                :ref="`image${num}`"
                type="file"
                name="image"
                accept="image/*"
                hidden
                @change="onChangeImages"
              />
              <svg
                class="button-image"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <!-- image end -->
        <v-container>
          <v-row>
            <!-- <v-col cols="12">
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
            </v-col> -->
            <v-col cols="6">
              <v-text-field v-model="content1" label="1번 설명을 입력하세요." outlined />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="content2" label="2번 설명을 입력하세요." outlined />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="condition" label="조건을 입력하세요." solo />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="hashtag"
                label=" 해쉬태그"
                solo
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
import CropModal from '~/components/CropModal';

export default {
  props: {
    postTypeId: {
      type: Number,
    },
    postSubjectId: {
      type: Number,
    },
    postCategoryId: {
      type: Number,
    },
  },
  components: {
    CropModal,
  },
  data() {
    return {
      valid: true,
      title: '',
      content1: '',
      content2: '',
      condition: '',
      hashtag: '',
      postTitleRules: [v => !!v || '제목을 입력해주세요'],

      // crop관련 data
      imageCropIndex: null,
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
    onRemoveImage(index) {
      this.$store.commit('posts/removeImagePath', index);
    },
    onCropModal(index) {
      $nuxt.$emit('imageCropModal', {
        imagePaths: this.imagePaths,
        index
      }); //크롭할 이미지 주소 전송
    },
    clickInputTag(num) {
      this.$refs[`image${num}`][0].click();
    },
    // onClickImageUpload() {
    //   this.$refs.imageInput.click();
    // },
    dropInputTag(e) {
      let file = Array.from(e.dataTransfer.files, v => v)[0];

      const imageFormData = new FormData();
      imageFormData.append('image', file);
      this.$store.dispatch('posts/uploadImages', imageFormData);
    },
    async onSubmitForm() {
      this.$store
        .dispatch('posts/addPost', {
          postType: this.postTypeId,
          postSubject: this.postSubjectId,
          postCategory: 1,
          title: this.title,
          content1: this.content1,
          content2: this.content2,
          condition: this.condition,
          hashtag: this.hashtag,
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
    },
  },
  computed: {
    ...mapState('posts', ['imagePaths']),
  },
};
</script>

<style scoped>
.input-box{
  display: flex;
  justify-content: center;
}
.image-button-container{
  display: flex;
  justify-content: space-around;
}
.image-button-box {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
/* .image-box{
    display: flex;
    justify-content: center;
    align-items: center;
} */
.Img {
  width: 300px;
  height: 300px;
}
.button-box {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.button-image {
  width: 300px;
  height: 300px;
}
</style>
