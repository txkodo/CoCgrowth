<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-secondary">
        <q-avatar size="28px">
          <img src="../assets/icon.png" />
        </q-avatar>
        <q-toolbar-title> CoC7版 成長チェッカー </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
