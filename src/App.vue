<template>
  <div class="body">
    <Spinner v-if="loading" />
    <NavBar v-if="isLoggedIn" :isLoggedIn="isLoggedIn"  />
    <SideBar  v-if="isLoggedIn" :isLoggedIn="isLoggedIn" />
    <router-view class="content-wrapper" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Spinner from './components/Spinner';
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
    SideBar,
    Spinner
  },
  mounted() {
    this.onSetupFirebase();
  },
  computed: mapGetters(['loading', 'isLoggedIn']),
  methods: {
    onSetupFirebase() {
      this.$store.dispatch("setupFirebase")
    }
  },
  
};
</script>

<style scoped>
.body {
  min-height: 100vh;
  background-color: #f4f6f9;
}
.content {
  padding: 10px;
}
</style>