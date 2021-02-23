<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>{{ me.nickname }}님 프로필</v-subheader>
        </v-container>
      </v-card>
    </v-container>
    <v-container>
      <v-tabs color="deep-purple accent-4">
        <v-tabs-slider color="deep-purple accent-4"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>

        <v-tab-item v-for="item in items" :key="item">
          <v-container fluid>
            <v-row>
              <v-col v-for="i in 6" :key="i" cols="12" md="4">
                <post-card />
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
import PostCard from "~/components/PostCard";
export default {
  components: { PostCard },
  data() {
    return {
      tab: [],
      items: ["참여글", "작성글", "작성댓글"]
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  middleware: 'authenticated',
  methods: {

  },
};
</script>

<style scoped></style>
