<template>
  <div>
    {{ profile }}

    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr v-for="item in userInfos" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfos: [
        {
          name: 'ID',
          value: this.$store.state.profile.myProfile.id
        },
        {
          name: '닉네임',
          value: this.$store.state.profile.myProfile.nickname
        },
        {
          name: 'email',
          value: this.$store.state.profile.myProfile.email
        },
        {
          name: '가입일',
          value: this.$store.state.profile.myProfile.createdAt
        }
      ]
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile.myPorfile;
    },
  }
};
</script>

<style></style>
