<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">Institutions</h2>
        <v-card outlined>
          <v-toolbar flat>
            <v-btn
              color="primary"
              @click="$router.push({ name: 'store-create' })"
            >
              <v-icon>mdi-plus</v-icon> Add
            </v-btn>
            <v-btn
              class="ml-4"
              color="primary"
              @click="$router.push({ name: 'store-create-excel' })"
            >
              <v-icon>mdi-plus</v-icon> Add Via Excel
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-banner color="rgba(60, 141, 188, 0.05)">
              <v-container>
                <v-row>
                  <v-col cols="12" md="6" lg="3" class="mt-n5">
                   <v-text-field
                      v-model="criterias.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" lg="3" class="mt-n5">
                    <v-select :items="countries" label="Country" v-model="criterias.country"></v-select>
                  </v-col>
                  <v-col cols="12" md="6" lg="3" class="mt-n5">
                    <v-select :items="cities" label="City" :disabled="criterias.country === ''" v-model="criterias.city"></v-select>
                  </v-col>
                  <v-col cols="12" md="6" lg="3" class="mt-n5">
                    <v-select :items="levels" label="Level" v-model="criterias.level"></v-select>
                  </v-col>
                  <v-col cols="12" md="6" lg="3" class="mt-n5">
                    <v-select :items="majors" label="Major" :disabled="criterias.level === ''" v-model="criterias.major"></v-select>
                  </v-col>
                  <v-col cols="12" md="6" lg="3" class="mt-n5">
                    <v-select :items="rankings" label="QS World Ranking" v-model="criterias.rankQs"></v-select>
                  </v-col>
                  <v-col cols="12" md="6" lg="3" class="mt-n5">
                    <v-select :items="rankings" label="US News World Ranking" v-model="criterias.rankWorld"></v-select>
                  </v-col>
                  <v-col cols="12" md="6" lg="3" class="mt-n5">
                    <v-select :items="rankings" label="Country Ranking" v-model="criterias.rankCountry"></v-select>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-btn color="primary">
                      <v-icon>mdi-magnify</v-icon> Search
                    </v-btn>
                    <v-btn color="default" class="ml-4" @click="handleClear">
                      Clear
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-banner>
          </v-card-text>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="tableBody"
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
  layout: 'default',
  middleware: 'auth'
})
export default class InstitutionIndex extends Vue {
  private headers: Array<any> = [
    { text: 'Name', value: 'calories', align: 'start', sortable: true },
    { text: 'Country', value: 'fat', align: 'start', sortable: false },
    { text: 'City', value: 'carbs', align: 'start', sortable: false },
    { text: 'QS Ranking', value: '1', align: 'start', sortable: true },
    { text: 'US News Ranking', value: '2', align: 'start', sortable: true },
    { text: 'Country Ranking', value: '3', align: 'start', sortable: true },
    { text: 'Last Updated', value: '4', align: 'start', sortable: false },
    { text: 'Misc', value: '5', align: 'start', sortable: false }
  ]

  private criterias = {
    name: '',
    country: '',
    city: '',
    level: '',
    major: '',
    rankQs: '',
    rankUs: '',
    rankCountry: ''
  }

  private countries: Array<any> = [
    { text: 'All', value: 'all' },
    { text: 'Australia', value: 'aus' },
    { text: 'United Kingdom', value: 'uk' },
    { text: 'United States', value: 'us' }
  ]

  private cities: Array<any> = [
    { text: 'Australia', value: 'aus' },
    { text: 'United Kingdom', value: 'uk' },
    { text: 'United States', value: 'us' }
  ]

  private levels: Array<any> = [
    { text: 'Undergraduate', value: 'aus' },
    { text: 'Graduate', value: 'uk' }
  ]

  private rankings: Array<any> = [
    { text: 'All', value: 'all' },
    { text: 'Top 25', value: '25' },
    { text: 'Top 50', value: '50' },
    { text: 'Top 100', value: '100' },
    { text: 'Top 200', value: '200' }
  ]

  private handleClear(): void {
    this.criterias = {
      name: '',
      country: '',
      city: '',
      level: '',
      major: '',
      rankQs: '',
      rankUs: '',
      rankCountry: ''
    }
  }

  private majors = []

  private get tableBody(): Array<any> {
    return []
  }
  // private async sendGetGroupListRequest() {
  //   try {
  //     await sysStore.getPermissionList({
  //       token: this.$cookies.get('accessToken')
  //     })
  //   } catch (e) {
  //     // error
  //   }
  // }

  private async created() {
    // await this.sendGetPermissionListRequest()
  }
}
</script>
