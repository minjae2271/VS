export const state =() => ({
    me: null
});

export const mutations = {
    setMe(state, payload){
        state.me = payload;
    },
    unsetMe(state){
        state.me = null;
    },
    signUp(state){
        
    }
};

export const actions = {
    logIn({commit}, payload){
        commit('setMe', payload);
    },
    logOut({commit}){
        commit('unsetMe');
    },
    signUp({commit}, payload){
        commit('setMe', payload);
    }
}