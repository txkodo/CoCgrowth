<template>
  <q-expansion-item expand-separator :label="label" :header-class="headerClass">
    <q-separator inset />
    <q-card-section class="q-gutter-md">
      <template v-if="skillRollExists(tab)">
        <div
          v-for="[level, skills] of Object.entries(tab['levels'])"
          :key="level"
          class="q-gutter-xs"
        >
          <div>
            <span class="genre">{{ levelmap[level] }}</span>
          </div>
          <SkillList
            :showStatusRolls="showStatusRolls"
            :showSuccessCount="showSuccessCount"
            :skills="skills"
          ></SkillList>
        </div>

        <div>
          <div>
            <span class="genre">初期値成功</span>
          </div>
          <SkillList
            :showStatusRolls="showStatusRolls"
            :showSuccessCount="showSuccessCount"
            :skills="tab['initial']"
          ></SkillList>
        </div>
      </template>

      <SystemLogs label="システムログ" :logs="tab.system"></SystemLogs>
      <OtherChat label="その他" :chat="tab.other"></OtherChat>
    </q-card-section>
  </q-expansion-item>
</template>

<style scoped lang="scss">
.genre {
  font-weight: 900;
}
</style>

<script setup lang="ts">
import SkillList from '../components/SkillList.vue';
import SystemLogs from '../components/SystemLogs.vue';
import OtherChat from '../components/OtherChat.vue';
import { ChalacterLog } from '../scripts/sort';

export interface TabViewProps {
  showStatusRolls: boolean;
  showSuccessCount: boolean;
  headerClass: string;
  label: string;
  tab: ChalacterLog;
}
const levelmap: { [key in string]: string } = {
  critical: 'クリティカル',
  extreme: 'イクストリーム',
  hard: 'ハード',
  regular: 'レギュラー',
  failure: '失敗',
  funble: 'ファンブル',
};

const skillRollExists = (tab: ChalacterLog) => {
  return Object.values(tab.levels).reduce(
    (prev, x) => prev || Object.keys(x).length !== 0,
    false
  );
};

withDefaults(defineProps<TabViewProps>(), {
  headerClass: '',
});
</script>
