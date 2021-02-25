export const state = () => ({
    mainPosts: [],
    imagePaths: []
})

export const mutations = {
    addPost(state, payload){
        state.mainPosts.unshift(payload)
    },
    concatImagePaths(state, payload){
        state.imagePaths = state.imagePaths.concat(payload);
    }
}

export const actions = {
    addPost({commit}, payload){
        commit('addPost', {
            content1: payload.content1,
            content2: payload.content2,
            image: state.imagePaths
        })
    },
    uploadImages({commit}, payload){
        commit('concatImagePaths', payload);
    }
}