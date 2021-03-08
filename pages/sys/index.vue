<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">Accounts Management</h2>
        <v-card outlined>
          <v-toolbar flat>
            <v-btn
              color="primary"
              @click="$router.push({ name: 'questionnaire-create' })"
            >
              <v-icon>mdi-plus</v-icon> Add
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="tableData"
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
export default class SysIndex extends Vue {
  private headers: Array<any> = [
    { text: 'Username', value: 'email', align: 'start', sortable: true },
    { text: 'Access Rights', value: '', align: 'start', sortable: true },
    { text: 'User', value: '', align: 'start', sortable: true },
    { text: 'Last Login', value: 'lastLogin', align: 'start', sortable: true },
    { text: 'Misc', value: '', align: 'start', sortable: false }
  ]

  private get tableData(): Array<any> {
    return sysStore.accountList.length > 0
      ? sysStore.accountList.map((item) => ({ ...item, lastLogin: new Date(item.last_login).toLocaleDateString('en', { year: 'numeric', month: 'numeric', day: 'numeric' }) }))
      : []
  }

  private async sendGetAccountListRequest() {
    try {
      await sysStore.getAccountList({
        token: this.$cookies.get('accessToken')
      })
    } catch (e) {
      // error
    }
  }

  private async created() {
    await this.sendGetAccountListRequest()
  }
}
</script>
