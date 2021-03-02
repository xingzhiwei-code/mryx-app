<template>
  <div class="index">
    <Card />

    <Charts />
  </div>
</template>

<script>
import Card from '@/components/Statistics/cards.vue';
import Charts from '@/components/Statistics/charts.vue';

export default {
  components: {
    Card,
    Charts,
  },
};
</script>

<style>
</style>
