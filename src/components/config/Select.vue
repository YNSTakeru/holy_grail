<template>
  <div class="p-4 py-0 w-50 flex flex-col gap-4" @click="closeConfig">
    <div
      id="inputOrderWrapper"
      class="relative w-full h-auto"
      @click.stop="openOrderOptions"
    >
      <input
        type="text"
        placeholder="並び順を設定"
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
        v-model="orderText"
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
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
    <transition name="top">
      <ul
        v-show="showOrderOptions"
        id="orderOptionsBox"
        class="bg-white p-2 px-0 mt-2 relative rounded-md w-full"
      >
        <li
          v-for="(orderOption, index) in orderOptions"
          :key="orderOption.value"
        >
          <button
            v-show="index !== useSelectedOrderOptionNumber"
            class="
              p-2
              px-3
              w-full
              h-auto
              text-left
              transition
              ease-in-out
              duration-1000
              focus:bg-blue-400 focus:text-white
            "
            @click.stop="setOrderValue(orderOption, index)"
          >
            {{ orderOption.label }}
          </button>
          <button
            v-show="index === useSelectedOrderOptionNumber"
            class="
              p-2
              px-3
              w-full
              h-auto
              text-left
              transition
              ease-in-out
              duration-1000
              bg-blue-400
              text-white
            "
            @click.stop="setOrderValue(orderOption, index)"
          >
            {{ orderOption.label }}
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      showOrderOptions: false,
      orderOptions: [
        { value: "date", label: "投稿が新しい順" },
        { value: "rating", label: "高評価の多い順" },
        { value: "relevance", label: "関連性の高い順" },
        { value: "title", label: "アルファベット昇順" },
        { value: "viewCount", label: "再生回数の多い順" },
      ],
      orderText: "",
      selectedOrderOptionNumber: null,
      useSelectedOrderOptionNumber: null,
    };
  },
  methods: {
    ...mapActions(["searchAction"]),
    ...mapActions("config", ["setOrderAction", "setParamsAction"]),
    ...mapGetters("config", ["params"]),
    setOrderValue(orderOption, i) {
      this.orderText = orderOption.label;
      this.useSelectedOrderOptionNumber = null;
      this.selectedOrderOptionNumber = i;
      this.setOrderAction(
        this.orderOptions[this.selectedOrderOptionNumber].value
      );
      let params = this.params();
      params.order = this.orderOptions[this.selectedOrderOptionNumber].value;
      this.setParamsAction({ params: params });
      this.searchAction({ params: params });
    },
    closeConfig() {
      this.showOrderOptions = false;
      this.useSelectedOrderOptionNumber = this.selectedOrderOptionNumber;
      const arrow = document.querySelector("#inputOrderWrapper > svg");
      if (!this.showOrderOptions) {
        arrow.style.transform = "rotate(0deg)";
      }
    },
    openOrderOptions() {
      this.showOrderOptions = !this.showOrderOptions;
      const arrow = document.querySelector("#inputOrderWrapper > svg");
      if (this.showOrderOptions) {
        arrow.style.transform = "rotate(-180deg)";
      } else {
        arrow.style.transform = "rotate(0deg)";
      }
    },
  },
};
</script>

<style>
#orderOptionsBox:before {
  content: "";
  position: absolute;
  top: -30px;
  left: 15%;
  margin-left: -15px;
  border: 15px solid transparent;
  border-bottom: 15px solid white;
}

#orderOptionsBox li {
  border-bottom: 1px solid black;
}

#orderOptionsBox li:last-of-type {
  border-bottom: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.top-enter-active,
.top-leave-active {
  transform: translate(0px, 0px);
  transition: all 0.5s cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.top-enter,
.top-leave-to {
  transform: translateY(-10vh) translateY(0px);
  opacity: 0;
}
</style>