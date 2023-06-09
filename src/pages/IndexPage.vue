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
      <q-btn
        v-if="url"
        class="full-width"
        icon-right="link"
        outline
        no-caps
        @click="copyURL()"
      >
        {{ url }}<q-space />
        <span class="text-grey-6" v-if="copiedUrl"> copied </span></q-btn
      >
      <q-btn
        v-else
        class="full-width"
        :disable="sortedLog === undefined"
        :loading="exportingUrl"
        color="grey-9"
        @click="exportURL()"
        >共有URLを発行</q-btn
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
import TabView from '../components/TabView.vue';
import { parseCcfoliaLog } from '../scripts/decoder';
import { sortLog, type SortedLog } from '../scripts/sort';
import { setData } from '../scripts/save';
import { ref } from 'vue';
import { copyToClipboard } from 'quasar';

const file = ref<File | null>(null);

const showStatusRolls = ref(false);

const showSuccessCount = ref(false);

const url = ref<string | null>(null);

const exportingUrl = ref(false);

const copiedUrl = ref(false);

const sortedLog = ref<SortedLog>();

const exportURL = async () => {
  exportingUrl.value = true
  if (sortedLog.value === undefined) return;
  url.value = "https://txkodo.github.io/CoCgrowth/#/saves/" + await setData(sortedLog.value);
  exportingUrl.value = false
};

const copyURL = async () => {
  copiedUrl.value = true;
  if (url.value !== null) {
    await copyToClipboard(url.value);
    copiedUrl.value = true;
  }
};

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
  copiedUrl.value = false;
  url.value = null;
};
</script>
