<template>
  <div>
    <v-container>
      <v-card style="margin-bottom: 20px">
        <v-container>
          <v-subheader>{{me.nickname}}님 프로필</v-subheader>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
 
    };
  },
  computed: {
    me(){
      return this.$store.state.users.me;
    }
  },

  methods: {}
};
</script>

<style scoped></style>
