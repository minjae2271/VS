export const state = () => ({
  showNav: false
});

export const mutations = {
  toggleNav(state) {
    state.showNav = !state.showNav;
  }
};

export const actions = {
  nuxtServerInit({ commit, dispatch, state }, { req }) {
    return dispatch('users/loadUser');
  },
  toggleNav({ commit }) {
    commit('toggleNav');
  }
};
