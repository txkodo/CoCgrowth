<template>
  <div class="q-ml-md">
    <div class="skills">
      <template v-for="[skill, count] of Object.entries(skills)" :key="skill">
        <span v-if="showStatusRolls || !statusKeys.has(skill)">
          {{ skill }}
          <template v-if="showSuccessCount"> x{{ count }} </template>
        </span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { statusKeys } from '../scripts/sort';
export interface SkillListProps {
  showSuccessCount: boolean;
  showStatusRolls: boolean;
  skills: { [key in string]: number };
}
withDefaults(defineProps<SkillListProps>(), {});
</script>

<style scoped lang="scss">
.skills {
  &:empty::after {
    content: 'なし';
  }
  content: 'aaaa';
  span {
    &::after {
      content: ',';
    }
    &:last-child::after {
      content: '';
    }
  }
}
</style>
