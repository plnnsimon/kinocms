<template>
  <div class="news">
    <div class="loader">
      <Spinner v-if="loading" />
    </div>
    <h2>{{ $t("promotions.promotionsList") }}</h2>
    <EditPromotionsPage
      v-if="isEditing"
      :promotionsItem="promotionsItem"
      @updatedNews="updatedNews"
      @cancelUpdate="cancelUpdate"
    />
    <div class="table">
      <table v-if="!loading">
        <tr>
          <td>{{ $t("promotions.promotionsName") }}</td>
          <td>{{ $t("promotions.table.date") }}</td>
          <td>Статус</td>
        </tr>
        <tr v-for="(item, index) of promotions" :key="index">
          <td v-if="lang == 'ru'">{{ item.ruPromotionsTitle }}</td>
          <td v-else>{{ item.uaPromotionsTitle }}</td>
          <td>{{ item.promotionsDate }}</td>
          <td v-if="item.checked">ВКЛ</td>
          <td v-else>{{ $t("promotions.table.off") }}</td>
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
      <p v-if=" promotions == undefined || promotions.length == 0">{{ $t("promotions.noPromotions") }}</p>
    </div>
    <button v-if="!isEditing" @click="addNews" class="btn btn-primary" style="float: right;
    margin-right: 20px;">
      <i class="btn-icon fas fa-plus"></i> {{ $t("promotions.addPromotions") }}
    </button>
  </div>
</template>

<script>
import Spinner from "../components/Spinner";
import EditPromotionsPage from "../components/promotions/EditPromotionsPage";

export default {
  name: "News",
  components: {
    Spinner,
    EditPromotionsPage,
  },
  data() {
    return {
      isEditing: false,
      promotionsItem: null,
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    promotions() {
      return this.$store.getters.promotions;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  async mounted() {
    await this.$store.dispatch("loadPromotions");
  },
  methods: {
    updatedNews(data) {
      this.isEditing = data
    },
    addNews() {
      this.$router.push("promotions_page");
    },
    editNewsInfo(item) {
      this.isEditing = true;
      this.promotionsItem = item;
    },
    cancelUpdate(data) {
      this.isEditing = data;
    },
    deleteNews(item) {
      try {
        if(confirm("Delete ?")) {
        this.$store.dispatch("removePromotions", item.promotionId);
        this.$store.dispatch("loadPromotions");
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