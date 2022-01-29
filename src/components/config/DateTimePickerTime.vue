<template>
  <div>
    <div class="px-4">
      <DateTimePicker @getDateEmit="getDateReceive" :text="text" />
    </div>
    <div class="px-6">
      <VSelect
        :selectProp="hourSelect"
        :items="hourItems"
        @setSelectEmit="getHourReceive"
      />
    </div>
    <div class="px-6">
      <VSelect
        :selectProp="minutesSelect"
        :items="minutesItems"
        @setSelectEmit="getMinutesReceive"
      />
    </div>
    <div class="px-6">
      <VSelect
        :selectProp="secondsSelect"
        :items="secondsItems"
        @setSelectEmit="getSecondsReceive"
      />
    </div>
  </div>
</template>

<script>
import VSelect from "@/components/config/VSelect";
import DateTimePicker from "@/components/config/DateTimePicker";
import { mapActions } from "vuex";

export default {
  components: {
    DateTimePicker,
    VSelect,
  },
  props: {
    text: {
      type: String,
    },
    hourSelect: {
      type: Object,
    },
    minutesSelect: {
      type: Object,
    },
    secondsSelect: {
      type: Object,
    },
  },
  data() {
    return {
      hourItems: [{ state: "0時", abbr: "00" }],
      minutesItems: [{ state: "0分", abbr: "00" }],
      secondsItems: [{ state: "0秒", abbr: "00" }],
    };
  },
  created() {
    for (let i = 1; i <= 23; i++) {
      this.hourItems.push({ state: `${i}時`, abbr: `0${i}`.slice(-2) });
    }
    for (let i = 1; i <= 60; i++) {
      this.minutesItems.push({ state: `${i}分`, abbr: `0${i}`.slice(-2) });
    }
    for (let i = 1; i <= 60; i++) {
      this.secondsItems.push({ state: `${i}秒`, abbr: `0${i}`.slice(-2) });
    }
  },

  methods: {
    ...mapActions("config", [
      "setStartDateAction",
      "setStartHourAction",
      "setStartMinutesAction",
      "setStartSecondsAction",
    ]),
    getDateReceive(date) {
      this.$emit("getDateEvent", date);
    },
    getHourReceive(data) {
      this.$emit("getHourEvent", data);
    },
    getMinutesReceive(data) {
      this.$emit("getMinutesEvent", data);
    },
    getSecondsReceive(data) {
      this.$emit("getSecondsEvent", data);
    },
  },
};
</script>

<style>
</style>