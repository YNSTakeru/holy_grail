<template>
  <div class="">
    <Header class="fixed top-0 left-0" />
    <div
      class="
        absolute
        top-0
        left-0
        w-screen
        h-screen
        bg-white
        overflow-scroll
        pb-20
      "
    >
      <ul v-for="card in cards" :key="card.year" class="">
        <li class="border-b-4 mx-4 p-4 px-0 pb-2 font-bold text-3xl">
          {{ card.year }}年
        </li>
        <ul class="grid grid-cols-3 gap-2">
          <li v-for="month in card.months" :key="month" class="p-2 px-0 mx-4">
            <span class="font-bold">{{ month }}月</span>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "@/components/calendar/Header";
export default {
  data() {
    return {
      beginYear: parseInt(2005),
      currentYear: null,
      currentMonth: null,
      cards: [],
    };
  },
  created() {
    const date = new Date();
    this.currentYear = parseInt(date.getFullYear());
    this.currentMonth = parseInt(date.getMonth() + 1);
    const yearLength = this.currentYear - this.beginYear;
    for (let i = 0; i <= yearLength; i++) {
      const months = [];
      let maxMonth = 12;
      if (i === yearLength) {
        maxMonth = this.currentMonth;
      }
      for (let i = 1; i <= maxMonth; i++) {
        months.push(i);
      }

      this.cards.push({ year: this.beginYear + i, months: months });
    }
  },
  components: {
    Header,
  },
};
</script>

<style>
</style>