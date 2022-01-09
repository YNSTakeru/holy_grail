<template>
  <div v-show="showConfig">
    <Select class="fixed top-16 left-0 w-screen h-auto z-10 bg-gray-100" />
  </div>
</template>

<script>
import Select from "@/components/config/Select";
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