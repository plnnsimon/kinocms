<template>
  <header
    class="main-header navbar navbar-static-top navbar-expand navbar-dark"
  >
    
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <button @click="addAdmin" class="btn">Add admin</button>
      <router-link :to="{path: '/'}">
        To Main Page
      </router-link>

      <div class="languages">
        <img v-if="lang == 'ru'" src="../assets/i18n/ru.png" alt="ru" />
        <img v-else src="../assets/i18n/ua.png" alt="ua" />
        <select v-model="lang" @change="handleChange($event)">
          <option value="ru">Русский</option>
          <option value="ua">Украинский</option>
        </select>
      </div>
      <!-- Navbar Search -->
      <i class="fas fa-user user"></i>
      <p>Administrator</p>
      <li class="nav-item">
        <a
          @click="onSignOut"
          class="nav-link"
          data-widget="navbar-search"
          href="#"
          role="button"
        >
          <i class="fas fa-power-off"></i>
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      lang: localStorage.getItem("lang") || "ru",
    };
  },
  
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut");
      this.$emit('showPage', true)
    },
    handleChange(event) {
      localStorage.setItem("lang", event.target.value);
      this.$i18n.locale = event.target.value;
      this.$router.push({
        params: { lang: event.target.value },
      });
    },
    addAdmin() {
      this.$router.replace({ name: 'Registration' })
    },
  },
};
</script>

<style scoped>
.user {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.75);
  margin-right: 20px;
}
p {
  display: inline-block;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.75);
}
.navbar-nav {
  align-items: center;
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
</style>