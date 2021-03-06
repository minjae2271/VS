export const state = () => ({
  me: null
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
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
    this.$axios.post('http://localhost:3005/user/login', {
      email: payload.email,
      password: payload.password,
    }, {
      withCredentials: true,
    })
    .then((res) => {
      commit("setMe", res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  },
  logOut({ commit }) {
<<<<<<< HEAD
    this.$axios.post('http://localhost:3005/user/logout', {}, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      commit("setMe", null);
    })
    .catch((err) => {
      console.error(err)
    })
  },
  signUp({ commit }, payload) {
    this.$axios.post('http://localhost:3005/user', {
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
    }, {
      withCredentials: true,
    })
    .then((res) => {
      commit("setMe", res.data);
    })
    .catch((err) => {
      console.error(err);
    })
    
=======
    commit("setMe", null);
>>>>>>> 9d415e8f8fdf9b4c77f26b9d37a1955564221aa2
  }
};
