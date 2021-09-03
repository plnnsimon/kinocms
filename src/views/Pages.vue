<template>
  <div class="news">
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <h2>{{ $t("pages.pageList") }}</h2>
    <EditContacts
      class="absolute"
      v-if="isEditingContacts"
      @updatedPage="updatedPage"
      :pageItem="pageItem"
      @cancelUpdate="cancelUpdate"
    />
    <EditPage
      class="absolute"
      v-if="isEditingPage"
      :pageItem="pageItem"
      @updatedPage="updatedPage"
      @cancelUpdate="cancelUpdate"
    />
    <EditMainPage
      class="absolute"
      v-if="isEditingMainPage"
      :pageItem="pageItem"
      @updatedPage="updatedPage"
      @cancelUpdate="cancelUpdate"
    />
    <div class="table">
      <table v-if="!loading">
        <tr>
          <td>{{ $t("pages.pagesName") }}</td>
          <td>{{ $t("news.table.date") }}</td>
          <td>Статус</td>
        </tr>
        <tr v-for="(item, index) of pages" :key="index">
          <td v-if="lang == 'ru'">{{ item.ruPageName || item.ruTitle }}</td>
          <td v-else>{{ item.uaPageName || item.uaTitle }}</td>
          <td>{{ item.creationDate }}</td>
          <td v-if="item.checked">ВКЛ</td>
          <td v-else>{{ $t("news.table.off") }}</td>
          <i
            ref="editNewsInfo"
            @click="editPageInfo(item)"
            class="fas fa-pen"
          ></i>
          <i
            v-if="!item.ruPageName || !item.uaPageName"
            @click="deletePage(item)"
            class="fas fa-trash-alt"
            style="right: -60px"
          ></i>
        </tr>
      </table>
      <p v-if="pages.length == 0">Пока страниц нету</p>
    </div>
    <button
      @click="addPage"
      class="btn btn-primary"
      style="float: right; margin-right: 20px"
    >
      <i class="btn-icon fas fa-plus"></i> {{ $t("pages.addPage") }}
    </button>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import EditPage from "../components/pages/EditPage.vue";
import EditMainPage from "../components/pages/EditMainPage.vue";
import EditContacts from "../components/pages/EditContacts.vue";

export default {
  name: "Pages",
  components: {
    Spinner,
    EditPage,
    EditMainPage,
    EditContacts,
  },
  data() {
    return {
      isEditingPage: false,
      isEditingMainPage: false,
      isEditingContacts: false,
      pageItem: null,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    pages() {
      return this.$store.getters.pages;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  async mounted() {
    await this.$store.dispatch("loadPages");
  },
  methods: {
    updatedPage(data) {
      this.isEditingPage = data;
      this.isEditingMainPage = data;
      this.isEditingContacts = data;
    },
    addPage() {
      this.$router.push("add_page");
    },
    editPageInfo(item) {
      if (item.ruPageName == "Главная страница" || item.uaPageName == "Головна сторінка") {
        this.isEditingMainPage = true;
        this.pageItem = item;
      } else if (item.ruPageName == "Контакты" || item.uaPageName == "Контакти") {
        this.isEditingContacts = true;
        this.pageItem = item;
      } else {
        this.isEditingPage = true;
        this.pageItem = item;
      }
      console.log(item);
    },
    cancelUpdate(data) {
      this.isEditingPage = data;
      this.isEditingMainPage = data;
      this.isEditingContacts = data;
    },
    deletePage(item) {
      try {
        if (confirm("Delete ?")) {
          this.$store.dispatch("removePage", item.id);
          this.$store.dispatch("loadPages");
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.news {
  position: relative;
}
.absolute {
  position: absolute;
  width: 100%;
  top: -20px;
  left: 0;
  background: white;
  z-index: 1;
}
.news h2 {
  text-align: center;
  margin: 20px;
}
.loader {
  position: absolute;
  left: 50%;
  top: 200px;
}
.table {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.table td {
  border-width: 2px;
}
table {
  width: 400px;
  position: relative;
}
table i {
  position: absolute;
  cursor: pointer;
}
table i:hover {
  color: rgb(117, 117, 117);
}
.inputs-field {
  position: absolute;
  left: 0;
  bottom: -60px;
}

</style>