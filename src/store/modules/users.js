export default {
  namespaced: true,

  state: () => ({
    users: [],
  }),
  mutations: {
    UPDATE_USERS(state, value) {
      state.users = value;
    },
    UPDATE_USER(state, value) {
      const userIndex = state.users.findIndex((user) => user.id === value.id);
      if (userIndex) state.users.splice(userIndex, 1, value);
    }
  },
  actions: {
    async loadUsers({commit}) {
      const response = await fetch('https://fakerapi.it/api/v1/persons?_locale=ru_RU');
      const users = (await response.json()).data;
      commit('UPDATE_USERS', users);
    },
    async updateUser({commit}, updatingUser) {
      //Имитация отправки запроса на сервер
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(commit('UPDATE_USER', updatingUser));
        }, 600);
      }) 
    },
  },
  getters: {
    formattedUsers: state => {
      return state.users.map(user => (
        {
        ...user,
        fullName: `${user.firstname} ${user.lastname}`,
        genderRu: user.gender === 'male' ? `мужской` : 'женский'
      }
    ));
    }
  }
}