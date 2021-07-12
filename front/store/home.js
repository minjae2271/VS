import Vue from 'vue';

export default {
    state : {
        mainBanner : []
    },
    mutations : {
        setMainBanner(state, payload){
            state.mainBanner = [].concat(payload);
        }
    },
    actions : {
        async loadMainBanner({commit}){
            try{
                const res = await this.$axios.get('https://picsum.photos/v2/list?limit=5');
                commit('setMainBanner', res.data);
            }
            catch(err){

            }
        }
    }
}