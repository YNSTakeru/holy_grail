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
    <transition name="fade">
      <SelectPublishedAfter v-show="showConfig" mode="out-in" />
    </transition>
    <div class="px-4 font-bold">期間を指定</div>
    <div class="px-4">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="開始日"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :active-picker.sync="startActivePicker"
          :max="
            new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
              .toISOString()
              .substr(0, 10)
          "
          min="2005-04-23"
          @change="save"
          locale="ja_JP"
        ></v-date-picker>
      </v-menu>
    </div>
    <div class="px-6">
      <v-select
        v-model="startHourSelect"
        :items="startHourItems"
        item-text="state"
        item-value="abbr"
        label="Select"
        persistent-hint
        return-object
        single-line
      ></v-select>
    </div>
  </div>
</template>

<script>
import Select from "@/components/config/Select";
// import SelectPublishedAfter from "@/components/config/SelectPublishedAfter";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      startActivePicker: null,
      date: null,
      menu: false,
      startHourSelect: { state: "0時", abbr: "0" },
      startHourItems: [
        { state: "0時", abbr: "0" },
        { state: "1時", abbr: "1" },
        { state: "2時", abbr: "2" },
        { state: "3時", abbr: "3" },
        { state: "4時", abbr: "4" },
        { state: "5時", abbr: "5" },
        { state: "6時", abbr: "6" },
        { state: "7時", abbr: "7" },
        { state: "8時", abbr: "8" },
        { state: "9時", abbr: "9" },
        { state: "10時", abbr: "10" },
        { state: "11時", abbr: "11" },
        { state: "12時", abbr: "12" },
        { state: "13時", abbr: "13" },
        { state: "14時", abbr: "14" },
        { state: "15時", abbr: "15" },
        { state: "16時", abbr: "16" },
        { state: "17時", abbr: "17" },
        { state: "18時", abbr: "18" },
        { state: "19時", abbr: "19" },
        { state: "20時", abbr: "20" },
        { state: "21時", abbr: "21" },
        { state: "22時", abbr: "22" },
        { state: "23時", abbr: "23" },
      ],
    };
  },
  computed: {
    ...mapGetters("config", ["showConfig"]),
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.startActivePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
  },
  components: {
    Select,
    // SelectPublishedAfter,
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