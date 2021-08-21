<template>
<!-- 사용하지 않음  -->
<!-- PostForm으로 병합 완료 -->
<!-- 추후 삭제 예정 -->
    <div class="image-button-container">
        <crop-modal>
        </crop-modal>
        <div class="image-button-box" v-for="num in 2" :key="num">
            <div v-if="imagePaths[num-1]" class="image-box">
                <!-- <img :src="imagePaths[num-1]" :alt="image"> -->
                <v-img class="Img" :src="imagePaths[num-1]" :aspect-ratio="16/9">
                </v-img>
                <button @click="onRemoveImage(num-1)" type="button">이미지 제거</button>
                <button @click="onCropModal(num-1)" type="button">이미지 크롭</button>
            </div>
            <div v-else class="button-box"
                @drop.prevent="dropInputTag"
                @dragover.prevent
                @click="clickInputTag(num)">
                <input :ref="`image${num}`" id="input"
                        type="file" name="image" accept="image/*" hidden
                        @change="onChangeImages">
                <svg class="button-image" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import CropModal from "~/components/CropModal"

export default {
    components: {
        CropModal
    },
    data(){
        return{
            imageCropIndex: null,
        }
    },
    computed:{
        imagePaths(){
            return this.$store.state.posts.imagePaths;
        },
    },
    methods:{
        onChangeImages(e){
            const imageFormData = new FormData();
            [].forEach.call(e.target.files, f => {
                console.log(f);
                imageFormData.append('image', f); //{ image: [file1, file2]}
            });
            this.$store.dispatch('posts/uploadImages', imageFormData);
        },
        onRemoveImage(index) {
            this.$store.commit('posts/removeImagePath', index);
        },
        onCropModal(index){
            $nuxt.$emit('imageCropModal', [this.imagePaths, index]); //크롭할 이미지 주소 전송
        },
        clickInputTag(num) {
            this.$refs[`image${num}`][0].click();
        },
        dropInputTag(e) {
            let file = Array.from(e.dataTransfer.files, v => v)[0]

            const imageFormData = new FormData();
            imageFormData.append('image', file);
            this.$store.dispatch('posts/uploadImages', imageFormData);
        },
    },
}
</script>

<style>
.image-button-box{
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
/* .image-box{
    display: flex;
    justify-content: center;
    align-items: center;
} */
.Img{
  width: 300px;
  height: 300px;
}
.button-box{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.button-image{
    width: 300px;
    height: 300px;
}
</style>