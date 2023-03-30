<template>
  <q-card flat bordered v-if="logs[0]">
    <q-expansion-item
      expand-separator
      :header-class="headerClass"
      :label="label"
    >
      <q-separator inset />
      <q-card-section>
        <div v-for="(log, i) of logs" :key="i">
          {{ log.status }} : {{ log.before }} -> {{ log.after }} ({{
            diff(log.before, log.after)
          }})
        </div>
      </q-card-section>
    </q-expansion-item>
  </q-card>
</template>

<script setup lang="ts">
import { SystemLog } from 'src/scripts/sort';

export interface OtherChatProps {
  label: string;
  logs: SystemLog[];
  headerClass: string;
}

const diff = (before: number, after: number) => {
  if (before < after) {
    return `+${after - before}`;
  } else if (before > after) {
    return `-${before - after}`;
  }
  return '0';
};

withDefaults(defineProps<OtherChatProps>(), { headerClass: '' });
</script>
