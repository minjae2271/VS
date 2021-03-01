<template>
  <v-container>
    <v-card>
      <v-subheader>글작성</v-subheader>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card>
            <h1>{{ imagePaths }}</h1>
            <v-img
              src="https://yt3.ggpht.com/ytc/AAUvwnjgFBtwlc18lzSGrCZv_T0mUb4Vr-P4c2F2o1l5Eg=s900-c-k-c0x00ffffff-no-rj"
            >
              <v-layout fill-height align-end justify-center>
                <h2>{{ content1 }}</h2>
              </v-layout>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-img
              src="https://yt3.ggpht.com/ytc/AAUvwnjgFBtwlc18lzSGrCZv_T0mUb4Vr-P4c2F2o1l5Eg=s900-c-k-c0x00ffffff-no-rj"
            >
              <v-layout fill-height align-end justify-center>
                <h2>{{ content2 }}</h2>
              </v-layout>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
      <!-- <div> -->
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
              <v-text-field v-model="content1" label="1" shaped outlined />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="content2" label="2" rounded outlined />
            </v-col>
            <v-col cols="12">
              <v-btn type="submit" absolute right>등록</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <!-- </div> -->
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      content1: "",
      content2: ""
    };
  },
  methods: {
    onChangeImages(e) {
      console.log(e.target.files);
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, f => {
        imageFormData.append("image", f); //{ image: [file1, file2]}
      });
      // 	for (var key of imageFormData.entries()) {
      // 	console.log(key[0] + ', ' + key[1])
      // }
      //   console.log(imageFormData)
      this.$store.dispatch("posts/uploadImages", imageFormData);
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onSubmitForm() {
      this.$store.dispatch("posts/addPost", {
        content1: this.content1,
        content2: this.content2
      });
    }
  },
  computed: {
    ...mapState("posts", ["imagePaths"])
  }
};
</script>

<style></style>
