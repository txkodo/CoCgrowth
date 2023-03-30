<template>
  <q-card flat bordered v-if="chat[0]">
    <q-expansion-item
      expand-separator
      :header-class="headerClass"
      :label="label"
    >
      <q-separator inset />
      <q-card-section>
        <div v-for="line of chat" :key="line">
          {{ line }}
        </div>
      </q-card-section>
    </q-expansion-item>
  </q-card>
</template>

<script setup lang="ts">
export interface OtherChatProps {
  label: string;
  chat: string[];
  headerClass: string;
}
withDefaults(defineProps<OtherChatProps>(), { headerClass: '' });
</script>
