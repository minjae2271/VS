export const state = () => ({

});

export const mutations = {

};

export const actions = {
  async nuxtServerInit({ commit, dispatch, state }, { req }) {
    await dispatch('admins/loadPostCategories');
    await dispatch('admins/loadPostSubjects');
    await dispatch('admins/loadPostTypes');
    return dispatch('users/loadUser');
  },
};
