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
import firebase from "firebase";
export default {
  name: "LineChart",
  extends: Line,
  data() {
    return {};
  },
  mounted() {
    this.loadPieData();
  },
  methods: {
    loadPieData() {
      let months = [];
      for (let i = 1; i < 7; i++) {
        let d = new Date(i + 1 + "/1");
        months.push(d.toLocaleDateString(undefined, { month: "long" }));
      }
      firebase
        .database()
        .ref("charts")
        .once("value")
        .then((data) => {
          const obj = data.val();
          let dataArr = Array.from(obj.linechart.datasets.data.split(", "));
          this.renderChart(
            {
              labels: months,
              datasets: [
                {
                  borderColor: obj.linechart.datasets.borderColor,
                  data: dataArr,
                  backgroundColor: obj.linechart.datasets.backgroundColor,
                },
              ],
            },
            {
              legend: {
                display: false,
              },
            }
          );
        });
    },
  },
};
</script>