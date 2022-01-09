<template>
  <div class="p-4 py-0 w-50">
    <div class="mb-2">期間を指定</div>
    <div class="relative">
      <input
        type="text"
        placeholder="開始日"
        class="
          p-2
          px-3
          rounded-md
          bg-white
          w-full
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition
          ease-in-out
          duration-1000
        "
        readOnly="true"
        v-model="publishedBefore"
        @click="openCalendar"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 absolute top-2 right-2 transition duration-1000"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
    <Calendar class="" />
  </div>
</template>

<script>
import Calendar from "@/components/Calendar";
export default {
  data() {
    return {
      publishedBefore: null,
    };
  },
  components: {
    Calendar,
  },
  methods: {
    openCalendar() {},
  },
};
</script>

<style>
</style>