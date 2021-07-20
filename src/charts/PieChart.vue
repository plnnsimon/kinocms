<template>
  <div class="chart-responsive">
    <canvas ref="canvas" id="pieChart" height="200"></canvas>
  </div>
</template>

<script>
import {Pie} from "vue-chartjs"
export default {
  name: "PieChart",
  extends: Pie,
  data() {
    return {
    };
  },
  mounted() {
    this.setup()
  },
  methods: {
    setup() {
      this.renderChart({
        labels: ["Display", "Paid Search", "Organic Search", "Referral", "Social", "Direct", "(Other)"],
        datasets: [
          {
            data: [700, 500, 400, 600, 300, 100, 10],
            backgroundColor: [
              "#3c8dbc",
              "#0ddF5a",
              "#f56954",
              "#ffDc10",
              "#00c0ef",
              "#0da000",
              "#d2d6de",
            ],
          },
        ],
        
          
        
      }, {legend: {
            display: false,
          }})
    }
  }
  
};
</script>