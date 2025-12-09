<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item title="APIRE Compliance" subtitle="Checker"></v-list-item>
        <v-divider></v-divider>
        <v-list-item link title="Dashboard"></v-list-item>
        <v-list-item link title="Policy Scanner"></v-list-item>
        <v-list-item link title="Reports"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Compliance Dashboard</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <h1>Welcome to APIRE Compliance Checker</h1>
        <!-- TODO: Implement Dashboard based on WEB_INTERFACE_GUIDE.md -->
      </v-container>
    </v-main>
  </v-app>
</template>
