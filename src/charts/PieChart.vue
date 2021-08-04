<template>
  <div class="chart-responsive">
    <canvas ref="canvas" id="pieChart"></canvas>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import firebase from "firebase";
export default {
  name: "PieChart",
  extends: Pie,
  data() {
    return {};
  },
  mounted() {
    this.loadPieData();
  },
  methods: {
    loadPieData() {
      firebase
        .database()
        .ref("charts")
        .once("value")
        .then((data) => {
          const obj = data.val();
          let dataArr = Array.from(obj.piechart.datasets.data.split(", "));
          let dataBackCol = Array.from(
            obj.piechart.datasets.backgroundColor.split(", ")
          );
          this.renderChart(
            {
              labels: [
                "Display",
                "Paid Search",
                "Organic Search",
                "Referral",
                "Social",
                "Direct",
                "(Other)",
              ],
              datasets: [
                {
                  data: dataArr,
                  backgroundColor: dataBackCol,
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