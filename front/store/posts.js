export const state = () => ({
  mainPosts: [
    {
      id: 1,
      title: "군대 현역인 사람 들어와",
      User: {
        id: 1,
        nickname: "Murpick User1"
      },
      contents: ["10억", "전역"],
      conditions: "1. 현재 전역을 3일 앞둔 말년병장일 때",
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
    console.log(state.imagePaths);
  },
  removeImagePath(state, payload) {
    console.log(payload);
    state.imagePaths.splice(payload, 1);
  }
};

export const actions = {
  addPost({ commit, state }, payload) {
    this.$axios.post('http://localhost:3005/post/images', {
      postType: payload.postType,
      title: payload.title,
      content1: payload.content1,
      content2: payload.content2,
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

  loadPosts({ commit, state }, payload) {
    commit("loadPosts", payload);
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
