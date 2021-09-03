<template>
  <div class="hall" @mouseenter="showEye = true" @mouseleave="showEye = false">
    Зал №{{ hall.hallName }}
    <router-link
      v-if="showEye"
      :to="{ name: 'about_hall', params: { hallId: `hall${index + 1}` } }"
    >
      <i class="far fa-eye"></i>
    </router-link>
  </div>
</template>

<script>
export default {
    props: ['hall', 'index'],
  data() {
    return {
      showEye: false ,
    };
  },
};
</script>

<style scoped>
.hall {
    border: 1px solid;
    padding: 0 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}
a {
    text-decoration: none;
    color: inherit;
}
i {
    font-size: 20px;
}
i:hover {
    text-shadow: 1px 2px 4px black;
}
</style>