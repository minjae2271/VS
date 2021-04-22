import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  mainPosts: [],
  mainHashtags: [],
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
  loadComments(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    Vue.set(state.mainPosts[index], 'Comments', payload.data);
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadPost(state, payload) {
    state.mainPosts = [payload];
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
    state.imagePaths.splice(payload, 1);
  },
  loadPicks(state, payload) {
    const index = state.mainPosts.findIndex((element) => element.id === payload.postId);
    Vue.set(state.mainPosts[index], 'Picks', payload.data);   
  },
  pickContent(state, payload) {
    console.log(payload);
    const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[index].Picks.unshift(payload);
  }
};

export const actions = {
  addPost({ commit, state }, payload) {
    this.$axios
      .post(
        'http://localhost:3005/post',
        {
          postType: payload.postType,
          postCategory: payload.postCategory,
          title: payload.title,
          content1: payload.content1,
          content2: payload.content2,
          condition: payload.condition,
          hashtag: payload.hashtag,
          image: state.imagePaths
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        commit('addMainPost', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },

  remove({ commit }, payload) {
    commit('removeMainPost', payload);
  },

  async pickContent({ commit }, payload) {
    try{
      const res = await this.$axios.post(
        `/post/${payload.postId}/pick`,
        { contentNum: payload.contentNum},
        { withCredentials: true }
      );
      commit('pickContent', res.data);
    }catch(err){
      console.error(err);
    }
  },

  async loadPicks({ commit }, payload){
    try{
      const res = await this.$axios.get(`/post/${payload.postId}/picks`);
      commit('loadPicks', {
        postId: Number(payload.postId),
        data: res.data
      });
    } catch(err){
      console.error(err);
    }
  },

  async addComment({ commit }, payload) {
    try {
      const res = await this.$axios.post(
        `/post/${payload.postId}/comment`,
        { content: payload.content },
        { withCredentials: true }
      );
      commit('addComment', res.data);
    } catch (err) {
      console.error(err);
    }
  },

  async loadComments({ commit }, payload) {
    try {
      const res = await this.$axios.get(`/post/${payload.postId}/comments`);
      commit('loadComments', {
        postId: Number(payload.postId),
        data: res.data
      });
    } catch (err) {
      console.error(err);
    }
  },

  async loadHashtags({ commit }, payload) {
    try {
      const resHashtags = await this.$axios.get(
        'http://localhost:3005/hashtags/'
      );
      commit('loadHashtags', resHashtags.data);
    } catch(err) {
      console.error(err);
    }
  },

  async loadPost({ commit, state }, payload) {
    try {
      const res = await this.$axios.get(`/post/${payload}`);
      commit('loadPost', res.data);
    } catch (err) {
      console.error(err);
    }
  },

  loadPosts: throttle(async function({ commit, state }) {
    try {
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const resPosts = await this.$axios.get(
          `http://localhost:3005/posts?lastId=${lastPost &&
            lastPost.id}&limit=${limit}`
        );
        commit('loadPosts', resPosts.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, 3000),

  uploadImages({ commit }, payload) {
    this.$axios
      .post('http://localhost:3005/post/images', payload, {
        withCredentials: true
      })
      .then(res => {
        commit('concatImagesPaths', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
};
