import Vue from 'vue';
import throttle from 'lodash.throttle';

export const state = () => ({
  topPosts: [],
  mainPosts: [],
  userComments: [],
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
  concatCropImagesPaths(state, payload) {
    state.imagePaths.splice(payload.index, 1, payload.result);
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
  countComments(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    Vue.set(state.mainPosts[index], 'countComments', payload.data);
  },
  loadUserComments(state, payload) {
    state.userComments = payload;
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

  // Comment like, dislike
  likeComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const commentIndex = state.mainPosts[index].Comments.findIndex(
      v => v.id === payload.commentId
    );
    state.mainPosts[index].Comments[commentIndex].Likers.push({
      id: payload.userId
    });
  },
  unlikeComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const thePost = state.mainPosts[index];
    const commentIndex = thePost.Comments.findIndex(
      v => v.id === payload.commentId
    );
    const userIndex = thePost.Comments[commentIndex].Likers.findIndex(
      v => v.id === payload.userId
    );
    thePost.Comments[commentIndex].Likers.splice(userIndex, 1);
  },
  dislikeComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const commentIndex = state.mainPosts[index].Comments.findIndex(
      v => v.id === payload.commentId
    );
    state.mainPosts[index].Comments[commentIndex].Dislikers.push({
      id: payload.userId
    });
  },
  undislikeComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const thePost = state.mainPosts[index];
    const commentIndex = thePost.Comments.findIndex(
      v => v.id === payload.commentId
    );
    const userIndex = thePost.Comments[commentIndex].Dislikers.findIndex(
      v => v.id === payload.userId
    );
    thePost.Comments[commentIndex].Dislikers.splice(userIndex, 1);
  },

  // 사용자 페이지 comment load
  loadUserComments(state, payload) {
    state.comments = payload;
  },
  removeUserComment(state, payload) {
    const index = state.comments.findIndex(v => v.id === payload.id);
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
  async loadTopPosts({ commit }, payload) {
    try {
      const res = await this.$axios.get('posts/loadTopPosts', {
        withCredentials: true
      });
      console.log(res.data);
      commit('loadTopPosts', res.data);
    } catch (err) {
      console.error(err);
    }
  },

  addPost({ commit, state }, payload) {
    this.$axios
      .post(
        '/post',
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

  async loadPost({ commit }, payload) {
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
        const res = await this.$axios.get(
          `/posts/${payload.postTypeId}?limit=10`
        );
        commit('loadPosts', {
          data: res.data,
          reset: true
        });
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const resPosts = await this.$axios.get(
          `/posts/${payload.postTypeId}?lastId=${lastPost &&
            lastPost.id}&limit=${limit}`
        );
        commit('loadPosts', { data: resPosts.data });
      }
    } catch (err) {
      console.error(err);
    }
  }, 3000),

  loadSearchPosts: throttle(async function({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.post(
          `/posts/loadSearchPosts?limit=10`,
          {
            postTypeId: payload.postTypeId,
            postSubjectId: payload.postSubjectId,
            postCategoryId: payload.postCategoryId
          },
          {
            withCredentials: true
          }
        );
        commit('loadPosts', {
          data: res.data,
          reset: true
        });
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        const resPosts = await this.$axios.post(
          `/posts/loadSearchPosts?lastId=${lastPost &&
            lastPost.id}&limit=${limit}`,
          {
            postTypeId: payload.postTypeId,
            postSubjectId: payload.postSubjectId,
            postCategoryId: payload.postCategoryId
          },
          {
            withCredentials: true
          }
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

  loadFilterdPosts: throttle(async function({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(
          `/posts?limit=10&postTypeId=${paload.postTypeId}&postSubjectId=${post}`
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
        console.log(res);
        commit('concatImagesPaths', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  uploadCropImages({ commit }, payload) {
    //console.log("store : uploadCropImages => payload.imageFormData", payload.imageFormData);
    this.$axios
      .post('/post/images', payload.imageFormData, {
        withCredentials: true
      })
      .then(res => {
        //console.log("res from uploadCropImages",res);
        commit('concatCropImagesPaths', {
          result: res.data[0],
          index: payload.index
        });
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
      const res = await this.$axios.get(
        `/post/${payload.postId}/comments?limit=10&page=${payload.page}`
      );
      commit('loadComments', {
        postId: Number(payload.postId),
        data: res.data
      });
    } catch (err) {
      console.error(err);
    }
  },

  async countComments({ commit }, payload) {
    try {
      const res = await this.$axios.get(
        `/post/${payload.postId}/countComments`
      );
      commit('countComments', {
        postId: Number(payload.postId),
        data: res.data
      });
    } catch (err) {
      console.error(err);
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
      commit('removeComment', {
        postId: payload.postId,
        commentId: payload.commentId
      });
    } catch (err) {
      console.error(err);
    }
  },

  // Comment like
  async likeComment({ commit }, payload) {
    try {
      const res = await this.$axios.post(
        `/comment/${payload.commentId}/like`,
        {},
        {
          withCredentials: true
        }
      );
      commit('likeComment', {
        userId: res.data.userId,
        commentId: payload.commentId,
        postId: payload.postId
      });
    } catch (err) {
      console.error(err);
    }
  },

  async unlikeComment({ commit }, payload) {
    try {
      const res = await this.$axios.delete(
        `/comment/${payload.commentId}/like`,
        {
          withCredentials: true
        }
      );
      commit('unlikeComment', {
        userId: res.data.userId,
        commentId: payload.commentId,
        postId: payload.postId
      });
    } catch (err) {
      console.error(err);
    }
  },

  // async countLikers({ commit }, payload) {
  //   try {
  //     const res = await this.$axios.get(
  //       `/comment/${payload.commentId}/countLikers`,
  //       {
  //         withCredentials: true
  //       }
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  async dislikeComment({ commit }, payload) {
    try {
      const res = await this.$axios.post(
        `/comment/${payload.commentId}/dislike`,
        {},
        {
          withCredentials: true
        }
      );
      commit('dislikeComment', {
        userId: res.data.userId,
        commentId: payload.commentId,
        postId: payload.postId
      });
    } catch (err) {
      console.error(err);
    }
  },

  async undislikeComment({ commit }, payload) {
    try {
      const res = await this.$axios.delete(
        `/comment/${payload.commentId}/dislike`,
        {
          withCredentials: true
        }
      );
      commit('undislikeComment', {
        userId: res.data.userId,
        commentId: payload.commentId,
        postId: payload.postId
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
