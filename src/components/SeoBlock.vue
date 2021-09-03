<template>
  <div class="seo">
        <p>SEO блок:</p>
        <form>
          <label for="url">URL: </label>
          <input
            v-model="item.seo.url"
            type="text"
            id="url"
            placeholder="URL"
          />
          <label for="title">{{ $t("title") }}: </label>
          <input
            v-model="item.seo.title"
            type="text"
            id="title"
            :placeholder="$t('title')"
          />
          <label for="keywords">{{ $t("keywords") }}: </label>
          <input
            v-model="item.seo.keywords"
            type="text"
            id="keywords"
            :placeholder="$t('keywords')"
          />
          <label for="description">{{ $t("description") }}: </label>
          <textarea
            v-model="item.seo.description"
            type="text"
            id="description"
            :placeholder="$t('description')"
          ></textarea>
        </form>
      </div>
</template>

<script>
export default {
    props: ['item']
}
</script>

<style scoped>
.seo {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 12px 4px 13px 4px rgb(0, 0, 0, 50%);
}
.seo form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}
.seo p {
  margin-right: 20px;
}
</style>