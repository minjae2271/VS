<template>
  <v-list>
    <template>
      <v-list-item v-for="c in post.Comments" :key="c.id">
        <v-list-item-avatar color="teal">
          <span>{{ c.User.nickname[0] }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ c.User.nickname }}</v-list-item-title>
          <v-list-item-subtitle>{{ c.content }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="remove(post.id, c.id)"
            >mdi-minus-circle-outline</v-icon
          >
        </v-list-item-action>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    remove: {
      type: Function,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
