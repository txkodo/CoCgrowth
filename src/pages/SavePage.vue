<template>
  <q-page v-if="sortedLog" class="row q-pa-md q-gutter-x-md doc-container">
    <div class="col-3 q-gutter-y-md">
      <div>
        <q-toggle v-model="showStatusRolls" label="ステータスロールを表示" />
      </div>
      <div>
        <q-toggle v-model="showSuccessCount" label="回数を表示" />
      </div>
      <TitledList
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
      <div class="q-gutter-md" bordered>
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
  <div v-else class="text-center flex flex-center fullscreen">
    <q-spinner-ios color="primary" size="10em" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TitledList from '../components/TitledList.vue';
import TabView from '../components/TabView.vue';
import { parseCcfoliaLog } from '../scripts/decoder';
import { sortLog, type SortedLog } from '../scripts/sort';
import { setData, getData } from '../scripts/save';
import { copyToClipboard } from 'quasar';

const file = ref<File | null>(null);

const sortedLog = ref<SortedLog>();

const showStatusRolls = ref(false);

const showSuccessCount = ref(false);

const url = ref<string | null>(null);

const exportingUrl = ref(false);

const copiedUrl = ref(false);

const route = useRoute();

onMounted(async () => {
  sortedLog.value = await getData(route.params.id as string);
});

const exportURL = async () => {
  exportingUrl.value = true;
  if (sortedLog.value === undefined) return;
  url.value =
    'https://txkodo.github.io/CoCgrowth/#/' + (await setData(sortedLog.value));
  exportingUrl.value = false;
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
