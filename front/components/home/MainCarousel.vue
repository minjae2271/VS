<template>
        <v-carousel v-model="model" cycle show-arrows-on-hover hide-delimiter-background height="auto">
            <v-carousel-item
            v-for="(item, i) in mainBanner"
            :key="i"
            >
                <v-img contain height="240px" src="https://item.kakaocdn.net/do/a1866850b14ae47d0a2fd61f409dfc057154249a3890514a43687a85e6b6cc82"></v-img>
                    <v-row
                    align="center"
                    justify="center"
                    >
                    <div class="display-3">
                        Slide {{ i + 1 }}
                    </div>
                    </v-row>
            </v-carousel-item>
        </v-carousel>
</template>
<script>
export default {
    props: {
        mainBanner: {
            type: Array,
            allowNull: false,
        }
    },
    data: () => ({
      model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }),
}
</script>

<style scoped>

</style>