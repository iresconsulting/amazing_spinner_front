<template>
  <div>
    <v-toolbar flat class="banner">
      <h1>
        <strong class="primary--text">Select a functionality from the left...</strong>
      </h1>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({
  layout: 'default'
})
export default class Index extends Vue {}
</script>
<style lang="scss" scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}
</style>
