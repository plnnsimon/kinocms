<template>
  <aside :loading="loading" class="main-sidebar sidebar-dark-primary elevation-4">
    
    <a href="index3.html" class="brand-link">
      <img
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>
    <div class="sidebar">
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
              <p>Статистика</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Banners' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Баннера/Слайдеры</p>
            </router-link>
          </li>
          <li @mouseenter="dropDown = true"  @mouseleave="dropDown = false" class="nav-item" :class="{'menu-is-opening menu-open': dropDown}" >
            <router-link :to="{ name: 'Movies' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Фильмы <i class="fas fa-angle-left right"></i></p>
            </router-link>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <router-link :to="{ name: 'MoviePage' }" class="nav-link">
                  <i class="far fa-circle"></i>
                  <p>Страница Фильма</p>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Cinemas' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Кинотеатры</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'News' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Новости</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Promotions' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Акции</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Pages' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Страницы</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Users' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Пользователи</p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Mails' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Рассылка</p>
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
  components: {
  },
  props: ['loading'],
  data() {
    return {
      dropDown: false
    }
  }
};
</script>

<style scoped>
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
</style>
