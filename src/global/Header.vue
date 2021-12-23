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
    <transition name="fade">
      <div class="fixed top-0 left-0"  v-show="showContent">
        <div
          id="overlay"
          class="absolute z-10 w-screen bg-white flex p-4 border border-gray-400"
        >
          <div id="contet" class="z-20 flex items-center">
            <button class="w-10 h-auto p-1" @click="showContent = false">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                 <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
              </svg>
            </button>
            <form @submit.prevent @click="search" class="h-full flex flex-row items-center justify-center">
              <span class="relative">
                <input
                  class="ml-2 p-2 border pr-10"
                  type="text"
                  placeholder="キーワードを入力"
                  v-model="keyword"
                />
                <button class="absolute w-8 h-auto right-1 -inset-y-1/3" @click="clear" v-show="showCross">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="gray" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </button>
              </span>
              <button class="border p-2 text-white rounded-r-md w-10 h-auto border-gray-400">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    viewBox="0 0 16 16"
                  >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      />
                  </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showContent: false,
      showCross: false,
      keyword: "",
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
  watch:{
    keyword(newKeyword){
      if(newKeyword !== ""){
        this.showCross = true;
      }else{
        this.showCross = false;
      }
    }
  },
  methods: {
    openModal() {
      this.showContent = true;
    },
    search() {
      this.params.q = this.keyword
      // this.$store.dispatch("search", {
      //   params: this.params,
      // });
    },
    clear(){
      this.keyword = ""
      this.params.q = ""
    }
  },
};
</script>

<style scoped lang="scss">


</style>