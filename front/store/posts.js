import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  topPosts: [],
  mainPosts: [],
  comments: [],
  updatePost: [],
  mainHashtags: [],
  hasMorePost: true, //쓸데없는 요청을 막는 것.
  imagePaths: [],
  updateImagePaths: []
});

const limit = 9;

export const mutations = {
  loadTopPosts(state, payload) {
    state.topPosts = payload;
  },

  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
    state.imagePaths = [];
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(index, 1);
  },

  loadPost(state, payload) {
    state.mainPosts = [payload];
    state.updatePost = payload;
  },

  loadPosts(state, payload) {
    if (payload.reset) {
      state.mainPosts = payload.data;
    } else {
      state.mainPosts = state.mainPosts.concat(payload.data);
    }
    state.hasMorePost = payload.data.length === limit;
  },
  loadHashtags(state, payload) {
    state.mainHashtags = payload;
  },
  concatImagesPaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  concatUpdateImagesPaths(state, payload) {
    state.updateImagePaths = state.updateImagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  },

  setUpdateImagePath(state, payload) {
    state.updateImagePaths = payload;
  },
  removeUpdateImagePath(state, payload) {
    state.updateImagePaths.splice(payload, 1);
  },

  // Comment CRUD
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadComments(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    Vue.set(state.mainPosts[index], 'Comments', payload.data);
  },
  loadUserComments(state, payload) {
    state.comments = payload;
  },
  editComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const commentIndex = state.mainPosts[index].Comments.findIndex(
      v => v.id === payload.commentId
    );
    state.mainPosts[index].Comments[commentIndex].content = payload.content;
  },
  removeComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const commentIndex = state.mainPosts[index].Comments.findIndex(
      v => v.id === payload.commentId
    );
    state.mainPosts[index].Comments.splice(commentIndex, 1);
  },
  removeUserComment(state, payload) {
    state.comments.findIndex(v=> v.id===payload.id);
    state.comments.splice(index, 1);
  },

  // Pick
  loadPicks(state, payload) {
    const index = state.mainPosts.findIndex(
      element => element.id === payload.postId
    );
    Vue.set(state.mainPosts[index], 'Picks', payload.data);
  },
  pickContent(state, payload) {
    console.log(payload);
    const index = state.mainPosts.findIndex(v => v.id === payload.PostId);
    state.mainPosts[index].Picks.unshift(payload);
  }
};

export const actions = {
  async loadTopPosts({ commit }, payload){
    try{
      const res = await this.$axios.get('posts/loadTopPosts', {
        withCredentials: true
      });
      console.log(res.data);
      commit('loadTopPosts', res.data);
    }catch(err){
      console.error(err);
    }
  },

  addPost({ commit, state }, payload) {
    this.$axios
      .post(
        'http://localhost:3005/post',
        {
          postType: payload.postType,
          postSubject: payload.postSubject,
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

  async updatePost({ commit }, payload) {
    try {
      console.log('update~');
      const res = await this.$axios.patch(`/post/${payload.postId}/update`, {
        withCredentials: true
      });
      //redirect
    } catch (err) {
      console.error(err);
    }
  },

  async removePost({ commit }, payload) {
    try {
      const res = await this.$axios.delete(`/post/${payload.postId}`, {
        withCredentials: true
      });
      commit('removeMainPost', res.data);
    } catch (err) {
      console.error(err);
    }
  },

  async loadHashtags({ commit }, payload) {
    try {
      const resHashtags = await this.$axios.get('/hashtags/');
      commit('loadHashtags', resHashtags.data);
    } catch (err) {
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

  loadPosts: throttle(async function({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts?limit=10`);
        commit('loadPosts', {
          data: res.data,
          reset: true
        });
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const resPosts = await this.$axios.get(
          `/posts?lastId=${lastPost && lastPost.id}&limit=${limit}`
        );
        commit('loadPosts', { data: resPosts.data });
      }
    } catch (err) {
      console.error(err);
    }
  }, 3000),

  loadUserPosts: throttle(async function({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(
          `user/${payload.userId}/posts?limit=10`
        );
        commit('loadPosts', {
          data: res.data,
          reset: true
        });
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const res = await this.$axios.get(
          `user/${payload.userId}/posts?lastId=${lastPost &&
            lastPost.id}&limit=10`
        );
        commit('loadPosts', {
          data: res.data
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, 3000),

  uploadImages({ commit }, payload) {
    this.$axios
      .post('/post/images', payload, { withCredentials: true })
      .then(res => {
        commit('concatImagesPaths', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },

  updateImages({ commit }, payload) {
    this.$axios
      .post('/post/images', payload, {
        withCredentials: true
      })
      .then(res => {
        commit('concatUpdateImagesPaths', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },

  // Actions: Comment CRUD

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

  async loadUserComments({ commit }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`user/${payload.userId}/comments`);
        commit('loadUserComments', res.data);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async editComment({ commit }, payload) {
    try {
      const res = await this.$axios.patch(
        `/post/comment/${payload.commentId}`,
        { content: payload.content },
        { withCredentials: true }
      );
      commit('editComment', {
        postId: payload.postId,
        commentId: payload.commentId,
        content: res.data
      });
    } catch (e) {
      console.error(e);
    }
  },

  async removeComment({ commit }, payload) {
    try {
      await this.$axios.delete(`/post/comment/${payload.commentId}`, {
        withCredentials: true
      });
      console.log('store/posts.js > actions > removeComment', payload);
      commit('removeComment', {
        postId: payload.postId,
        commentId: payload.commentId
      });
    } catch (err) {
      console.error(err);
    }
  },

  // Pick
  async pickContent({ commit }, payload) {
    try {
      const res = await this.$axios.post(
        `/post/${payload.postId}/pick`,
        { contentNum: payload.contentNum },
        { withCredentials: true }
      );
      commit('pickContent', res.data);
    } catch (err) {
      console.error(err);
    }
  },

  async loadPicks({ commit }, payload) {
    try {
      const res = await this.$axios.get(`/post/${payload.postId}/picks`);
      commit('loadPicks', {
        postId: Number(payload.postId),
        data: res.data
      });
    } catch (err) {
      console.error(err);
    }
  }
};
