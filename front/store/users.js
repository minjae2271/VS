export const state = () => ({
  me: null
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  }
};

export const actions = {
  async loadUser({ state, commit }) {
    try {
      const res = await this.$axios.get("http://localhost:3005/user", {
        withCredentials: true
      });
      commit("setMe", res.data);
    } catch (err) {
      console.error(err);
    }
  },
  signUp({ commit }, payload) {
    this.$axios
      .post(
        "http://localhost:3005/user",
        {
          email: payload.email,
          nickname: payload.nickname,
          password: payload.password
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("setMe", res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  logIn({ commit }, payload) {
    this.$axios
      .post(
        "http://localhost:3005/user/login",
        {
          email: payload.email,
          password: payload.password
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit("setMe", res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  logOut({ commit }) {
    this.$axios
      .post(
        "http://localhost:3005/user/logout",
        {},
        {
          withCredentials: true
        }
      )
      .then(res => {
        console.log(res);
        commit("setMe", null);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
