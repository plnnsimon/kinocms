<template>
  <div class="users">
    <Spinner v-if="loading" />
    <div class="userEditing">

    <EditUsers @closeEditingMenu="closeEditingMenu" v-if="isEditingUser" :user="user" />
    </div>
    <div class="table">
      <table id="table" >
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
            <td>{{ user.userId.substring(0,4)+'...' }}</td>
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
  </div>
</template>

<script>
import EditUsers from "../components/users/EditUsers"
import Spinner from "../components/Spinner";
import $ from "jquery";

export default {
  name: "Users",
  components: {
    Spinner,
    EditUsers
  },
  data() {
    return {
      isEditingUser: false,
      user: null
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
    setTimeout(() => this.getTable(), 1000)
      

  },
  methods: {
    async closeEditingMenu(data) {
      this.isEditingUser = data
      this.$store.dispatch("loadUsers");
      // setTimeout(() => this.getTable(), 1000);
    },
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
      this.user = user;
      console.log(user);
    },
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
.users {
  position: relative;
}
.userEditing {
  position: absolute;
    z-index: 9;
    background: white;
    width: 100%;
    top: -30px;
    padding: 0 30px;
}
</style>