<template>
  <v-list>
    <template v-for="(item, index) in items">
      <v-list-item :key="item.id">
        <v-list-item-avatar color="teal">
          <span>{{ item.User.nickname[0] }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.User.nickname }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          postId: 1,
          content: "좋은글이네",
          User: { id: 2, nickname: "Murpick User2" }
        },
        {
          id: 2,
          postId: 1,
          content: "고맙다",
          User: { id: 1, nickname: "Murpick User1" }
        }
      ]
    };
  }
};
</script>

<style></style>
