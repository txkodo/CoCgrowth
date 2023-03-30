<template>
  <q-page class="row q-pa-md q-gutter-x-md doc-container">
    <div class="col-3 q-gutter-y-md">
      <q-file
        filled
        outlined
        v-model="file"
        label="CCFOLIAログhtmlファイルを選択"
        @update:model-value="onUpaload"
        accept=".html"
      />
      <div>
        <q-toggle v-model="showStatusRolls" label="ステータスロールを表示" />
      </div>
      <div>
        <q-toggle v-model="showSuccessCount" label="回数を表示" />
      </div>
      <TitledList
        v-if="sortedLog"
        :list="sortedLog.unknown_skills"
        title="初期値不明の技能"
      ></TitledList>
      <q-btn
        class="full-width"
        :disable="sortedLog === undefined"
        color="grey-9"
        @click="downloadJson()"
        >json形式でダウンロード</q-btn
      >
    </div>
    <div class="col">
      <div v-if="sortedLog" class="q-gutter-md" bordered>
        <div
          v-for="[name, character] of Object.entries(sortedLog['characters'])"
          :key="name"
        >
          <q-card flat bordered>
            <TabView
              :label="name"
              :tab="character"
              headerClass="text-h6"
              :showStatusRolls="showStatusRolls"
              :showSuccessCount="showSuccessCount"
            ></TabView>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TitledList from '../components/TitledList.vue';
import OtherChat from '../components/OtherChat.vue';
import TabView from '../components/TabView.vue';
import { parseCcfoliaLog, type RollLevel } from '../scripts/decoder';
import { sortLog, type SortedLog, type ChalacterLog } from '../scripts/sort';
import { ref } from 'vue';
import { K } from 'app/dist/spa/assets/index.27821dd1';

const file = ref<File | null>(null);

const showStatusRolls = ref(false);

const showSuccessCount = ref(false);

const sortedLog = ref<SortedLog>();

const downloadJson = async () => {
  if (sortedLog.value === undefined) {
    return;
  }

  const simplified = Object.fromEntries(
    Object.entries(sortedLog.value.characters)
      .map(([k, v]) => {
        return [k, { ...v.levels, initial: v.initial }];
      })
      .filter(([_, v]) =>
        Object.values(v).reduce(
          (prev, x) => prev || Object.keys(x).length !== 0,
          false
        )
      )
  );

  const text = JSON.stringify(simplified, undefined, 2);

  const link = document.createElement('a');

  link.href = URL.createObjectURL(
    new Blob([text], { type: 'application/json' })
  );

  let filename = file.value?.name ?? 'log';
  filename = filename.replace(/\.[^\.]+$/, '');
  filename += '.json';
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

const onUpaload = async (value: File) => {
  const log = await parseCcfoliaLog(value);
  sortedLog.value = sortLog(log);
};
</script>
