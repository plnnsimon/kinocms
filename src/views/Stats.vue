<template>
  <div v-if="isLoggedIn" class="">
    <div class="top-section">
      <div class="piechart-section">
        <div class="dropdowns">
          <!-- first dropdown -->
          <div class="">
            <p>Основной параметр:</p>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Лучшие каналы
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- second dropdown -->
          <div class="">
            <p>Конверсия:</p>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Цель 1: Заявка консультация
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Лучшие каналы</h3>

            <div class="card-tools">
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="collapse"
              >
                <i class="fas fa-minus"></i>
              </button>
              <button
                type="button"
                class="btn btn-tool"
                data-card-widget="remove"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="piechart-body">
              <div class="">
                <PieChart />
              </div>
              <div class="piechart-ul">
                <ul class="chart-legend clearfix">
                  <li><i class="far fa-circle text-danger"></i> Display</li>
                  <li>
                    <i class="far fa-circle text-success"></i> Paid Search
                  </li>
                  <li>
                    <i class="far fa-circle text-warning"></i> Organic Search
                  </li>
                  <li><i class="far fa-circle text-info"></i> Referral</li>
                  <li><i class="far fa-circle text-primary"></i> Social</li>
                  <li><i class="far fa-circle text-secondary"></i> Direct</li>
                  <li><i class="far fa-circle text-secondary"></i> (Other)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Channels -->
      <div class="linechart-section">
        <div class="">
          <a href="#">Изменение группы каналов</a>
        </div>
        <div class="col-5"></div>
        <!-- Channels end -->
        <!-- Seances -->
        <div class="">
          <div class="card card-info">
            <div class="card-header">
              <h3 class="card-title">Сеансы</h3>

              <div class="card-tools">
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="collapse"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-tool"
                  data-card-widget="remove"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="chart">
                <LineChart />
              </div>
            </div>
          </div>
        </div>
        <!-- Seances end -->
      </div>
      <div class="users">
        <!-- small box -->
        <div class="small-box bg-warning">
          <div class="inner">
            <Spinner v-if="loading" />
            <h3 v-if="!loading">{{ users.length }}</h3>

            <p>User Registrations</p>
          </div>
          <div class="icon">
            <i class="fas fa-user-plus"></i>
          </div>
        </div>
        <p class="text-center">Зарегестрированные пользователи</p>
      </div>
    </div>

    <section class="bottom-section">
      <div class="bottom-section-header">
        <div class="">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Сеансы
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
        <p
          class="align-items-center"
          style="width: 30px; margin: 0; align-self: center"
        >
          И
        </p>
        <div class="col-2 d-flex align-items-center">
          <a href="#">Выбор пользователя</a>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-header border-0">
          <p class="card-title mr-2">
            <i class="fas fa-circle text-blue"></i>
            Сеансы (Все посетители)
          </p>
          <p class="card-title mr-2">
            <i class="fas fa-circle text-orange"></i>
            Сеансы (Трафик планшетных и обычных ПК)
          </p>
          <p class="card-title mr-2">
            <i class="fas fa-circle text-green"></i>
            Сеансы (Трафик с мобильных устройств)
          </p>
          <p class="card-title">
            <i class="fas fa-circle text-info"></i>
            Сеансы (Трафик смартфонов и планшетных ПК)
          </p>

          <div class="card-tools">
            <button
              type="button"
              class="btn bg-info btn-sm"
              data-card-widget="collapse"
            >
              <i class="fas fa-minus"></i>
            </button>
            <button
              type="button"
              class="btn bg-info btn-sm"
              data-card-widget="remove"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <SeancesGraph />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";
import SeancesGraph from "../charts/SeancesGraph";
import Spinner from '../components/Spinner'

export default {
  name: "Stats",
  components: {
    PieChart,
    LineChart,
    SeancesGraph,
    Spinner
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    users() {
      return this.$store.getters.users
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  mounted() {
    this.$store.dispatch("loadUsers")
  },
  methods: {},
};
</script>

<style scoped>
.top-section {
  display: flex;
  flex-flow: row wrap;
}
.card {
  width: 100%;
}
.piechart-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 10px;
}
.dropdowns {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.linechart-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
}

.users {
  margin: 15px;
}
.piechart-ul ul {
  display: flex;
  flex-flow: row wrap;
}
.piechart-ul ul li {
  margin: 5px;
}
.bottom-section {
  margin: 15px;
}
.bottom-section-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 200px;
  width: 100%;
}

</style>