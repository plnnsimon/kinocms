<template>
  <aside
    :loading="loading"
    class="main-sidebar sidebar-dark-primary elevation-4"
  >
    <a href="index3.html" class="brand-link">
      <img
        src="dist/img/AdminLTELogo.png"
        alt="Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>
    <div class="sidebar">
      <div class="admin">
        {{ admin.email }}
      </div>
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <li class="nav-item">
            <router-link :to="{ name: 'Stats' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>{{ $t("sidebar.statistics") }}</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Banners' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>{{ $t("sidebar.banners") }}</p>
            </router-link>
          </li>
          <li
            @mouseenter="films = true"
            @mouseleave="films = false"
            class="nav-item"
            :class="{ 'menu-is-opening menu-open': films }"
          >
            <router-link :to="{ name: 'Movies' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>
                {{ $t("sidebar.films") }}
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'MoviePage' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.filmPage") }}</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li
            @mouseenter="cinemas = true"
            @mouseleave="cinemas = false"
            class="nav-item"
            :class="{ 'menu-is-opening menu-open': cinemas }"
          >
            <router-link :to="{ name: 'Cinemas' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>
                {{ $t("sidebar.cinemas") }}
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'CinemaCard' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.cinemaCard") }}</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li
            @mouseenter="news = true"
            @mouseleave="news = false"
            class="nav-item"
            :class="{ 'menu-is-opening menu-open': news }"
          >
            <router-link :to="{ name: 'News' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>
                {{ $t("sidebar.news") }} <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'NewsPage' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.newsPage") }}</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li
            @mouseenter="promotions = true"
            @mouseleave="promotions = false"
            class="nav-item"
            :class="{ 'menu-is-opening menu-open': promotions }"
          >
            <router-link :to="{ name: 'Promotions' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>
                {{ $t("sidebar.discounts") }}
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'PromotionsPage' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.discountsPage") }}</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li
            @mouseenter="pages = true"
            @mouseleave="pages = false"
            :class="{ 'menu-is-opening menu-open': pages }"
            class="nav-item"
          >
            <router-link :to="{ name: 'Pages' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>
                {{ $t("sidebar.pages") }}
                <i class="fas fa-angle-left right"></i>
              </p>
            </router-link>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'MainPage' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.mainPage") }}</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'AboutCinema' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.aboutCinema") }}</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'CafeBar' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.cafeBar") }}</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'VipHall' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.vipHall") }}</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'Advertisement' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.advertisement") }}</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'ChildRoom' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.childRoom") }}</p>
                </router-link>
              </li>
            </ul>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'Contacts' }" class="nav-link">
                  <i class="fas fa-circle"></i>
                  <p>{{ $t("sidebar.contacts") }}</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Users' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>{{ $t("sidebar.users") }}</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Mails' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>{{ $t("sidebar.mailing") }}</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SideBar",
  components: {},
  props: ["loading"],
  data() {
    return {
      films: false,
      cinemas: false,
      news: false,
      promotions: false,
      pages: false,
    };
  },
  mounted() {
    console.log(this.admin);
  },
  computed: {
    admin() {
      return this.$store.getters.admin;
    },
  },
};
</script>

<style scoped>
* ul,
li {
  transition: all ease 0.5s;
}
.nav-item {
  transition: all ease 0.5s;
}
.nav-link {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nav-link i {
  margin-right: 10px;
}
.main-sidebar {
  position: fixed !important;
}
.admin {
  width: 100%;
  border-bottom: 1px solid;
  margin: 20px 0;
  text-align: center;
  color: white;
  padding-bottom: 10px;
  text-shadow: 0px 1px 1px white, 1px 2px 2px white;
}
</style>
