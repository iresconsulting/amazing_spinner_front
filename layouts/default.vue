<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                link
                @click="handleUpdateRoute(child)"
                color="primary"
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon x-small class="ml-2">{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--Google Blue: color="blue darken-3" -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down" @click="$router.push('/')">
          ERP
        </span>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field> -->
      <v-spacer></v-spacer>
      <v-menu
        v-model="menuSetting.value"
        :disabled="menuSetting.disabled"
        :absolute="menuSetting.absolute"
        :open-on-hover="menuSetting.openOnHover"
        :close-on-click="menuSetting.closeOnClick"
        :close-on-content-click="menuSetting.closeOnContentClick"
        :offset-x="menuSetting.offsetX"
        :offset-y="menuSetting.offsetY"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="default" text class="mr-5" v-bind="attrs" v-on="on" large>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-card flat>
              <v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="4" class="px-0">
                      <v-img :src="dP" height="60" width="60"></v-img>
                    </v-col>
                    <v-col cols="8" class="px-0 pl-4">
                      <span>{{ username }}</span>
                      <br />
                      <span>{{ companyName }}</span>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  class="primary"
                  @click="$router.push('/account/updatePassword')"
                >
                  <v-icon>mdi-cog</v-icon>
                  <span> 修改密碼</span>
                </v-btn>
                <v-btn class="warning" @click="handleLogout">登出</v-btn>
              </v-card-actions>
            </v-card>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pt-0">
        <v-row align="center" justify="center">
          <v-col cols="12" class="mt-n4">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- <v-btn
      bottom
      color="primary"
      dark
      fab
      fixed
      left
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
    >
      <v-icon>mdi-toggle-switch</v-icon>
    </v-btn> -->
    <v-btn
      bottom
      :color="!$vuetify.theme.dark ? 'primary' : '#fb8c00'"
      fab
      fixed
      left
      @click="
        ;($vuetify.theme.dark = !$vuetify.theme.dark),
          (theme = !$vuetify.theme.dark)
      "
    >
      <v-icon v-show="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
      <v-icon v-show="!$vuetify.theme.dark">mdi-moon-waning-crescent</v-icon>
    </v-btn>
    <v-btn
      bottom
      color="primary"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-xml</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="primary white--text">
          當前版本
        </v-card-title>
        <v-card-text class="mt-4">
          Version 1.0.0 <br />
          <strong class="primary--text">更新時間： </strong>
          2021/3/4 上午12:56:10 <br />
          <div class="mt-7">
            Copyright © 2021
            <a
              class="primary--text text-decoration-none"
              href=""
              target="_blank"
            >
              123.
            </a>
            123 All rights reserved.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false" large>
            <strong>關閉</strong>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errorDialog" width="800px">
      <v-card>
        <v-card-title class="primary white--text">
          提示
        </v-card-title>
        <v-card-text class="mt-4">
          <h2 class="mt-4">伺服器錯誤，請稍後再試。</h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="errorDialog = false" large>
            <strong>關閉</strong>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { authStore } from '~/store'

@Component
export default class DefaultLayout extends Vue {
  private errorDialog: boolean = false

  private get username() {
    return authStore.user ? authStore.user.email : 'Username'
  }

  private get companyName() {
    return 'Company Name'
  }

  private get dP() {
    return authStore.user ? authStore.user.photopath : ''
  }

  private menuSetting: any = {
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ],
    disabled: false,
    absolute: false,
    openOnHover: false,
    value: false,
    closeOnClick: true,
    closeOnContentClick: true,
    offsetX: false,
    offsetY: true
  }

  private source: string = ''

  private dialog: boolean = false

  private drawer: boolean | null = null

  private currentTabName: string = ''

  private handleUpdateRoute(item: any) {
    this.currentTabName = item.route
    this.$router.push({ name: item.route })
  }

  private items: Array<any> = [
    {
      icon: 'mdi-store',
      'icon-alt': 'mdi-store-outline',
      text: 'Institutions',
      model: false,
      children: [
        {
          text: 'Mgmt',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store'
        }
      ]
    },
    {
      icon: 'mdi-cog',
      'icon-alt': 'mdi-cog-outline',
      text: 'Misc',
      model: false,
      children: [
        {
          text: 'Countries',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'misc-country'
        },
        {
          text: 'Levels',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'misc-level'
        },
        {
          text: 'Rankings',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'misc-ranking'
        }
      ]
    },
    {
      icon: 'mdi-account-cog',
      'icon-alt': 'mdi-account-cog-outline',
      text: 'Accounts',
      model: false,
      children: [
        {
          text: 'Mgmt',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys'
        }
      ]
    }
  ]

  private handleLogout(): void {
    try {
      this.$nuxt.$loading.start()
      // const result = await authStore.signOut({
      //   token: this.$cookies.get('accessToken')
      // })
      this.$nuxt.$cookies.remove('accessToken')
      this.$router.push('/account')
    } catch (e) {
      this.errorDialog = true
    } finally {
      this.$nuxt.$loading.finish()
    }
  }

  private theme: boolean = true

  @Watch('theme')
  private onThemeChange(newVal: boolean) {
    window.localStorage.setItem('theme', newVal ? 'light' : 'dark')
  }

  private created() {
    this.currentTabName = this.$route.name ? this.$route.name : ''
  }

  private mounted() {
    const theme = window.localStorage.getItem('theme')
    // if (theme && theme === 'light') {
    //   this.$vuetify.theme.dark = false
    // } else if (theme && theme === 'dark') {
    //   this.$vuetify.theme.dark = true
    // }
  }
}
</script>
