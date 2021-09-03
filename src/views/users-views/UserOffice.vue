<template>
  <div style="width: 100%; height: 100%">
    <h1>Кабинет пользователя</h1>
    <div @click.stop class="registration">
      <form @submit.prevent="handleSubmit">
        <div>
          <div class="mb-3">
            <label for="name" class="form-label">Name*</label>
            <input
              type="name"
              class="form-control"
              id="name"
              aria-describedby="emailHelp"
              v-model="loggedUser.name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="surname" class="form-label">Surname*</label>
            <input
              type="surname"
              class="form-control"
              id="surname"
              aria-describedby="emailHelp"
              v-model="loggedUser.surname"
              required
            />
          </div>
          <div class="mb-3">
            <label for="nickname" class="form-label">Nickname</label>
            <input
              type="text"
              class="form-control"
              id="nickname"
              aria-describedby="emailHelp"
              v-model="loggedUser.nickname"
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
              type="text"
              class="form-control"
              id="address"
              aria-describedby="emailHelp"
              v-model="loggedUser.address"
              placeholder="г. Киев, улица Такаято, 1"
            />
          </div>
          <div class="mb-3">
            <label for="cardNumber" class="form-label">Card number</label>
            <input
              type="text"
              class="form-control"
              id="cardNumber"
              aria-describedby="emailHelp"
              v-model="loggedUser.cardNumber"
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              aria-describedby="emailHelp"
              v-model="loggedUser.phoneNumber"
            />
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Birth date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              aria-describedby="emailHelp"
              v-model="loggedUser.birthDate"
            />
          </div>
        </div>
        <div>
          <div class="mb-3">
            <label for="city" class="form-label">Город</label>
            <select v-model="loggedUser.city" name="city" id="city">
              <option value="Киев">Киев</option>
              <option value="Харьков">Харьков</option>
              <option value="Одесса">Одесса</option>
              <option value="Львов">Львов</option>
              <option value="Чернигов">Чернигов</option>
              <option value="Днепр">Днепр</option>
              <option value="Черновцы">Черновцы</option>
            </select>
          </div>
          <div class="mb-3 container">
            <p>Language:</p>
            <label for="ru" class="form-label">ru</label>
            <input
              name="lang"
              value="ru"
              type="radio"
              class=""
              id="ru"
              aria-describedby="emailHelp"
              v-model="loggedUser.language.ru"
            />
            <label for="ua" class="form-label">ua</label>
            <input
              value="ua"
              type="radio"
              name="lang"
              class=""
              id="ua"
              aria-describedby="emailHelp"
              v-model="loggedUser.language.ua"
            />
          </div>
          <div class="mb-3 container">
            <p>Sex:</p>
            <label for="man" class="form-label">man</label>
            <input
              value="man"
              type="radio"
              class=""
              id="man"
              name="sex"
              aria-describedby="emailHelp"
              v-model="loggedUser.sex.man"
            />
            <label for="woman" class="form-label">woman</label>
            <input
              value="woman"
              type="radio"
              class=""
              id="woman"
              name="sex"
              aria-describedby="emailHelp"
              v-model="loggedUser.sex.woman"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address*</label>
            <input
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              v-model="newEmail"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password*</label>
            <input
              type="password"
              class="form-control"
              id="password"
              @blur="validate"
              v-model="newPassword"
              required
            />
            <p style="color: red" v-if="errMessage">Password must be longer</p>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label"
              >Confirm Password*</label
            >
            <input
              @blur="validate"
              type="password"
              class="form-control"
              id="confirmPassword"
              v-model="newConfirmPassword"
              required
            />
            <p style="color: red" v-if="errMessage">
              Please confirm the password
            </p>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          {{ $t("update") }}
        </button>
      </form>
    </div>
    <transition name="fade" appear>
      <div v-if="updateMessage" class="popup__message">
        <p>You updated successfully!</p>
        <i class="far fa-check-circle"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapGetters } from "vuex";

export default {
  name: "UserRegistration",
  data() {
    return {
      errMessage: false,
      updateMessage: false,
      newEmail: '',
      newPassword: '',
      newConfirmPassword: ''
    };
  },
  computed: {
    ...mapGetters(["users", "user"]),
    loggedUser() {
      let user = this.users.find((user) => user.userId == this.user.uid);
      return user;
    },
  },
  mounted() {
    this.$store.dispatch("loadUsers");
    if (this.user == null) {
      this.$store.dispatch("setupFirebase");
    }
  },
  methods: {
    validate() {
      if (this.newPassword.length < 6) {
        this.errMessage = true;
      }
      if (
        this.newConfirmPassword &&
        this.newConfirmPassword != this.newPassword
      ) {
        this.errMessage = true;
      } else {
        this.errMessage = false;
      }
    },
    handleSubmit() {
      try {
        let currentUser = firebase.auth().currentUser;
        let credential = firebase.auth.EmailAuthProvider.credential(this.loggedUser.email, this.loggedUser.password)
        currentUser.reauthenticateWithCredential(credential).then(() => {
          currentUser.updatePassword(this.newPassword)
          currentUser
          .updateProfile({
            displayName: this.loggedUser.nickname,
          })
          console.log('updated password');
          currentUser.updateEmail(this.newEmail)
          console.log('updated email');
          this.$store.dispatch("setupFirebase");
        })
        .then(() => {
          firebase
            .database()
            .ref("users")
            .child(this.loggedUser.key)
            .update({
              ...this.loggedUser,
              confirmPassword: this.newConfirmPassword,
              email: this.newEmail,
              password: this.newPassword
            })
            .then(() => {
              this.updateMessage = true;
              setTimeout(() => {
                this.updateMessage = false;
              }, 4000);
            });
        })
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 20px;
}
.registration {
  color: black;
  border: 1px solid rgb(109, 109, 109);
  display: flex;
  justify-content: center;
  width: 60%;
  background: #ffffff;
  margin: 0 auto 200px;
}
form {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  padding: 20px;
}
form button {
  width: 100px;
  height: 40px;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.container p {
  margin: 0;
}
.container label {
  margin: 0;
}
.popup__message {
  display: flex;
  border-radius: 10px;
  border: 1px solid white;
  position: fixed;
  bottom: 10%;
  left: 5%;
  width: 230px;
  height: 70px;
  font-size: 20px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px black;
  background: rgb(20, 168, 0);
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 10;
}
.popup__message p {
  margin: 0;
  padding: 0;
}
.popup__message i {
  font-size: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity ease 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>