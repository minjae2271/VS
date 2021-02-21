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
  logIn({ commit }, payload) {
    commit("setMe", payload);
  },
  logOut({ commit }) {
    commit("setMe", null);
  },
  signUp({ commit }, payload) {
    commit("setMe", payload);
  }
};
