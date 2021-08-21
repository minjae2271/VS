<template>
  <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          이미지 크롭
        </v-card-title>
        <div class="img-con">
            <cropper
                ref="cropper"
                :src= "imagePath"
                :stencil-props="{
                    handlers: {},
                    movable: false,
                    scalable: false,
                    aspectRatio: 10/12
                }"
                :stencil-size="{
                    width: 280,
                    height: 280
                }"
	            image-restriction="stencil"
                @change="change"
            />
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>

          <button
            type="button"
            @click="dialog = false"
          >
            취소
          </button>

          <button
            type="button"
            @click="crop"
          >
            크롭하기
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export default {
    components: {
        Cropper
    },
    data(){
        return {
            dialog: false,
            imagePath: null,
            index: null,
            newImage: null
        }
    },
    methods:{
      change() {
            // const { canvas , coordinates } = this.$refs.cropper.getResult();
			// console.log(coordinates, canvas);
		  },
      crop(){
          const { canvas } = this.$refs.cropper.getResult();
          if(canvas){
              console.log("1. canvas",canvas);
              const imageFormData = new FormData();
              new Promise((resolve, reject) => {
                canvas.toBlob(blob => {
                    //blob => file
                    const f = new File([blob], 'cropped.jpg', {
                      type: 'image/jpeg'
                    })
                    console.log('2.f',f);
                    imageFormData.append('image', f);
                    resolve(imageFormData)
                });                  
              })
              .then(imageFormData => {
                console.log("3. dispatch uploadCropImages", imageFormData);
                this.$store.dispatch('posts/uploadCropImages', {
                    imageFormData,
                    index: this.index
                });
              })
              .catch(err => {
                console.error(err);
              })
          }
        }
    },
    created(){
        this.$nuxt.$on('imageCropModal', (payload) => {
            this.index = payload.index;
            const tempIndex = payload.index;
            this.imagePath = payload.imagePaths[tempIndex];
            this.dialog = true;
        });
    },
    beforeDestroy(){
    this.$nuxt.$off('imageCropModal');
  },
}
</script>

<style>

</style>