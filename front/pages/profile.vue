<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>{{ me.nickname }}님 프로필</v-subheader>
      </v-container>
    </v-card>
    <template>
      <v-tabs v-model="tabs">
        <v-tab v-for="item in items" :key="item.tab">
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card flat>
            <v-card-text>{{ item.content }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </template>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabs: null,
      items: [
        { tab: '참여 글', content: 'Tab 1 Content' },
        { tab: '작성 댓글', content: 'Tab 2 Content' }
      ]
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me == null
        ? ''
        : this.$store.state.users.me;
    }
  },
  middleware: 'authenticated',
  methods: {}
};
</script>

<style scoped></style>
