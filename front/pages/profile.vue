<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>{{ me.nickname }}님 프로필</v-subheader>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      tab: [],
      items: ["참여글", "작성댓글"]
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  middleware: "authenticated",
  methods: {}
};
</script>

<style scoped></style>
