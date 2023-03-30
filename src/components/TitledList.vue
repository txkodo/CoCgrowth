<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="title">{{ title }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <q-list class="q-ml-xs">
        <div v-for="a of list" :key="a">{{ a }}</div>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
export interface TitledListProps {
  title: string;
  list: string[];
}
withDefaults(defineProps<TitledListProps>(), {
  title: '',
});
</script>


<style scoped lang="scss">
.title {
  font-weight: 900;
}
</style>
