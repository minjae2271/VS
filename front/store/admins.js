export const state = () => ({
<<<<<<< HEAD
    postTypes: [],
    postSubjects: [],
    postCategories: [],
  });
  
  export const mutations = {
    //postType
    addPostType(state, payload){
      state.postTypes.unshift(payload);
    },
    loadPostTypes(state, payload){
      state.postTypes = payload;
    },
    deletePostType(state, payload){
      const postTypeIndex = state.postTypes.findIndex(v => v.id === payload.postTypeId);
      state.postTypes.splice(postTypeIndex, 1);
    },
    //postSubject
    addPostSubject(state, payload){
      state.postSubjects.unshift(payload);
    },
    loadPostSubjects(state, payload){
      state.postSubjects = payload;
    },
    deletePostSubject(state, payload){
      const postSubjectIndex = state.postSubjects.findIndex(v => v.id === payload.postSubjectId);
      state.postSubjects.splice(postSubjectIndex, 1);
    },
    //postCategory
    addPostCategory(state, payload){
      state.postCategories.unshift(payload);
    },
    loadPostCategories(state, payload){
      state.postCategories = payload;
    },
    deletePostCategory(state, payload){
      const postCategoryIndex = state.postCategories.findIndex(v => v.id === payload.postCategoryId);
      state.postCategories.splice(postCategoryIndex, 1);
    }
  };
  
  export const actions = {
    //postType
    async addPostType({ commit }, payload){
      try {
        const res = await this.$axios.post('/postCharacters/postType', {
          postType: payload.postType
        },{
          withCredentials: true
        });
        commit('addPostType', res.data);
      } catch (err) {
        console.error(err);
      }
    },
    async loadPostTypes({ commit }){
      try {
        const res = await this.$axios.get('/postCharacters/postType', {
          withCredentials: true
        });
        commit('loadPostTypes', res.data);
      } catch(err) {
        console.error(err);
      }
    },
    async deletePostType({ commit }, payload){
      try{
        const res = await this.$axios.delete(`/postCharacters/${payload.postTypeId}/postType`, {
          withCredentials: true
        });
        commit('deletePostType', {
          postTypeId: payload.postTypeId
        });
      }catch(err){
        console.error(err);        
      }
    },
    //postSubject
    async addPostSubject({ commit }, payload){
      try{
        const res = await this.$axios.post('/postCharacters/postSubject', {
=======
  postTypes: [],
  postSubjects: [],
  postCategories: []
});

export const mutations = {
  //postType
  addPostType(state, payload) {
    state.postTypes.unshift(payload);
  },
  loadPostTypes(state, payload) {
    state.postTypes = payload;
  },
  deletePostType(state, payload) {
    const postTypeIndex = state.postTypes.findIndex(
      v => v.id === payload.postTypeId
    );
    state.postTypes.splice(postTypeIndex, 1);
  },
  //postSubject
  addPostSubject(state, payload) {
    state.postSubjects.unshift(payload);
  },
  loadPostSubjects(state, payload) {
    state.postSubjects = payload;
  },
  deletePostSubject(state, payload) {
    const postSubjectIndex = state.postSubjects.findIndex(
      v => v.id === payload.postSubjectId
    );
    state.postSubjects.splice(postSubjectIndex, 1);
  },
  //postCategory
  addPostCategory(state, payload) {
    state.postCategories.unshift(payload);
  },
  loadPostCategories(state, payload) {
    state.postCategories = payload;
  },
  deletePostCategory(state, payload) {
    const postCategoryIndex = state.postCategories.findIndex(
      v => v.id === payload.postCategoryId
    );
    state.postCategories.splice(postCategoryIndex, 1);
  }
};

export const actions = {
  //postType
  async addPostType({ commit }, payload) {
    try {
      const res = await this.$axios.post(
        'http://localhost:3005/postCharacters/postType',
        {
          postType: payload.postType
        },
        {
          withCredentials: true
        }
      );
      commit('addPostType', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async loadPostTypes({ commit }) {
    try {
      const res = await this.$axios.get('postCharacters/postType', {
        withCredentials: true
      });
      commit('loadPostTypes', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async deletePostType({ commit }, payload) {
    try {
      const res = await this.$axios.delete(
        `postCharacters/${payload.postTypeId}/postType`,
        {
          withCredentials: true
        }
      );
      commit('deletePostType', {
        postTypeId: payload.postTypeId
      });
    } catch (err) {
      console.error(err);
    }
  },
  //postSubject
  async addPostSubject({ commit }, payload) {
    try {
      const res = await this.$axios.post(
        '/postCharacters/postSubject',
        {
>>>>>>> 23f56648821a6da09cc71f7507d08cb0f1e71794
          postTypeId: payload.postTypeId,
          postSubject: payload.postSubject
        },
        {
          withCredentials: true
<<<<<<< HEAD
        });
        commit('addPostSubject', res.data);
      }catch(err){
        console.error(err);
      }
    },
    async loadPostSubjects({ commit }){
      try{
        const res = await this.$axios.get('/postCharacters/postSubject', {
          withCredentials: true
        });
        commit('loadPostSubjects', res.data);
      }catch(err){
        console.error(err);
      }
    },
    async deletePostSubject({ commit }, payload){
      try{
        const res = await this.$axios.delete(`/postCharacters/${payload.postSubjectId}/postSubject`, {
          withCredentials: true
        });
        commit('deletePostSubject', {
          postSubjectId: payload.postSubjectId
        });
      }catch(err){
        console.error(err);
      }
    },
    //postCategory
    async addPostCategory({ commit }, payload){
      try{
        const res = await this.$axios.post('/postCharacters/postCategory', {
=======
        }
      );
      commit('addPostSubject', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async loadPostSubjects({ commit }) {
    try {
      const res = await this.$axios.get(
        'http://localhost:3005/postCharacters/postSubject',
        {
          withCredentials: true
        }
      );
      commit('loadPostSubjects', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async deletePostSubject({ commit }, payload) {
    try {
      const res = await this.$axios.delete(
        `http://localhost:3005/postCharacters/${payload.postSubjectId}/postSubject`,
        {
          withCredentials: true
        }
      );
      commit('deletePostSubject', {
        postSubjectId: payload.postSubjectId
      });
    } catch (err) {
      console.error(err);
    }
  },
  //postCategory
  async addPostCategory({ commit }, payload) {
    try {
      const res = await this.$axios.post(
        'http://localhost:3005/postCharacters/postCategory',
        {
>>>>>>> 23f56648821a6da09cc71f7507d08cb0f1e71794
          postCategory: payload.postCategory
        },
        {
          withCredentials: true
<<<<<<< HEAD
        });
        commit('addPostCategory', res.data);
      }catch(err){
        console.error(err);
      }
    },
    async loadPostCategories({ commit }){
      try{
        const res = await this.$axios.get('/postCharacters/postCategory', {
          withCredentials: true
        });
        commit('loadPostCategories', res.data);
      }catch(err){
        console.error(err);
      }
    },
    async deletePostCategory({ commit }, payload){
      try{
        const res = await this.$axios.delete(`/postCharacters/${payload.postCategoryId}/postCategory`, {
=======
        }
      );
      commit('addPostCategory', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async loadPostCategories({ commit }) {
    try {
      const res = await this.$axios.get(
        'http://localhost:3005/postCharacters/postCategory',
        {
          withCredentials: true
        }
      );
      commit('loadPostCategories', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async deletePostCategory({ commit }, payload) {
    try {
      const res = await this.$axios.delete(
        `http://localhost:3005/postCharacters/${payload.postCategoryId}/postCategory`,
        {
>>>>>>> 23f56648821a6da09cc71f7507d08cb0f1e71794
          withCredentials: true
        }
      );
      commit('deletePostCategory', {
        postCategoryId: payload.postCategoryId
      });
    } catch (err) {
      console.error(err);
    }
  }
};
