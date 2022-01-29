<template>
  <v-select
    v-model="selectCp"
    :items="items"
    item-text="state"
    item-value="abbr"
    label="開始時刻"
    persistent-hint
    return-object
    single-line
  ></v-select>
</template>
<script>
export default {
  props: {
    selectProp: {
      type: Object,
    },
    items: { type: Array },
  },
  data() {
    return { select: null };
  },
  created() {
    this.select = this.selectProp;
  },
  computed: {
    selectCp: {
      get() {
        return this.select;
      },
      set(val) {
        this.$emit("setSelectEmit", val);
      },
    },
  },
  methods: {},
};
</script>

<style>
</style>