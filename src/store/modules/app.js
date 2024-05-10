export default {
    namespaced: true,

    state: () => ({
        loading: false,
    }),
    mutations: {
        TOGGLE_PRELOADER(state, value) {
            state.loading = value;
        }
    },
    actions: {
        togglePreloader({commit}, value) {
            commit('TOGGLE_PRELOADER', value)
        }
    }
}