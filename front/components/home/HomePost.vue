<template>
  <v-row>
      <v-col v-for="(post, i) in posts" :key="i" cols="3">
        <v-card>
          <v-img
            class="justify-center"
            height="150"
            width="80%"
            :src="post.Images[0].src"
          >
          </v-img>
          <v-card-title>
            <v-icon>
              fas fa-book
            </v-icon>
            <span>{{ post.title }}</span>
          </v-card-title>
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://images.gameinfo.io/pokemon/256/p92.png"
              >
              </v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ post.User.nickname }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-card-title>
                <v-icon>
                  fas fa-eye
                </v-icon>
                <span>{{ post.view_cnt }}</span>
              </v-card-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>
                {{ post.createdAt }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array
    }
  }
}
</script>

<style>

</style>