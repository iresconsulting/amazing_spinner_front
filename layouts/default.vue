<template>
  <v-app id="canvas">
    <v-main>
      <v-container fluid class="px-0 py-0">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  private get isDarkMode(): boolean {
    return this.$vuetify.theme.dark
  }

  private dialog: any = {
    cog: false,
    version: false,
    error: false
  }

  private handleToggleTheme(): void {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    window.localStorage.setItem('tm', this.$vuetify.theme.dark.toString())
  }

  private created() {
  }

  private mounted() {
  }
}
</script>
