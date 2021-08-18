<template>
  <div class="stats">
    <div>
      <div class="mailing-container">
        <h1>SMS</h1>
        <div class="sms-container">
          <div class="sms-container-inner">
            <p>Выбрать пользователей кому слать</p>
            <div class="sms-container-checkboxes">
              <div class="form-check">
                <input
                  class="form-check-input"
                  v-if="!someUsers"
                  v-model="allUsers"
                  id="allUsers"
                  type="checkbox"
                />
                <label class="form-check-label" for="allUsers"
                  >Все пользователи</label
                >
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  v-if="!allUsers"
                  v-model="someUsers"
                  id="someUsers"
                  type="checkbox"
                />
                <label class="form-check-label" for="someUsers"
                  >Выборочно</label
                >
                <button
                  v-if="someUsers"
                  @click="showUsers"
                  class="btn btn-secondary"
                >
                  Выбрать пользователей
                </button>
              </div>
            </div>
          </div>
          <div>
            <label for="textSms">Текст SMS</label>
            <p>Символов {{ symbols }}</p>
            <textarea
              class="form-control"
              @input="countSymbols"
              v-model="smsText"
              maxlength="50"
              name="text"
              id="textSms"
              cols="30"
              rows="10"
              placeholder="Введите текст"
            ></textarea>
          </div>
          <button class="btn btn-primary" @click="sendMessage">Send</button>
          <div v-if="isUsersShawn" class="usersList">
            <table id="table" class="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>Users</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.userId">
                  <td>
                    <input
                      :id="user.userId"
                      :value="user"
                      type="checkbox"
                      v-model="usersList"
                    />
                  </td>
                  <td>{{ user.email }}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-primary" @click="closeUsersList">
              Выбрать
            </button>
          </div>
          <p v-if="usersList.length > 0">
            Рассылка выполнена на:
            {{ (sendMessages / usersList.length) * 100 }} %
          </p>
          <p v-else>
            Рассылка выполнена на:
            {{ ((sendMessages / users.length) * 100).toFixed(0) }} %
          </p>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import $ from "jquery";

export default {
  name: "Mails",
  data() {
    return {
      symbols: 0,
      smsText: "",
      sendMessages: 0,
      usersList: [],
      allUsers: false,
      someUsers: false,
      isUsersShawn: false,
    };
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    getTable() {
      $(document).ready(function () {
        $("#table").DataTable({
          columns: [
            { visible: true }, //col 2
            { visible: true }, //col 3
          ],
        });
      });
    },
    countSymbols() {
      this.symbols = this.smsText.length;
      if (this.smsText.length == 50) {
        alert("no longer than 50 symbols");
      }
    },
    sendMessage() {
      firebase
        .database()
        .ref("notifications")
        .push(this.smsText)
        .catch((err) => console.log(err));
      this.sendMessages = 0;
      if (this.allUsers) {
        this.users.forEach((user) => {
          user.receivedMessages = this.smsText;
          firebase
            .database()
            .ref("users")
            .child(user.userId)
            .update(user)
            .then(() => {
              console.log("send successfully");
              this.sendMessages += 1;
            })
            .catch((err) => {
              console.log(err);
            });
        });
        this.allUsers = false;
        this.smsText = "";
        this.symbols = 0;
      } else if (this.someUsers) {
        this.usersList.forEach((user) => {
          user.receivedMessages = this.smsText;
          firebase
            .database()
            .ref("users")
            .child(user.userId)
            .update(user)
            .then(() => {
              console.log("send successfully");
              this.sendMessages += 1;
            })
            .catch((err) => {
              console.log(err);
            });
        });
        this.smsText = "";
        this.someUsers = false;
        this.symbols = 0;
      }
    },
    showUsers() {
      this.isUsersShawn = true;
      this.someUsers = true;
      this.getTable();
    },
    closeUsersList() {
      if (this.usersList.length <= 0) {
        alert("Choose users");
      } else {
        this.isUsersShawn = false;
      }
    },
  },
};
</script>

<style scoped>
.mailing-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sms-container {
  width: 80%;
  box-shadow: 4px 2px 18px 0px;
  padding: 10px;
}
.sms-container-inner {
  display: flex;
  flex-direction: column;
}
.sms-container-checkboxes {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 15px;
}
.usersList {
  position: absolute;
  top: 30%;
  left: 25%;
  max-width: 500px;
  width: 100%;
  background: #ffffff;
  box-shadow: 8px 5px 6px 2px;
  padding: 20px;
}
#table_length {
  color: #ffffff !important;
}
</style>