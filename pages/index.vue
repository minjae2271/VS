<template>
    <v-container>
        <main-carousel></main-carousel>
        <item-list />
    </v-container>
</template>

<script>
import MainCarousel from '~/components/MainCarousel'
import ItemList from "~/components/ItemList";

export default {
    components: {
        MainCarousel,
        ItemList,
    },
    data(){
        return {

        }
    }
};

</script>

<style>

</style>