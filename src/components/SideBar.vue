<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
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
          <li class="nav-item">
            <router-link :to="{ name: 'Movies' }" class="nav-link">
              <i class="far fa-circle"></i>
              <p>Фильмы</p>
            </router-link>
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
