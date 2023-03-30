<template>
  <q-page class="row q-pa-md q-gutter-md doc-container">
    <div class="col-2">
      <q-file
        outlined
        v-model="file"
        label="CCFOLIAログhtmlファイルを選択"
        @update:model-value="onUpaload"
      />

      <q-card flat bordered class="my-card q-mt-md">
        <q-card-section>
          <div class="text-h6">初期値不明</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="q-ml-xs">
            <span v-for="a of s?.['unknown_skills']" :key="a"># {{ a }}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <div v-if="s" class="q-gutter-md" bordered>
        <div
          v-for="[name, character] of Object.entries(s['characters'])"
          :key="name"
        >
          <q-card flat bordered>
            <q-expansion-item
              expand-separator
              header-class="text-h6"
              :label="name"
            >
              <q-separator inset />
              <q-card-section flat bordered>
                <q-card flat bordered>
                  <div
                    v-for="[tabname, tab] of Object.entries(character)"
                    :key="tabname"
                  >
                    <q-expansion-item expand-separator :label="tabname">
                      <q-separator inset />
                      <q-card-section class="q-gutter-md">
                        <div
                          v-for="[level, skills] of Object.entries(
                            tab['levels']
                          )"
                          :key="level"
                          class="q-gutter-xs"
                        >
                          <div>
                            <span class="genre">{{ levelmap[level] }}</span>
                          </div>
                          <div class="q-ml-md">
                            <div
                              v-if="Object.keys(skills).length"
                              class="skills"
                            >
                              <span
                                v-for="[skill, count] of Object.entries(skills)"
                                :key="skill"
                              >
                                {{ skill }} x{{ count }}
                              </span>
                            </div>
                            <div v-else>なし</div>
                          </div>
                        </div>

                        <div>
                          <div>
                            <span class="genre">初期値成功</span>
                          </div>
                          <div class="q-ml-md">
                            <div v-if="Object.keys(tab['initial']).length">
                              <span
                                v-for="[skill, count] of Object.entries(
                                  tab['initial']
                                )"
                                :key="skill"
                              >
                                {{ skill }} x{{ count }}
                              </span>
                            </div>
                            <div v-else>なし</div>
                          </div>
                        </div>
                        <q-card flat bordered>
                          <q-expansion-item
                            expand-separator
                            header-class="genre"
                            label="その他"
                          >
                            <q-separator inset />
                            <q-card-section>
                              <div v-for="chat of tab.other" :key="chat">
                                {{ chat }}
                              </div>
                            </q-card-section>
                          </q-expansion-item>
                        </q-card>
                      </q-card-section>
                    </q-expansion-item>
                  </div>
                </q-card>
              </q-card-section>
            </q-expansion-item>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.genre {
  font-weight: 900;
}

.skills {
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

<script setup lang="ts">
import { parseCcfoliaLog, type RollLevel } from '../scripts/decoder';
import { sortLog, type SortedLog } from '../scripts/sort';
import { ref } from 'vue';
const file = ref(null);
const s = ref<SortedLog>();

const levelmap: { [key in string]: string } = {
  critical: 'クリティカル',
  extreme: 'イクストリーム',
  hard: 'ハード',
  regular: 'レギュラー',
  failure: '失敗',
  funble: 'ファンブル',
};

const onUpaload = async (value: File) => {
  const log = await parseCcfoliaLog(value);
  s.value = sortLog(log);
};
</script>
