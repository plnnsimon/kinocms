<template>
  <div>
    <div v-if="admin" class="body">
      <Spinner v-if="loading" />
      <NavBar v-if="isLoggedIn" :isLoggedIn="isLoggedIn" />
      <SideBar v-if="isLoggedIn" :isLoggedIn="isLoggedIn" />
      <router-view class="content-wrapper" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from "./NavBar.vue";
import SideBar from "./SideBar";
import Spinner from "./Spinner";
export default {
  name: 'Admin',
  components: {
    NavBar,
    SideBar,
    Spinner,
  },
  data() {
    return {
      isShowPage: false,
    };
  },
    computed: {
      ...mapGetters(['admin', 'isLoggedIn', 'loading'])
      
    },
  beforeCreate() {
    this.$store.dispatch("setupFirebase")
  },
  mounted() {
    if (!this.admin) {
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.body {
  min-height: 100vh;
  background-color: #f4f6f9;
  overflow: auto;
}
.content {
  padding: 10px;
}
</style>