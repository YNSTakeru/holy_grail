<template>
  <div class="">
    <Header class="fixed top-0 left-0" />
    <transition name="fade">
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
        v-show="!expansionCalendarFlag"
      >
          <div class="px-4">
            <div class="" v-for="card in cards" :key="card.year"><div>
                <div class="text-2xl border-b-4 py-2 pb-1">
                  {{card.year}}
                </div>    
                <div class="grid grid-cols-3 gap-1 pt-2">
                  <div v-for="month in card.months" :key="month.number" @click="expansionCalendar(card.year,month.number)">
                    <div>
                      {{month.number}}月
                    </div>
                    <div class="grid grid-cols-7 ">
                      <div v-for="day in month.days" :key="day" class=" border-gray-300 border text-center">
                        <div class="text-xs">
                          {{day}}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
            </div>
          </div>
        </div>

      </div>
    </transition>
    <transition name="fade">
      <div v-show="expansionCalendarFlag" class="
          absolute
          top-0
          left-0
          w-screen
          h-screen
          bg-white
          overflow-scroll
          pb-20">
          <div v-for="card in cards" :key="card.year">
            <div class="text-2xl border-b-4 py-2 pb-1" >{{card.year}}年</div>
            <div class="">
              <div v-for="month in card.months" :key="month.number">
                <div :id="card.year.toString()+'-'+month.number.toString()" class="p-2 text-2xl font-bold">{{month.number}}月</div>
                <div class="grid grid-cols-7">
                  <div v-for="day in month.days" :key="day">
                    <div class="border-b border-t text-center text-lg p-2">{{day}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </transition>
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
      expansionCalendarFlag: false,
      cards: [],
      calendar: {
        month: null,
        days: null,
      },
      moveId: null,
      headerHeight: parseInt(75)
    };
  },
  created() {
    const date = new Date();
    this.currentYear = parseInt(date.getFullYear());
    this.currentMonth = parseInt(date.getMonth() + 1);
        
    const yearLength = this.currentYear - this.beginYear;
     let leapDay = 28
     if(this.currentYear % 4 === 0 ){
      leapDay = 29
    }
    let dayLength = [31,leapDay,31,30,31,30,30,31,30,31,30,31]


    for (let i = 0; i <= yearLength; i++) {
      const months = [];
      let maxMonth = 12;
      if (i === yearLength) {
        maxMonth = this.currentMonth;
      }

      for (let i = 0; i < maxMonth; i++) {
        const days = []
        for(let j = 1; j <= dayLength[i]; j++){
          days.push(j)
        }
        
        months.push({number: i+1, days: days})
      }

      this.cards.push({ year: this.beginYear + i, months: months });
    }
  },
  async updated(){
    if(this.moveId !== null){
      const goToDom = document.getElementById(this.moveId)
      await goToDom.scrollIntoView({behavior: "smooth"})
      this.moveId = null
    }
  },
  components: {
    Header,
  },
  methods: {
    expansionCalendar(year,month){
      this.expansionCalendarFlag = true
      this.moveId = `${year}-${month}` 
    }
  }
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