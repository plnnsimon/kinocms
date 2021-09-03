<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li>
        <router-link :to="{ name: 'Poster' }"> {{ $t("poster") }} </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Timetable' }">
          {{ $t("timetable") }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'soon' }">
          {{ $t("soonShawn") }}
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'user_cinemas' }">
          {{ $t("sidebar.cinemas") }}</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'UsersPromotions' }">
          {{ $t("sidebar.discounts") }}
        </router-link>
      </li>
      <li
        @mouseenter="dropDown = true"
        @mouseleave="dropDown = false"
        class="dropDown"
      >
        <router-link :to="{ name: '' }">
          {{ $t("aboutCinema.aboutCinema") }}
        </router-link>
        <ul class="dropDown__menu" :class="{ 'menu-open': dropDown }">
          <li>
            <router-link :to="{ name: 'UsersNews' }" class="nav-link">
              <p>{{ $t("sidebar.news") }}</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'UsersAdvertisement' }" class="nav-link">
              <p>{{ $t("sidebar.advertisement") }}</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'UsersCafeBar' }" class="nav-link">
              <p>{{ $t("sidebar.cafeBar") }}</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'UsersMobile' }" class="nav-link">
              <p>Мобильные прилож</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'child_room' }" class="nav-link">
              <p>{{ $t("sidebar.childRoom") }}</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'vip_hall' }" class="nav-link">
              <p>{{ $t("sidebar.vipHall") }}</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'UsersContacts' }" class="nav-link">
              <p>{{ $t("sidebar.contacts") }}</p>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "UsersPages",
  data() {
    return {
      dropDown: false,
    };
  },
};
</script>

<style scoped>
.dropDown {
  position: relative;
}
.dropDown__menu {
  list-style: none;
  margin: 0;
  padding: 0 0 0 10px;
  z-index: -1;
  transform: translateY(-400px);
  position: absolute;
  transition: all ease 0.2s;
  left: -60px;
    width: 200px;
}
.menu-open {
  transform: translateY(12px);
  transition: all ease 0.2s;
  background: #ffffff;
  z-index: 1;
  color: black;
  left: -60px;
    width: 200px;
}
.navigation {
  background: #ffffff;
  width: 100%;
  float: right;
  border-bottom: 1px solid;
}
.navigation__list {
  list-style: none;
  display: flex;
  width: 650px;
  justify-content: space-between;
  margin: 0 10px;
  padding: 10px 0;
  float: right;
}
.navigation__list a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  padding: 0;
}
.navigation__list a:hover {
  text-shadow: 1px 1px 4px rgb(0, 0, 0);
}
</style>