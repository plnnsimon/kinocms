<template>
  <div class="d-flex flex-column p-4">
    <div class="row pb-lg-3">
      <!-- first dropdown -->
      <div class="col-2">
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
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
      <!-- second dropdown -->
      <div class="col-3">
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
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
      <div class="col d-flex align-items-end">
        <a href="#">Изменение группы каналов</a>
      </div>
    </div>

    <!-- Channels -->
    <div class="row">
      <div class="col-5">
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
            <div class="row">
              <div class="col-md-8">
                <PieChart />
              </div>
              <div class="col-md-4">
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
      <!-- Channels end -->
      <!-- Seances -->
      <div class="col-4">
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

      <div class="col">
        <!-- small box -->
        <div class="small-box bg-warning">
          <div class="inner">
            <h3>44</h3>

            <p>User Registrations</p>
          </div>
          <div class="icon">
            <i class="fas fa-user-plus"></i>
          </div>
        </div>
        <p class="text-center">Зарегестрированные пользователи</p>
      </div>
    </div>
    <section class="col p-0">
      <div class="row">
        <div class="col-1">
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

export default {
  name: "Stats",
  components: {
    PieChart,
    LineChart,
    SeancesGraph,
  },
  methods: {},
};
</script>

<style scoped>
.card {
  width: 100%;
}
</style>