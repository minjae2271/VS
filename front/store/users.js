export const state = () => ({
  me: null,
  authNum: null
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  authNum(state, payload){
    state.authNum = payload;
  }
};

export const actions = {
  async loadUser({ commit }) {
    try {
      const res = await this.$axios.get("/user", {
        withCredentials: true
      });
      commit("setMe", res.data);
    } catch (err) {
      console.error(err);
    }
  },
  sendEmail({commit}, payload){
    this.$axios.post("/auth/mail",{
      email: payload.email,
    }, {
      withCredentials: true
    })
    .then(res => {
      commit("authNum", res.data);
    })
    .catch(err => {
      console.error(err);
    })
  },
  signUp({ commit }, payload) {
    this.$axios
      .post(
        "/user",
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
        commit("setMe", null);
      })
      .catch(err => {
        console.error(err);
      });
  },
  kakaoLogIn({ commit }, payload) {
    this.$axios
    .post("http://localhost:3005/user/kakaoLogIn", {
      email: payload.email,
      nickname: payload.nickname,
      profile_image_url: payload.profile_image_url,
    },{
      withCredentials: true
    })
    .then(res => {
      commit("setMe", res.data);
    })
    .catch(err => {
      console.error(err);
    })
  }
};
