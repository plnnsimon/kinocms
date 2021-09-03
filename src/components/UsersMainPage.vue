<template>
  <div class="usersMainPage">
    <div class="backgroundImage">
      <img :src="throughBanner" alt="" />
    </div>
    <UsersNavBar />
    <MainContent />
    <div class="footer">
    <Footer />
    </div>
    <transition name="fade" appear>
      <div v-if="message && !user && !admin" class="popup__message">
        <p>You logged out successfully</p>
        <i class="far fa-check-circle"></i>
      </div>
    </transition>
    <transition name="fade" appear>
      <div
        v-if="(message && user) || (message && admin)"
        class="popup__message"
      >
        <p>You logged in successfully</p>
        <i class="far fa-check-circle"></i>
      </div>
    </transition>
    <transition name="fade" appear>
      <div
        v-if="(registrationMessage && user)"
        class="popup__message"
      >
        <p>You registered successfully</p>
        <i class="far fa-check-circle"></i>
      </div>
    </transition>
    <router-view />
  </div>
</template>

<script>
import UsersNavBar from "../components/users-main-page/UsersNavBar";
import Footer from "../components/users-main-page/Footer";
import MainContent from "../components/users-main-page/MainContent";
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "UsersMainPage",
  data() {
    return {
      throughBanner: "",
    };
  },
  components: {
    Footer,
    UsersNavBar,
    MainContent,
  },
  beforeCreate() {
    this.$store.dispatch("setupFirebase");
  },
  computed: {
    ...mapGetters(["admin", "user", "message", 'registrationMessage']),
  },
  mounted() {
    this.getBannerPhoto();
  },
  methods: {
    async getBannerPhoto() {
      try {
        await firebase
          .database()
          .ref("Pictures")
          .once("value")
          .then((data) => {
            this.throughBanner = data.val().Url;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.backgroundImage {
  position: absolute;
  max-height: 600px;
  object-fit: cover;
  width: 100%;
}
.backgroundImage img {
  width: 100%;
    max-height: 600px;
    object-fit: cover;
}
.usersMainPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: no-repeat;
  background-size: 100%;
  overflow: hidden;
  position: relative;
}
.backgroundImage::before {
  content: "";
  position: absolute;
  top: 550px;
  width: 100%;
  height: 100px;
  background: black;
  box-shadow: 0px -30px 30px 0px black;
}
.navBar {
  width: 70%;
  max-width: 1100px;
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
.footer {
  position: absolute;
    width: 70%;
    bottom: 0;
}
</style>