<template>
  <div class="app">
      <router-view />
  </div>
</template>

<script>
export default {
  
};
</script>

<style>
.app {
  background: rgb(0, 0, 0);
}
.prev {
    background: #9e9e9e;
    border-radius: 10px 0 0 10px;
    padding: 5px;
}
.next {
    background: #9e9e9e;
    border-radius: 0 10px 10px 0;
    padding: 5px;
}
.myPagination {
    list-style: none;
    display: flex;
    max-width: 350px;
    align-items: center;
    border-radius: 10px;
    padding: 0;
    color: white;
}
.item {
    padding: 5px 10px;
}
.item a {
    color: white;
    text-decoration: none;
}

.item.active {
    background: rgb(255, 0, 0);
}
</style>