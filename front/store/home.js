import Vue from 'vue';

export default {
    state : {
        mainBanner : [],
        topPosts: []
    },
    mutations : {
        setMainBanner(state, payload){
            state.mainBanner = [].concat(payload);
        },
        loadTopPosts(state, payload) {
            state.topPosts = payload;
        },
    },
    actions : {
        async loadMainBanner({commit}){
            try{
                const res = await this.$axios.get('https://picsum.photos/v2/list?limit=5');
                commit('setMainBanner', res.data);
            }
            catch(err){
                console.error(err);
            }
        },
        async loadTopPosts({ commit }, payload) {
            try {
              const res = await this.$axios.get('home/loadTopPosts', {
                withCredentials: true
              });
              console.log(res.data);
              commit('loadTopPosts', res.data);
            } catch (err) {
              console.error(err);
            }
          },
    }
}