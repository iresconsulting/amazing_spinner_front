<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">Add Institution</h2>
        <v-card outlined>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" class="mt-n5">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="Name"
                    hint="255 Letters"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mt-n5">
                  <v-select :items="countries" label="Country" v-model="criterias.country"></v-select>
                </v-col>
                <v-col cols="6" class="mt-n5">
                  <v-select :items="cities" label="City" :disabled="criterias.country === ''" v-model="criterias.city"></v-select>
                </v-col>
                <v-col cols="6" class="mt-n5">
                  <v-select :items="levels" label="Level" v-model="criterias.level"></v-select>
                </v-col>
                <v-col cols="6" class="mt-n5">
                  <v-select :items="majors" label="Major" :disabled="criterias.level === ''" v-model="criterias.major"></v-select>
                </v-col>
                <v-col cols="3" class="mt-n5">
                  <v-select :items="rankings" label="QS World Ranking" v-model="criterias.rankQs"></v-select>
                </v-col>
                <v-col cols="3" class="mt-n5">
                  <v-select :items="rankings" label="US News World Ranking" v-model="criterias.rankWorld"></v-select>
                </v-col>
                <v-col cols="3" class="mt-n5">
                  <v-select :items="rankings" label="Country Ranking" v-model="criterias.rankCountry"></v-select>
                </v-col>
                <v-col cols="12" class="mt-n3">
                  <v-btn color="primary" @click="handleSubmit">
                    <v-icon>mdi-checkbox-marked-outline</v-icon>
                    <span> Submit</span>
                  </v-btn>
                  <v-btn color="default" class="ml-4" @click="$router.push('/store/')">
                    <span>Back</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
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
export default class StoreCreate extends Vue {
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

  private async handleSubmit(): Promise<void> {

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
