export const state = () => ({
  mainPosts: [

  ],
  // hasMorePost: true, //쓸데없는 요청을 막는 것.
  imagePaths: []
});

// const totalPosts = 51;
// const limit = 10;

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(index, 1);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadComments(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments = payload;
  },
  loadPosts(state, payload) {
    state.mainPosts = state.mainPosts.concat(payload);
    // state.hasMorePost = payload.length === limit;
  },
  concatImagesPaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
    console.log(state.imagePaths);
  },
  removeImagePath(state, payload) {
    console.log(payload);
    state.imagePaths.splice(payload, 1);
  }
};

export const actions = {
  addPost({ commit, state }, payload) {
    this.$axios.post('http://localhost:3005/post', {
      postType: payload.postType,
      postCategory: payload.postCategory,
      title: payload.title,
      content1: payload.content1,
      content2: payload.content2,
      hashtag: payload.hashtag,
      image: state.imagePaths,
    }, {
      withCredentials: true,
    })
    .then((res) => {
      commit("addMainPost", res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  },

  remove({ commit }, payload) {
    commit("removeMainPost", payload);
  },

  addComment({ commit }, payload) {
    commit("addComment", payload);
  },

  loadComments({ commit }, payload) {
    commit("loadComments", payload);
  },

  loadPosts({ commit}) {
    this.$axios.get('http://localhost:3005/posts')
    .then((res) => {
      commit("loadPosts", res.data);
    })
    .catch((err) => {
      console.error(err);
    })
    
  },

  uploadImages({ commit }, payload) {
    this.$axios.post('http://localhost:3005/post/images', payload, {
      withCredentials: true,
    })
    .then((res) => {
      commit("concatImagesPaths", res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  }
};
