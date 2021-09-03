<template>
  <footer>
    <div class="mobile">
      <p>Мобильные приложения</p>
      <img src="../../assets/app-store.jpeg" alt="apple" />
      <img src="../../assets/googleplay.jpeg" alt="google" />
    </div>
    <nav class="footer__navigation">
      <ul class="navigation__list">
        <li>
          <router-link :to="{ name: 'Poster' }" class="nav__main">
            {{ $t("poster") }}
          </router-link>
          <ul>
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
          </ul>
        </li>
        <li>
          <router-link :to="{ name: '' }" class="nav__main">
            {{ $t("aboutCinema.aboutCinema") }}
          </router-link>
          <ul>
            <li>
              <router-link :to="{ name: 'UsersNews' }">
                {{ $t("sidebar.news") }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'UsersAdvertisement' }">
                {{ $t("sidebar.advertisement") }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'UsersCafeBar' }">
                {{ $t("sidebar.cafeBar") }}
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'UsersMobile' }">
                Мобильные прилож
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'UsersContacts' }">
                {{ $t("sidebar.contacts") }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="socials">
      <i class="fab fa-facebook"></i>
      <i class="fab fa-vk"></i>
      <i class="fab fa-instagram"></i>
      <i class="fab fa-twitter"></i>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 180px;
  background: white;
  display: flex;
  justify-content: space-around;
  padding: 10px 20px 0px 20px;
  z-index: 11;
    border-top: 1px solid;
}
.mobile img {
  width: 100px;
  cursor: pointer;
}
.navigation__list {
  list-style: none;
  display: flex;
  width: 300px;
    justify-content: space-between;
}
.socials {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
.socials i {
  font-size: 40px;
  cursor: pointer;
  color: black;
}
.socials i:hover {
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 4px rgb(0, 0, 0);
}
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: rgb(255, 255, 255);
  text-decoration: none;
  text-shadow: 1px 1px 4px rgb(0, 0, 0);
}
ul {
  list-style: none;
}
.nav__main {
  font-size: 24px;
  font-weight: 500;
}
ul {
  padding: 0;
}
</style>