<template>
  <div
    class="
      py-4
      fixed
      top-16
      left-0
      w-screen
      h-auto
      z-10
      bg-gray-100 bg-opacity-90
      flex flex-col
      gap-4
    "
    v-show="showConfig"
  >
    <transition name="fade" mode="out-in" class="">
      <Select v-show="showConfig" class="" />
    </transition>
    <div class="px-4 font-bold">期間を指定</div>
    <div>
      <div v-show="errorMessage" class="px-4 text-md text-red-400">
        終了日を超えています
      </div>
      <DateTimePickerTime
        text="開始日"
        @getDateEvent="getStartDateReceive"
        :hourSelect="startHourSelect"
        @getHourEvent="getStartHourReceive"
        :minutesSelect="startMinutesSelect"
        @getMinutesEvent="getStartMinutesReceive"
        :secondsSelect="startSecondsSelect"
        @getSecondsEvent="getStartSecondsReceive"
      />
      <div v-show="errorMessage" class="px-4 text-md text-red-400">
        開始日よりも前です
      </div>
      <DateTimePickerTime
        text="終了日"
        @getDateEvent="getEndDateReceive"
        :hourSelect="endHourSelect"
        @getHourEvent="getEndHourReceive"
        :minutesSelect="endMinutesSelect"
        @getMinutesEvent="getEndMinutesReceive"
        :secondsSelect="endSecondsSelect"
        @getSecondsEvent="getEndSecondsReceive"
      />
    </div>
  </div>
</template>

<script>
import Select from "@/components/config/Select";
import DateTimePickerTime from "@/components/config/DateTimePickerTime";

import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("config", [
      "showConfig",
      "publishedBefore",
      "publishedAfter",
      "params",
    ]),
  },
  data() {
    return {
      pms: null,
      errorMessage: false,
      startHourSelect: { state: "0時", abbr: "00" },
      startMinutesSelect: { state: "0分", abbr: "00" },
      startSecondsSelect: { state: "0秒", abbr: "00" },
      endHourSelect: { state: "23時", abbr: "23" },
      endMinutesSelect: { state: "59分", abbr: "59" },
      endSecondsSelect: { state: "59秒", abbr: "59" },
    };
  },
  mounted() {
    this.pms = {
      key: this.params.key,
      maxResults: this.params.maxResults,
      order: this.params.order,
      part: this.params.part,
      publishedBefore: this.publishedBefore,
      publishedAfter: this.publishedAfter,
      q: "",
      type: this.params.type,
    };
  },
  methods: {
    ...mapActions(["searchAction"]),
    ...mapActions("config", [
      "setParamsAction",
      "setStartDateAction",
      "setStartHourAction",
      "setStartMinutesAction",
      "setStartSecondsAction",
      "setEndDateAction",
      "setEndHourAction",
      "setEndMinutesAction",
      "setEndSecondsAction",
    ]),
    getStartDateReceive(date) {
      this.setStartDateAction({ date });
      this.search();
    },
    getEndDateReceive(date) {
      this.setEndDateAction({ date });
      this.search();
    },
    getStartHourReceive(data) {
      this.setStartHourAction(data);
      this.search();
    },
    getStartMinutesReceive(data) {
      this.setStartMinutesAction(data);
      this.search();
    },
    getStartSecondsReceive(data) {
      this.setStartSecondsAction(data);
      this.search();
    },
    getEndHourReceive(data) {
      this.setEndHourAction(data);
      this.search();
    },
    getEndMinutesReceive(data) {
      this.setEndMinutesAction(data);
      this.search();
    },
    getEndSecondsReceive(data) {
      this.setEndSecondsAction(data);
      this.search();
    },
    search() {
      this.pms.publishedAfter = this.publishedAfter;
      this.pms.publishedBefore = this.publishedBefore;
      const publishedAfter = new Date(this.publishedAfter).getTime();
      const publishedBefore = new Date(this.publishedBefore).getTime();
      if (publishedAfter > publishedBefore) {
        this.errorMessage = true;
        return;
      }
      this.errorMessage = false;
      this.setParamsAction({ params: this.pms });
      this.searchAction({ params: this.pms });
    },
  },
  components: {
    Select,
    DateTimePickerTime,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>