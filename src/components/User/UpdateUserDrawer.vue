<template>
  <v-navigation-drawer
    v-if="user"
    width="700"
    right
    app
    v-model="isOpened"
  >
    <div class="drawer-content">
      <div class="drawer-header">
        <h1>Редактирование пользователя</h1>
        <v-btn
          text
          @click="close"
        >
        Закрыть
        </v-btn>
      </div>
      <v-spacer/>
      <v-card-title>Основная информация</v-card-title>
      <div class="user-info-primary">
        <v-img
          class="photo"
          :src=user.image
          alt="Фото пользователя"
        />
        <div>
            <v-text-field
              v-model="userCopy.firstname"
              label="Имя"
            />
            <v-text-field
              v-model="userCopy.lastname"
              label="Фамилия"
            />
            <v-text-field
              v-model="userCopy.email"
              label="Email"
            />
            <v-select
              :value="userCopy.genderRu"
              :items="['мужской', 'женский']"
              label="Пол"
              @change="changeGender"
            />
            <v-text-field
              v-model="userCopy.phone"
              label="Телефон"
            />
        </div>
      </div>
      <v-card-title>Дополнительная информация</v-card-title>
      <div class="user-info-secondary">
        <v-text-field
          v-model="userCopy.website"
          label="Веб сайт"
        />
        <div
          v-if="user.address"
          class="living-place"
        >
          <v-card-subtitle>Место проживания</v-card-subtitle>
          <div
            v-if="userCopy.address"
            class="living-place__fields"
          >
            <v-text-field
              class="address-field"
              v-model="userCopy.address.country"
              label="Страна"
            />
            <v-text-field
              class="address-field"
              v-model="userCopy.address.county_code"
              label="Код страны"
            />
            <v-text-field
              class="address-field"
              v-model="userCopy.address.streetName"
              label="Название улицы"
            />
            <v-text-field
              class="address-field"
              v-model="userCopy.address.street"
              label="Улица"
            /> 
            <v-text-field
              class="address-field"
              v-model="userCopy.address.zipcode"
              label="ZIP-код"
            />
          </div>
        </div>
      </div>
      <div class="action-buttons">
        <v-btn
          text
          @click="updateUser"
        >
          Сохранить
        </v-btn>
        <v-btn
          text
          @click="close"
        >
          Отмена
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    userCopy: null,
    isOpened: false,
  }),
  props: {
    user: {type: Object, default: () => {}},
  },
  watch: {
    user: function(val) {
      if (val) this.userCopy = structuredClone(val);
    }
  },
  methods: {
    changeGender(gender) {
      this.userCopy.gender = gender === 'мужской' ? 'male' : 'female'
    },
    close() {
      this.isOpened = false;
      this.userCopy = structuredClone(this.user);
    },
    open() {
      this.isOpened = true;
    },
    updateUser() {
      this.$emit('save-user', this.userCopy);
      this.close();
    }
  }
}
</script>
<style lang="scss" scoped>
  .drawer-content {
    display: flex;
    flex-direction: column;
  }
  .drawer-header {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .user-info-primary {
    padding: 0 20px;
  }
  .user-info-secondary {
    padding: 0 20px;
  }
  .living-place {
    &__fields {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    & .address-field {
      width: 300px;
      flex-basis: 300px;
      ::v-deep .v-list-item__title {
        overflow-wrap: break-word
      }
      ::v-deep .v-list-item__subtitle {
        overflow-wrap: break-word
      }
    }
  }
  .action-buttons {
      padding: 0 20px;
      display: flex;
      flex-direction: row-reverse;
    }
</style>