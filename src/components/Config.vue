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
  >
    <transition name="fade" mode="out-in" class="">
      <Select v-show="showConfig" class="" />
    </transition>
    <transition name="fade">
      <SelectPublishedAfter v-show="showConfig" mode="out-in" />
    </transition>
  </div>
</template>

<script>
import Select from "@/components/config/Select";
// import SelectPublishedAfter from "@/components/config/SelectPublishedAfter";
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("config", ["showConfig"]),
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