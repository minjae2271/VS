<template>
  <v-card class="post-card" >
    <nuxt-link :to="'/post/' + post.id" class="post-link">
    <div class="post-content">
      <v-row no-gutters v-if="post.Images && post.Images.length === 2">
        <v-col cols="6">
          <v-img :src="post.Images[0].src" height="200px" width="100%" />
        </v-col>
        <v-col cols="6">
          <v-img :src="post.Images[1].src" height="200px" width="100%" />
        </v-col>
      </v-row>
      <v-row no-gutters v-else-if="post.Images && post.Images.length === 1">
        <v-col cols="12">
          <v-img :src="post.Images[0].src" height="200px" width="100%" />
        </v-col>
      </v-row>
      <div class="post-title">
        <h3>
            {{ post.title }}
        </h3>
      </div>
    </div>
     </nuxt-link>
    <div class="content-desc" v-if="post.Picks">
      <div class="content-participation">
        <span>{{ post.Picks.length }}</span>
        <span>명 참여중</span>
      </div>
      <div class="content-hashtags">
        <v-chip class="hashtags" v-for="(hashtag, i) in post.Hashtags" :key="i">
          {{ hashtag.name }}
        </v-chip>
      </div>
    </div>
    <v-card-actions>
      <!-- <v-btn color="orange" text>
        공유하기
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn icon color="pink" v-if="isPicked">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon color="pink" disabled v-else>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    isPicked() {
      const me = this.$store.state.users.me;
      return !!(this.post.Picks || []).find(v => v.UserId === (me && me.id));
    }
  },
  methods: {}
};
</script>

<style scoped>
.post-card{
  margin: 1rem;
}
.post-title {
  padding: 0.5rem;
}
.content-desc{
  padding: 0 0.5rem;
}
.hashtags{
  margin-right: 0.5rem;
}
.post-link:link {
  color: black;
  text-decoration: none;
}

.post-link:visited {
  color: black;
  text-decoration: none;
}

.content-name {
  display: flex;
  justify-content: center;
}

.content-name h2 {
  flex: 1;
}

.content-participation {
  margin-bottom: 0.7rem;
}
</style>
