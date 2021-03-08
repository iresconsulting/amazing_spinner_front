<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">Employees Management</h2>
        <v-card outlined>
          <v-toolbar flat>
            <v-btn
              color="primary"
              @click="$router.push({ name: 'employees-create' })"
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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default'
})
export default class EmployeesIndex extends Vue {
  private headers: Array<any> = [
    { text: 'Name', value: 'calories', align: 'start', sortable: true },
    { text: 'Contact', value: 'calories', align: 'start', sortable: false },
    { text: 'Role', value: 'carbs', align: 'start', sortable: true },
    { text: 'Branch (Store)', value: 'calories', align: 'start', sortable: true },
    { text: 'Misc', value: 'carbs', align: 'start', sortable: false }
  ]

  private async created() {
    // await this.sendGetPermissionListRequest()
  }
}
</script>
