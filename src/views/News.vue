<template>
  <div class="news">
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <h2>{{ $t("news.newsList") }}</h2>
    <EditNewsPage
      v-if="isEditing"
      :newsItem="newsItem"
      @updatedNews="updatedNews"
      @cancelUpdate="cancelUpdate"
    />
    <div class="table">
      <table v-if="!loading">
        <tr>
          <td>{{ $t("news.table.name") }}</td>
          <td>{{ $t("news.table.date") }}</td>
          <td>Статус</td>
        </tr>
        <tr v-for="(item, index) of news" :key="index">
          <td>{{ item.newsTitle }}</td>
          <td>{{ item.newsDate }}</td>
          <td v-if="item.checked">ВКЛ</td>
          <td v-else>{{ $t("news.table.off") }}</td>
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
        </tr>
      </table>
      <p v-if="news.length == 0">{{ $t("news.noNews") }}</p>
    </div>
    <button v-if="!isEditing" @click="addNews" style="float: right;
    margin-right: 20px;" class="btn btn-primary">
      <i class="btn-icon fas fa-plus"></i> {{ $t("news.addNews") }}
    </button>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import EditNewsPage from "../components/news/EditNewsPage";

export default {
  name: "News",
  components: {
    Spinner,
    EditNewsPage,
  },
  data() {
    return {
      isEditing: false,
      newsItem: null,
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
  },
  methods: {
    updatedNews(data) {
      this.isEditing = data
    },
    addNews() {
      this.$router.push("news_page");
    },
    editNewsInfo(item) {
      this.isEditing = true;
      this.newsItem = item;
    },
    cancelUpdate(data) {
      this.isEditing = data;
    },
    deleteNews(item) {
      try {
        if(confirm("Delete ?")) {
          this.$store.dispatch("removeNews", item.newsId);
        this.$store.dispatch("loadNews");
        } else {
          return
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