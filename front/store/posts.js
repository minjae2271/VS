export const state = () => ({
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "Murpick User1"
      },
      content: "첫번째 임시 게시물",
      Comments: [
        {
          id: 1,
          postId: 1,
          content: "좋은글이네",
          User: { id: 2, nickname: "Murpick User2" }
        },
        {
          id: 2,
          postId: 1,
          content: "고맙다",
          User: { id: 1, nickname: "Murpick User1" }
        }
      ],
      Images: []
    },
    {
      id: 2,
      User: {
        id: 2,
        nickname: "Murpick User2"
      },
      content: "두번째 임시 게시물",
      Comments: [],
      Images: []
    },
    {
      id: 3,
      User: {
        id: 1,
        nickname: "Murpick User1"
      },
      content: "세번째 임시 게시물",
      Comments: [],
      Images: []
    }
  ],
  hasMorePost: true, //쓸데없는 요청을 막는 것.
  imagePaths: []
});

const totalPosts = 51;
const limit = 10;

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
  concatImagesPaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  }
};

export const actions = {
  add({ commit, state }, payload) {
    commit("addMainPost", payload);
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

  loadPosts({ commit, state }, payload) {
    commit("loadPosts", payload);
  },

  uploadImages({ commit }, payload) {
    commit("concatImagesPaths", payload);
  }
};
