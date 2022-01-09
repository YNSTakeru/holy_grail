<template>
  <header class="bg-white">
    <div class="flex items-center justify-between w-full p-4">
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
        <div class="fixed top-0 left-0 z-10" v-show="showContent">
          <div
            id="overlay"
            class="
              absolute
              z-10
              w-screen
              bg-white
              flex
              p-4
              border border-gray-400
            "
          >
            <div id="contet" class="z-20 flex items-center">
              <button class="w-10 h-auto p-1" @click="showContent = false">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-caret-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"
                  />
                </svg>
              </button>
              <form
                @submit.prevent
                @click="search"
                class="h-full flex flex-row items-center justify-center"
              >
                <span class="relative">
                  <input
                    class="
                      p-2
                      pl-3
                      pr-10
                      focus:outline-none focus:ring-1 focus:ring-blue-400
                      transition
                      ease-in-out
                      duration-500
                      rounded-md
                    "
                    type="text"
                    placeholder="キーワードを入力"
                    v-model="keyword"
                  />

                  <transition name="fade">
                    <div
                      class="absolute w-8 h-auto right-1 top-1"
                      @click="clear"
                      v-show="showCross"
                      name="fade"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="gray"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                    </div>
                  </transition>
                </span>
                <button
                  class="
                    border
                    p-2
                    text-white
                    rounded-r-md
                    w-10
                    h-auto
                    border-gray-400
                  "
                >
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
                <button class="ml-2 w-7 h-auto" @click="openConfig">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    class="bi bi-gear"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                    />
                    <path
                      d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="bg-gray-200 p-4">
      <Config />
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
import Config from "@/components/Config";

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
      orderOptions: [
        { value: "date", label: "投稿が新しい順" },
        { value: "rating", label: "高評価の多い順" },
        { value: "relevance", label: "関連性の高い順" },
        { value: "title", label: "アルファベット昇順" },
        { value: "viewCount", label: "再生回数の多い順" },
      ],
      orderValue: "",
    };
  },
  created() {
    this.orderValue = "";
  },
  watch: {
    keyword(newKeyword) {
      this.params.q = this.keyword;
      this.setParamsAction({ params: this.params });
      if (newKeyword !== "") {
        this.showCross = true;
      } else {
        this.showCross = false;
      }
    },
  },
  components: {
    Config,
  },
  methods: {
    ...mapActions(["searchAction"]),
    ...mapActions("config", ["setParamsAction", "changeShowConfigAction"]),
    openModal() {
      this.showContent = true;
    },
    openConfig() {
      this.changeShowConfigAction();
    },
    search() {
      this.params.q = this.keyword;
      this.setParamsAction({ params: this.params });
      this.searchAction({ params: this.params });
    },
    clear() {
      this.keyword = "";
      this.params.q = "";
    },
    setSearchInputBorder() {
      const searchInputBox = document.getElementById("searchInputBox");
      searchInputBox.classList.add("border-blue-400");
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>