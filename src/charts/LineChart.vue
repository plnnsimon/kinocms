<template>
  <div class="chart-responsive">
    <canvas
      ref="canvas"
      id="lineChart"
      style="
        min-height: 250px;
        height: 250px;
        max-height: 250px;
        max-width: 100%;
      "
    ></canvas>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
export default {
  name: "LineChart",
  extends: Line,
  data() {
    return {};
  },
  mounted() {
    this.setup();
  },
  methods: {
    setup() {
      this.renderChart(
        {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              borderColor: "rgb(30,144,255)",
              backgroundColor: "rgba(30, 174, 255, 0.1)",
              data: [65, 59, 80, 81, 56, 55, 40],
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
        }
      );
    },
  },
};
</script>