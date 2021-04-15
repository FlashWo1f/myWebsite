<template>
  <HelloWorld />
</template>

<script setup>
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import router from '@/router'
// console.log(router)
router.push('/order')
defineComponent({
  components: {
    HelloWorld,
  }
})
</script>

<style>

</style>