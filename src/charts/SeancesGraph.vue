<template>
  <div class="chart-responsive">
    <canvas
      ref="canvas"
      class="chart"
      id="line-chart"
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
  name: "SeancesGraph",
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
            "8 авг",
            "15 авг",
            "22 авг",
            "29 авг",
          ],
          datasets: [
            {
              fill: false,
              borderWidth: 4,
              lineTension: 0,
              spanGaps: true,
              borderColor: "#ff9933",
              pointRadius: 3,
              pointHoverRadius: 7,
              pointColor: "#ff9933",
              pointBackgroundColor: "#ff9933",
              data: [
                2666, 2778, 4912, 3767, 6810, 5670, 4820, 15073, 10687, 8432,
              ],
            },
            {
              fill: false,
              borderWidth: 4,
              lineTension: 0,
              spanGaps: true,
              borderColor: "#3333ff",
              pointRadius: 3,
              pointHoverRadius: 7,
              pointColor: "#3333ff",
              pointBackgroundColor: "#3333ff",
              data: [
                4820, 2778, 8432, 6810, 15073, 4912, 3767, 10687, 
              ],
            },
            {
              fill: false,
              borderWidth: 4,
              lineTension: 0,
              spanGaps: true,
              borderColor: "#009900",
              pointRadius: 3,
              pointHoverRadius: 7,
              pointColor: "#009900",
              pointBackgroundColor: "#009900",
              data: [
                6810, 5670, 4820, 15073, 10687, 8432,
              ],
            },
            {
              fill: false,
              borderWidth: 4,
              lineTension: 0,
              spanGaps: true,
              borderColor: "#66b2ff",
              pointRadius: 3,
              pointHoverRadius: 7,
              pointColor: "#66b2ff",
              pointBackgroundColor: "#66b2ff",
              data: [
                4820, 15073, 10687, 8432,
              ],
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