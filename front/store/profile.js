export const state = () => {
  myProfile: null;
};

export const mutations = {
  loadProfile(state, payload) {
    state.myProfile = payload;
  }
};

export const actions = {
  async loadProfile({ commit }, payload) {
    try {
      // 백엔드로 userid를 보내서 프로필 정보를 받는다.
      const res = await this.$axios.get(`profile/${payload.myId}`, {
        withCredentials: true
      });
      commit('loadProfile', res.data);
    } catch (err) {
      console.error(err);
    }
  }
};
