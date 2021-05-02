<template>
  <v-card max-width="100%">
    <p>{{ post.Picks }}</p>
    <!-- <h1>{{isPicked}}</h1> -->
    <v-card-title class="post-title">
      <v-spacer></v-spacer>
      <h3>
        <nuxt-link :to="'/post/' + post.id" class="post-link">
          {{ post.title }}
        </nuxt-link>
      </h3>
      <v-spacer></v-spacer>
      <v-btn icon color="pink" v-if="isPicked">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon color="pink" disabled v-else>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-title>
    <v-container class="post-content">
      <v-row no-gutters v-if="post.Images.length === 2">
        <v-col cols="6">
          <v-img
            :src="`http://localhost:3005/${post.Images[0].src}`"
            height="100px"
            width="100%"
          />
        </v-col>
        <v-col cols="6">
          <v-img
            :src="`http://localhost:3005/${post.Images[1].src}`"
            height="100px"
            width="100%"
          />
        </v-col>
      </v-row>
      <v-row no-gutters v-else-if="post.Images.length === 1">
        <v-col cols="12">
          <v-img
            :src="`http://localhost:3005/${post.Images[0].src}`"
            height="100px"
            width="100%"
          />
        </v-col>
      </v-row>
    <v-card-title class="post-title">
      <h3>
        <nuxt-link :to="'/post/' + post.id" class="post-link">
          {{ post.title }}
        </nuxt-link>
      </h3>
    </v-card-title>
      <!-- <v-container class="content-name">
        <h2 class="text-center">{{ post.content1 }}</h2>
        <p>VS</p>
        <h2 class="text-center">{{ post.content2 }}</h2>
      </v-container> -->
      <div class="content-desc" v-if="post.Picks">
        <div class="content-participation">
          <span>{{ post.Picks.length }}</span>
          <span>명 참여중</span>
        </div>
        <div class="content-hashtags">
          <v-chip v-for="(hashtag, i) in post.Hashtags" :key="i">
            {{ hashtag.name }}
          </v-chip>
        </div>
      </div>
    </v-container>
    <v-card-actions>
      <v-btn color="orange" text>
        공유하기
      </v-btn>
            <v-spacer></v-spacer>
      <v-btn
        icon
        color="pink"
        v-if="isPicked"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        icon
        color="pink"
        disabled
        v-else
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CommentForm from '~/components/CommentForm';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentForm
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
.post-title {
  justify-content: center;
  padding-bottom: 0;
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
  margin-bottom: 10px;
}

.content-desc
{
  margin: 10px;
}
</style>
