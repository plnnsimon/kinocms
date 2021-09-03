<template>
  <div class="navbar">
    <div class="navbar__header">
      <div v-if="user || admin" class="user__page">
        <i class="fas fa-user-circle"></i>
        <p v-if="user && user.displayName">{{ user.displayName }}</p>
        <p v-if="admin && admin.displayName">{{ admin.displayName }}</p>
        <router-link :to="{ name: 'user_office' }" v-if="user">
          Кабинет пользователя
        </router-link>
        <router-link :to="{ name: 'admin' }" v-if="admin">
          Кабинет администратора
        </router-link>
      </div>
      <div class="languages">
        <img v-if="lang == 'ru'" src="../../assets/i18n/ru.png" alt="ru" />
        <img v-else src="../../assets/i18n/ua.png" alt="ua" />
        <select v-model="lang" @change="handleChange($event)">
          <option value="ru">Русский</option>
          <option value="ua">Украинский</option>
        </select>
      </div>
      <div v-if="user || admin" class="sign-out">
        <a
          @click="onSignOut"
          data-widget="navbar-search"
          href="#"
          role="button"
        >
          <i class="fas fa-power-off"></i>
        </a>
      </div>
      <div v-if="!user && !admin" class="sign-in">
        <span>
          <i @click="login" class="fas fa-sign-in-alt"></i>
        </span>
      </div>
      <div v-if="!user && !admin" class="register">
        <a @click="register" data-widget="navbar-search" href="#" role="button">
          Registration
        </a>
        <div v-if="isRegistration" class="registration-form">
          <UserRegistration
            @closeRegistration="closeRegistration"
            @click.stop
          />
        </div>
      </div>
          <Login @closeLogin="closeLogin" v-if="isLogin" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import UserRegistration from "../UserRegistration.vue";
import Login from "../Login.vue";
export default {
  name: "NavBar",
  components: {
    UserRegistration,
    Login,
  },
  data() {
    return {
      throughBanner: "",
      lang: localStorage.getItem("lang") || "ru",
      isRegistration: false,
      isLogin: false,
    };
  },
  mounted() {
    this.getBannerPhoto();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    admin() {
      return this.$store.getters.admin;
    },
  },
  methods: {
    async getBannerPhoto() {
      await firebase
        .database()
        .ref("Pictures")
        .once("value")
        .then((data) => {
          this.throughBanner = data.val().Url;
        });
    },
    onSignOut() {
      this.$store.dispatch("signOut");
      this.$store.dispatch("setupFirebase");
    },
    signIn() {
      this.$router.push({ path: "login" });
    },
    register() {
      this.isRegistration = true;
    },
    login() {
      this.isLogin = true;
    },
    closeLogin(data) {
      this.isLogin = data;
    },
    closeRegistration(data) {
      this.isRegistration = data;
    },
    handleChange(event) {
      localStorage.setItem("lang", event.target.value);
      this.$i18n.locale = event.target.value;
      this.$router.push({
        params: { lang: event.target.value },
      });
    },
  },
};
</script>

<style scoped>
.registration-form {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: 20;
  background: #000000b0;
}
.navbar {
  width: 70%;
  height: 50px;
  background: #9e9e9e;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  top: 0;
  overflow: hidden;
}
.navbar__header {
  width: 100%;
  margin: 0 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.navbar__header .sign-out a i {
  color: white;
  font-size: 20px;
}
.navbar__header .sign-out a i:hover {
  color: rgb(117, 117, 117);
  font-size: 20px;
}
.languages {
  background: #ffffff5c;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 15px;
}
.languages img {
  width: 30px;
  margin-right: 10px;
}
select {
  background: transparent;
  color: white;
  outline: none;
  border: none;
  margin-right: 10px;
}
option {
  color: black;
}
.sign-in span i {
  margin-right: 15px;
  color: white;
  font-size: 20px;
  cursor: pointer;
}
.sign-in span i:hover {
  color: rgb(105, 105, 105);
}
.register a {
  font-size: 24px;
  text-decoration: none;
  color: white;
}
.register a:hover {
  color: rgb(112, 112, 112);
}
.user__page {
  display: flex;
  position: absolute;
  left: 20px;
  align-items: center;
  width: 250px;
  justify-content: space-between;
}
.user__page i {
  font-size: 40px;
  color: white;
  text-shadow: 2px 2px 8px black;
}
.user__page a {
  text-decoration: none;
  color: white;
}
.user__page a:hover {
  text-shadow: 1px 1px 4px rgb(255, 255, 255);
}
.user__page p {
  margin: 0;
  display: flex;
}
</style>