<template>
  <v-card class="mt-5 ml-5 mr-5">
    <v-card-title>This page is not found.</v-card-title>
    <v-card-text>
      <v-btn color="primary" @click="$router.push('/')">Back to Main</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class LoginLayout extends Vue {}
</script>
