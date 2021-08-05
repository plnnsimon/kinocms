<template>
  <div class="news">
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <h2>Список Новостей</h2>

    <div class="table">
      <table v-if="!loading">
        <tr>
          <td>Название</td>
          <td>Дата создания</td>
          <td>Статус</td>
        </tr>
        <tr v-for="(item, index) of news" :key="index">
          <td>{{ item.newsTitle }}</td>
          <td>{{ item.newsDate }}</td>
          <td v-if="item.checked">ВКЛ</td>
          <td v-else>ВЫКЛ</td>
          <i
            ref="editNewsInfo"
            @click="editNewsInfo(item)"
            class="fas fa-pen"
          ></i>
          <i
            @click="deleteNews(item)"
            class="fas fa-trash-alt"
            style="right: -60px"
          ></i>
          <div class="buttons">
            <button
              v-if="isEditing"
              @click="updateInfo(item)"
              class="btn btn-primary"
            >
              Обновить
            </button>
            <button
              v-if="isEditing"
              @click="cancelUpdate"
              class="btn btn-primary"
            >
              Отменить
            </button>
          </div>
          <div v-if="isEditing" class="inputs-field">
            <input type="text" v-model="item.newsTitle" />
            <input type="date" v-model="item.newsDate" />
            <input type="checkbox" v-model="item.checked" />
          </div>
        </tr>
      </table>
      <p v-if="news.length == 0">Пока новостей нет</p>
    </div>
    <button v-if="!isEditing" @click="addCinemaInfo" class="btn btn-primary">
      <i class="btn-icon fas fa-plus"></i> Создать новость
    </button>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
export default {
  name: "News",
  components: {
    Spinner,
  },
  data() {
    return {
      updatedItem: {
        newsTitle: "",
        newsDate: "",
        checked: false
      },
      isEditing: false,
    };
  },
  computed: {
    news() {
      return this.$store.getters.news;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  async mounted() {
    await this.$store.dispatch("loadNews");
    console.log(this.news);
  },
  methods: {
    addCinemaInfo() {
      this.$router.push("./news_page");
    },
    addNews() {
      this.$router.push("/news_page");
    },
    updateInfo(item) {
      try {
        this.$store.dispatch("updateNews", {
          imageGallery: item.imageGallery,
          newsId: item.newsId,
          description: item.description,
          newsDate: item.newsDate,
          trailerLink: item.trailerLink,
          seo: {...item.seo}
        });
        this.$store.dispatch("loadNews");
        this.isEditing = false;
      } catch (err) {
        console.log(err);
      }
    },
    cancelUpdate() {
      this.isEditing = false;
    },
    editNewsInfo(item) {
      console.log(item);
      this.isEditing = true;
    },
    deleteNews(item) {
      try {
        this.$store.dispatch("removeNews", item.newsId);
        this.$store.dispatch("loadNews");
      } catch (err) {
        console.log(err);
      }
      this.news.splice(item, 1);
    },
  },
};
</script>

<style scoped>
.news {
  position: relative;
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
.buttons {
  position: absolute;
  bottom: -120px;
  left: 0;
  width: 300px;
  display: flex;
  justify-content: space-between;
}
.btn-icon {
  position: relative;
}
.inputs-field {
  position: absolute;
  left: 0;
  bottom: -60px;
}
</style>