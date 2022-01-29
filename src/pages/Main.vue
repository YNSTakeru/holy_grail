<template>
  <main class="mt-2 grid">
    <div class="w-full h-56 bg-red-400 flex items-center justify-center mb-4">
      <img src="" alt="広告" />
    </div>
    <div
      class="mb-4 flex flex-col"
      v-for="video in videoList"
      :key="video.videoId"
    >
      <a
        class="mb-2 mx-auto mt-auto"
        :href="videoPath"
        @click="videoId = video.videoId"
        target="_blank"
      >
        <img :src="video.image" :alt="video.title" />
      </a>
      <div class="pl-4">
        <a :href="videoPath" @click="videoId = video.videoId" target="_blank">
          <div>{{ video.title }}</div>
        </a>
      </div>
      <div class="pl-4 text-xs">{{ video.publishedAt }}</div>
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