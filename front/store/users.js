export const state = () => ({
  me: null
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  signUp(state) {}
};

export const actions = {
  async signUp({ commit, state }, payload) {
    try {
      const res = await this.$axios("http://localhost:3005/user", {
        email: payload.email,
        nickname: payload.nickname,
        password: payload.password
      });
    } catch (err) {
      console.error(err);
    }
  },
  logIn({ commit }, payload) {
    commit("setMe", payload);
  },
  logOut({ commit }) {
    commit("setMe", null);
  }
};
