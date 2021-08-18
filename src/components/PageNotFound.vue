<template>
  <div>
      <a href="https://redstapler.co" target="_blank" class="text-3d">404</a>
<span @click="backToHome" class="caption">Click to Return Home</span>
  </div>
</template>

<script>
export default {
name: "PageNotFound",
methods: {
    backToHome() {
        this.$router.replace('stats')
    }
}
}
</script>

<style scoped>

.caption {
    margin-top: 25px;
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50% ,210%);
  text-shadow: 0 3px 5px rgba(0,0,0,.3);
  cursor:default;
}
span:hover {
    color: rgb(174, 174, 174);
    text-shadow: 0 3px 5px rgb(213, 213, 213);
    cursor: pointer;
}
.text-3d {
    text-transform: uppercase;
    font-size: 130px;
    color:#eee;
    text-decoration:none;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50% ,-50%);
    text-shadow:
                    0 1px 0 rgb(190,190,190),
                    0 2px 0 rgb(185,185,185),
                    0 3px 0 rgb(180,180,180),
                    0 4px 0 rgb(175,175,175),
                    0 5px 0 rgb(170,170,170),
                    0 6px 0 rgb(165,165,165),
                    0 7px 0 rgb(160,160,160),

                    0 1px 5px rgba(0,0,0,.05),
                    0 3px 5px rgba(0,0,0,.10),
                    0 5px 10px rgba(0,0,0,.15),
                    0 7px 10px rgba(0,0,0,.20),
                    0 10px 15px rgba(0,0,0,.25);
    transition: all 0.3s ease-in-out;        
    cursor: pointer;
}
.text-3d:hover {
    text-shadow:
                    0 1px 0 rgb(190,190,190),
                    0 2px 0 rgb(185,185,185),
                    0 3px 0 rgb(180,180,180),
                    0 4px 0 rgb(175,175,175),
                    0 5px 0 rgb(170,170,170),
                    0 6px 0 rgb(165,165,165),
                    0 7px 0 rgb(160,160,160),
                    0 8px 0 rgb(155,155,155),
                    0 9px 0 rgb(150,150,150),

                    0 1px 5px rgba(0,0,0,.05),
                    0 5px 5px rgba(0,0,0,.10),
                    0 10px 10px rgba(0,0,0,.15),
                    0 15px 10px rgba(0,0,0,.20),
                    0 20px 15px rgba(0,0,0,.25);
    
    transform: translate(-51%,-51%);
    transition: all 0.3s ease-in-out;
}
</style>