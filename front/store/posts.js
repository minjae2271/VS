import Vue from 'vue';;
import throttle from 'lodash.throttle';

export const state = () => ({
  mainPosts: [

  ],
  mainHashtags: [

  ],
  hasMorePost: true, //쓸데없는 요청을 막는 것.
  imagePaths: []
});

const limit = 9;

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
    state.hasMorePost = payload.length === limit;
  },
  loadHashtags(state, payload) {
    state.mainHashtags = payload;
  },
  concatImagesPaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
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

  loadPosts: throttle( async function({ commit, state}) {
    try{
      if(state.hasMorePost){
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const resPosts = await this.$axios.get(`http://localhost:3005/posts?lastId=${lastPost && lastPost.id}&limit=${limit}`);
        const resHashtags = await this.$axios.get('http://localhost:3005/hashtags/');
        commit("loadPosts", resPosts.data);
        commit("loadHashtags", resHashtags.data);
      }
    } catch(err){
      console.error(err);
    }
  }, 3000),

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
  },
};
