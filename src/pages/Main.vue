<template>
  <main class="mt-2 grid lg:grid-cols-4">
    <div
      class="
        lg:col-span-4
        w-auto
        h-56
        bg-red-400
        flex
        items-center
        justify-center
        mb-4
      "
    >
      <img src="" alt="広告" />
    </div>
    <div
      class="mb-4 flex flex-col justify-self-center w-96"
      v-for="video in videoList"
      :key="video.videoId"
    >
      <a
        class="mb-2 h-full w-full flex flex-col justify-center"
        :href="videoPath"
        @click="videoId = video.videoId"
        target="_blank"
        rel="noreferrer"
      >
        <img class="" :src="video.image" :alt="video.title" />
      </a>
      <div class="pl-2">
        <a
          :href="videoPath"
          @click="videoId = video.videoId"
          target="_blank"
          rel="noreferrer"
        >
          <div>{{ video.title }}</div>
        </a>
      </div>
      <div class="pl-2 text-xs">{{ video.publishedAt }}</div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      videoId: null,
      params: {
        q: "",
        part: "snippet",
        type: "video",
        maxResults: "50",
        publishedAfter: "2005-4-23T00:00:00Z",
        publishedBefore: "2007-12-31T23:59:59Z",
        key: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
        order: "date",
      },
    };
  },
  created() {
    this.search();
  },
  computed: {
    ...mapGetters("config", ["publishedAfter", "publishedBefore"]),
    videoPath() {
      return `https://www.youtube.com/watch?v=${this.videoId}`;
    },
    videoList() {
      return this.$store.getters.videoList;
    },
  },
  methods: {
    ...mapActions(["searchAction", "order"]),
    ...mapActions("config", ["setParamsAction"]),
    search() {
      this.params.publishedAfter = this.publishedAfter;
      this.params.publishedBefore = this.publishedBefore;

      this.setParamsAction({ params: this.params });
      this.searchAction({ params: this.params });
    },
  },
};
</script>

<style>
</style>