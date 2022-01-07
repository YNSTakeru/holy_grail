<template>
   <div class="p-4 w-50 flex flex-col gap-4">
      <el-select id="orderSelect" v-model="orderValue" filterable placeholder="並び順を設定">
        <el-option class="orderOption"
          v-for="orderItem in orderOptions"
          :key="orderItem.value"
          :label="orderItem.label"
          :value="orderItem.value"
        >
        </el-option>
     </el-select>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>