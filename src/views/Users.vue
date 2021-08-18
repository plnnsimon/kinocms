<template>
  <div>
    <Spinner v-if="loading" />
    <div class="table">
      <table id="table" v-if="!loading">
        <thead>
          <tr>
            <td>ID</td>
            <td>Дата регистрации</td>
            <td>День рождения</td>
            <td>Email</td>
            <td>Телефон</td>
            <td>ФИО</td>
            <td>Псевдоним</td>
            <td>Город</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) of users" :key="index">
            <td>{{ user.userId }}</td>
            <td>{{ user.registrationDate }}</td>
            <td>{{ user.birthDate }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.name + " " + user.surname }}</td>
            <td>{{ user.nickname }}</td>
            <td>{{ user.city }}</td>
            <i
              ref="editNewsInfo"
              @click="editUser(user)"
              class="fas fa-pen"
              style="right: -20px"
            ></i>
            <i
              @click="deleteUser(user)"
              class="fas fa-trash-alt"
              style="right: -45px"
            ></i>
          </tr>
        </tbody>
      </table>
      <p v-if="users.length == 0">Пользователей нету</p>
    </div>
    <div class="editingUser-container" v-if="isEditingUser">
      <div class="editingUser">
        <div>
          <label for="name">Имя</label>
          <input type="text" id="name" v-model="editingUser.name" />
        </div>
        <div>
          <label for="surname">Фамилия</label>
          <input type="text" id="surname" v-model="editingUser.surname" />
        </div>
        <div>
          <label for="phoneNumber">Телефон</label>
          <input
            type="text"
            id="phoneNumber"
            v-model="editingUser.phoneNumber"
          />
        </div>
        <div>
          <label for="nickname">Псевдоним</label>
          <input type="text" id="nickname" v-model="editingUser.nickname" />
        </div>
      </div>
      <button @click="updateUser" class="btn btn-primary">{{ $t("update") }}</button>
    </div>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import $ from "jquery";

export default {
  name: "Users",
  components: {
    Spinner,
  },
  data() {
    return {
      isEditingUser: false,
      editingUser: null,
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  mounted() {
    this.$store.dispatch("loadUsers");
    setTimeout(() => this.getTable(), 1000);
  },
  methods: {
    getTable() {
      $(document).ready(function () {
        $("#table").DataTable({
          columns: [
            { visible: true }, //col 2
            { visible: true }, //col 2
            { visible: true }, //col 3
            { visible: true }, //col 4
            { visible: true }, //col 5
            { visible: true }, //col 6
            { visible: true }, //col 7
            { visible: true }, //col 8
          ],
        });
      });
    },
    deleteUser(user) {
      if (confirm("delete user?")) {
        this.$store.dispatch("removeUser", user.userId);
      } else {
        return;
      }
    },
    editUser(user) {
      this.isEditingUser = true;
      this.editingUser = user;
    },
    async updateUser() {
      this.$store.dispatch("updateUser", this.editingUser)
      this.$store.dispatch("loadUsers");
      this.isEditingUser = false;
      await this.getTable()
    }
  },
};
</script>

<style scoped>
.table {
  width: 1060px;
  position: relative;
  margin: 30px 20px 0 40px;
  align-self: start;
}
.table td {
  border-width: 2px;
}
table i {
  position: absolute;
  cursor: pointer;
}
table i:hover {
  color: rgb(117, 117, 117);
}
.editingUser {
  display: flex;
  max-width: 80%;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px 5px;
  margin-left: 20px;
}
.editingUser-container button {
  margin: auto;
}
</style>