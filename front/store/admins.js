export const state = () => ({
    postTypes: [],
    postSubjects: []
  });
  
  export const mutations = {
    addPostType(state, payload) {
      state.postTypes.unshift(payload);
    },
    loadPostTypes(state, payload) {
      state.postTypes = payload;
    }
  };
  
  export const actions = {
    async addPostType({ commit }, payload) {
      try {
        const res = await this.$axios.post("http://localhost:3005/postCharacters/postType", {
          postType: payload.postType
        },{
          withCredentials: true
        });
        commit("addPostType", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    async loadPostTypes({ commit }) {
      try {
        const res = await this.$axios.get("http://localhost:3005/postCharacters/postType", {
          withCredentials: true
        });
        commit("loadPostTypes", res.data);
      } catch(err) {
        console.error(err);
      }
    }
  };
  