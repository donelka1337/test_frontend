<template>
  <v-app>
    <app-preloader
      v-show="loading"
    />
    <v-main>
      <div
        class="page-content"
      >
        <div
          class="user-select"
        >
          <v-autocomplete
            v-model="selectedUserId"
            :items="formattedUsers"
            item-value="id"
            item-text="fullName"
          />
        </div>
        <user-card
          :user="selectedUser"
          @edit-user="updateUser"
        />
      </div>
      <update-user-drawer
        ref="update-user-drawer"
        :user="selectedUser"
        @save-user="saveUser"
      />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AppPreloader from './components/App/AppPreloader.vue';
import UpdateUserDrawer from './components/User/UpdateUserDrawer.vue';
import UserCard from './components/User/UserCard.vue';

export default {
  components: { AppPreloader, UserCard, UpdateUserDrawer },
  name: "App",

  data: () => ({
    users: {type: Array, default: () => []},
    selectedUserId: {type: Array, default: null},
  }),

  methods: {
    async getUsers() {
      try {
        this.$store.dispatch('app/togglePreloader', true);
        await this.$store.dispatch('users/loadUsers')
        this.$store.dispatch('app/togglePreloader', false);
      } catch(e) {
        console.error(e);
      }
    },
    updateUser() {
      this.$refs['update-user-drawer'].open();
    },
    async saveUser(user) {
      try {
        this.$store.dispatch('app/togglePreloader', true);
        await this.$store.dispatch('users/updateUser', user)
        this.$store.dispatch('app/togglePreloader', false);
      } catch(e) {
        console.error(e);
      }
    }
  },
  computed: {
    ...mapGetters({
      formattedUsers: 'users/formattedUsers'
    }),
    ...mapState({
      loading: (state) => state.app.loading
    }),
    selectedUser() {
      return this.formattedUsers.find(user => user.id === this.selectedUserId);
    }
  },
  async mounted() {
    await this.getUsers();
  }
};
</script>
<style scoped>
  .user-select{
    width: 200;
  }
  .page-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>