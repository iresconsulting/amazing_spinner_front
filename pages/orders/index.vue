<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">Orders Management</h2>
        <v-card outlined>
          <v-toolbar flat>
            <v-btn
              color="primary"
              @click="$router.push({ name: 'orders-create' })"
            >
              <v-icon>mdi-plus</v-icon> Add
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="desserts"
              :single-select="singleSelect"
              item-key="name"
              show-select
              class="elevation-1 mt-4"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default'
})
export default class OrdersIndex extends Vue {
  private headers: Array<any> = [
    { text: 'ID', value: 'calories', align: 'start', sortable: true },
    { text: 'Store', value: 'carbs', align: 'start', sortable: true },
    { text: 'Source (Customer ID)', value: 'carbs', align: 'start', sortable: true },
    { text: 'Deliver Status', value: 'carbs', align: 'start', sortable: true },
    { text: 'Monetary Status', value: 'carbs', align: 'start', sortable: true },
    { text: 'Date', value: 'carbs', align: 'start', sortable: true },
    { text: 'Misc', value: 'carbs', align: 'start', sortable: false }
  ]

  private async created() {
  }
}
</script>
