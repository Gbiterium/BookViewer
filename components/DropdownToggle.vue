<template>
    <div class="border-top">
      <div class="py-2 px-3 fs-14 d-flex justify-content-between align-items-center" @click="show = !show">
        {{ label }}
        <b-icon-chevron-down v-if="!show" class="text-grey" />
        <b-icon-chevron-up v-else class="text-grey" />
      </div>
      <div v-if="show" class="py-2 dropdown-list fs-14">
        <div class="mx-3">
        <slot></slot>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
    props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.dropdown-list {
    background: #FBFDFE;
}
</style>