<template>
  <header class="flex items-center justify-between p-4 bg-white">
    <h1 class="flex items-center">
      <img
        class="w-10 h-auto mr-4"
        src="@/assets/logo.svg"
        alt="懐かしい動画を発掘 今昔動画"
      />
      <span class="font-bold text-black">今昔動画</span>
    </h1>
    <nav class="" @click="openModal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="black"
        class="w-10 h-auto"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </nav>
    <div class="fixed top-0 left-0">
      <div
        id="overlay"
        class="absolute z-10 w-screen bg-white flex p-4 border border-gray-400"
        v-show="showContent"
      >
        <div id="contet" class="z-20 flex">
          <button @click="showContent = false">く</button>
          <form @submit.prevent @click="search">
            <input
              class="ml-2 p-2 border"
              type="text"
              placeholder="キーワードを入力"
              v-model.lazy="params.q"
            />
            <button class="p-2 border bg-gray-400 text-white">検索</button>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showContent: false,
      params: {
        q: "",
        part: "snippet",
        type: "video",
        maxResults: "50",
        publishedBefore: "2007-12-31T23:59:59Z",
        key: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
        order: "viewCount",
      },
    };
  },
  methods: {
    openModal() {
      this.showContent = true;
    },
    search() {
      this.$store.dispatch("search", {
        params: this.params,
      });
    },
  },
};
</script>

<style scoped>
</style>