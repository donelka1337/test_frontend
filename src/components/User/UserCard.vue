<template>
  <v-card
    max-width="600"
    v-if="user"
  >
  <v-card-title>Информация о пользователе</v-card-title>
  <div class="user-info">
    <v-card-title>Основная информация</v-card-title>
    <div class="user-info__primary">
      <v-img
        class="photo"
        :src=user.image
        alt="Фото пользователя"
      />
      <div>
          <v-list-item
            v-for="field in primaryFields"
            :key="field.field"
            two-line
          >
          <v-list-item-content
            v-if="user[field.field]"
          >
            <v-list-item-title>{{field.name}}</v-list-item-title>
            <v-list-item-subtitle>{{user[field.field]}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
    <v-card-title>Дополнительная информация</v-card-title>
    <div class="user-info__secondary">
      <div
        v-if="user.address"
        class="living-place"
      >
        <v-card-subtitle>Место проживания</v-card-subtitle>
        <div
          class="living-place__fields"
        >
          <v-list-item
            class="address-field"
            v-for="field in addressFields"
            :key="field.field"
            two-line
          >
            <v-list-item-content
              v-if="user.address[field.field]"
            >
              <v-list-item-title>{{field.name}}</v-list-item-title>
              <v-list-item-subtitle>{{user.address[field.field]}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </div>
      <div
        v-if="user.website"
      >
        <v-list-item
          two-line
        >
          <v-list-item-content>
            <v-list-item-title>Веб сайт</v-list-item-title>
            <v-list-item-subtitle>{{user.website}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </div>
  </div>
    <v-card-actions>
      <v-btn
        text
        @click="$emit('edit-user', user.id)"
      >
        Редактировать
      </v-btn>
    </v-card-actions>
  </v-card> 
</template>
<script>
  export default {
    name: "UserCard",
    props: {
      user: {type: Object, default: null},
    },
    data: () => ({
      primaryFields: [
        {
        name: 'Имя',
        field: 'fullName'
        },
        {
        name: 'Телефон',
        field: 'phone'
        },
        {
        name: 'Email',
        field: 'email'
        },
        {
        name: 'Пол',
        field: 'genderRu'
        },
        {
        name: 'Дата рождения',
        field: 'birthday'
        }
      ],
      addressFields: [
        {
          name: 'Страна',
          field: 'country'
        },
        {
          name: 'Код страны',
          field: 'county_code'
        },
        {
          name: 'Название улицы',
          field: 'streetName'
        },
        {
          name: 'Улица',
          field: 'street'
        },
        {
          name: 'ZIP-код',
          field: 'zipcode'
        },

      ]
    })
  };
</script>
<style lang="scss">
  .user-info {
    &__primary {
      display:flex;
      gap: 10px;
    }

    &__primary .photo {
      height: 320px;
      width: 240px; 
    }

    .living-place{
      &__fields {
        display:flex;
        flex-wrap: wrap;
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
    }
  }
</style>
  