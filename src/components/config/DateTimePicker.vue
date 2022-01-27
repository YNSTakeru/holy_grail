<template>
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
        :label="text"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      :active-picker.sync="activePicker"
      :max="
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      "
      min="2005-4-23"
      locale="ja-jp"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: ["text"],
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
  }),
  computed: {},
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.$emit("getDateEmit", date);
    },
  },
};
</script>

<style>
</style>