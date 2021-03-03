<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">Add Institution</h2>
        <v-card outlined>
          <v-card-text>
            <v-container>
              <v-row>
                <v-btn color="primary">
                  Download Sample
                </v-btn>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    small-chips
                    multiple
                    label="Excel"
                    placeholder="Click to Upload"
                    prepend-icon=""
                    hint="格式限制為大小限制 2MB 的 JPG、PNG、GIF"
                    persistent-hint
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row>
                <v-btn color="primary" @click="handleSubmit">
                  <v-icon>mdi-checkbox-marked-outline</v-icon>
                  <span> Submit</span>
                </v-btn>
                <v-btn color="default" class="ml-4" @click="$router.push('/store/')">
                  <span>Back</span>
                </v-btn>
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
export default class StoreCreateExcel extends Vue {
  // private async sendGetGroupListRequest() {
  //   try {
  //     await sysStore.getPermissionList({
  //       token: this.$cookies.get('accessToken')
  //     })
  //   } catch (e) {
  //     // error
  //   }
  // }

  private async handleSubmit(): Promise<void> {

  }

  private async created() {
    // await this.sendGetPermissionListRequest()
  }
}
</script>
