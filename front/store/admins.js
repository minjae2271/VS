export const state = () => ({
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
    //postSubject
    addPostSubject(state, payload){
      state.postSubjects.unshift(payload);
    },
    loadPostSubjects(state, payload){
      state.postSubjects = payload;
    },
    //postCategory
    addPostCategory(state, payload){
      state.postCategories.unshift(payload);
    },
    loadPostCategories(state, payload){
      state.postCategories = payload;
    }
  };
  
  export const actions = {
    //postType
    async addPostType({ commit }, payload){
      try {
        const res = await this.$axios.post('http://localhost:3005/postCharacters/postType', {
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
        const res = await this.$axios.get('http://localhost:3005/postCharacters/postType', {
          withCredentials: true
        });
        commit('loadPostTypes', res.data);
      } catch(err) {
        console.error(err);
      }
    },
    //postSubject
    async addPostSubject({ commit }, payload){
      try{
        const res = await this.$axios.post('http://localhost:3005/postCharacters/postSubject', {
          postTypeId: payload.postTypeId,
          postSubject: payload.postSubject
        }, {
          withCredentials: true
        });
        commit('addPostSubject', res.data);
      }catch(err){
        console.error(err);
      }
    },
    async loadPostSubjects({ commit }){
      try{
        const res = await this.$axios.get('http://localhost:3005/postCharacters/postSubject', {
          withCredentials: true
        });
        commit('loadPostSubjects', res.data);
      }catch(err){
        console.error(err);
      }
    },
    //postCategory
    async addPostCategory({ commit }, payload){
      try{
        const res = await this.$axios.post('http://localhost:3005/postCharacters/postCategory', {
          postCategory: payload.postCategory
        },{
          withCredentials: true
        });
        commit('addPostCategory', res.data);
      }catch(err){
        console.error(err);
      }
    },
    async loadPostCategories({ commit }){
      try{
        const res = await this.$axios.get('http://localhost:3005/postCharacters/postCategory', {
          withCredentials: true
        });
        commit('loadPostCategories', res.data);
      }catch(err){
        console.error(err);
      }
    }
  };
  