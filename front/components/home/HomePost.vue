<template>
  <v-row dense>
      <v-col v-for="(post, i) in posts" :key="i" cols="3">
        <v-card>
          <v-img
            height="200"
            width="100%"
            :src="post.Images[0].src"
          >
          </v-img>
          <v-row no-gutters>
            <v-card-title class="py-0">
              <span>{{ post.title }}</span>
            </v-card-title>
          </v-row>
          <v-row class="my-0" no-gutters>
            <v-list-item >
              <v-list-item-avatar class="ma-0 pl-0">
                <v-img
                  src="https://images.gameinfo.io/pokemon/256/p92.png"
                >
                </v-img>
              </v-list-item-avatar>
              <v-list-item-content >
                <v-list-item-title class="pa-0">
                  <span>{{ post.User.nickname }}</span>
                </v-list-item-title>
              </v-list-item-content> 
            </v-list-item>
          </v-row>
          <v-row class="my-0"  no-gutters>
            <v-col class="ml-1">
              <v-card-title class="py-0" >
                <v-icon x-small class="mr-1">
                  fas fa-eye
                </v-icon>
                <span class="body-1">{{ post.view_cnt }}</span>
              </v-card-title>

            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-list-item-title>
                {{ post.createdAt | changeDate }}
              </v-list-item-title>

            </v-col>
          </v-row>
        </v-card>
      </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
    }
  },
  filters: {
    changeDate : function(date) {
      let dateChunk = date.split("T")[0];
      return dateChunk;
    }
  }
}
</script>

<style scoped>
/* .row {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
} */
</style>