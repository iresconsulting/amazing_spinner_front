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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">
          {{ h1 }}
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
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-card flat>
              <v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="4" class="px-0">
                      <!-- <v-img :src="dP" height="60" width="60"></v-img> -->
                      <v-icon x-large class="mt-7 ml-4">mdi-account-circle</v-icon>
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
                  <span>Update Password</span>
                </v-btn>
                <v-btn class="warning" @click="handleLogout">Sign out</v-btn>
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
    <v-btn
      bottom
      :color="!$vuetify.theme.dark ? 'primary' : '#fb8c00'"
      fab
      fixed
      left
      @click="handleToggleTheme"
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
          Version
        </v-card-title>
        <v-card-text class="mt-4">
          v{{ version }} <br />
          <strong class="primary--text">Last Updated: </strong>
          {{ lastUpdated }} <br />
          <div class="mt-7">
            Copyright © {{ crDate }}
            <a
              class="primary--text text-decoration-none"
              href=""
              target="_blank"
            >
              {{ crSource }}.
            </a>
            &nbsp;All rights reserved.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false" large>
            <strong>Close</strong>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errorDialog" width="800px">
      <v-card>
        <v-card-title class="primary white--text">
          Hint
        </v-card-title>
        <v-card-text class="mt-4">
          <h2 class="mt-4">Server Error. Please try again later.</h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="errorDialog = false" large>
            <strong>Close</strong>
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
    return 'Welcome!'
  }

  private get dP() {
    return authStore.user ? authStore.user.photopath : ''
  }

  private get h1() {
    return 'Restaurant CMS'
  }

  private get lastUpdated(): string {
    return new Date().toLocaleDateString('en',
      { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
    )
  }

  private get version(): string {
    return '1.0.0'
  }

  private get crDate(): string {
    return '2021'
  }

  private get crSource(): string {
    return 'Ire'
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
    this.$router.push(
      {
        name: item.route,
        params: {
          tabTitle: item.tabTitle
        }
      })
  }

  private handleToggleTheme(): void {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    window.localStorage.setItem('tm', this.$vuetify.theme.dark.toString())
  }

  private items: Array<any> = [
    {
      icon: 'mdi-chart-areaspline',
      'icon-alt': 'mdi-chart-areaspline-variant',
      text: 'Overview',
      model: false,
      children: [
        {
          text: 'Reports',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'overview'
        }
      ]
    },
    {
      icon: 'mdi-cart',
      'icon-alt': 'mdi-cart-outline',
      text: 'Orders',
      model: false,
      children: [
        {
          text: 'Mgmt',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'orders'
        }
      ]
    },
    {
      icon: 'mdi-database',
      'icon-alt': 'mdi-database-outline',
      text: 'Inventory',
      model: false,
      children: [
        {
          text: 'Mgmt',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'ingredients',
          tabTitle: 'Inventory Management'
        }
      ]
    },
    {
      icon: 'mdi-silverware',
      'icon-alt': 'mdi-silverware',
      text: 'Menus',
      model: false,
      children: [
        {
          text: 'Menus',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'menus',
          tabTitle: 'Menus Management'
        },
        {
          text: 'Courses',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'menus-courses',
          tabTitle: 'Menu Edit'
        }
      ]
    },
    {
      icon: 'mdi-ticket-percent',
      'icon-alt': 'mdi-ticket-percent-outline',
      text: 'Promotions',
      model: false,
      children: [
        {
          text: 'Mgmt',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'promotions'
        }
      ]
    },
    {
      icon: 'mdi-badge-account-horizontal',
      'icon-alt': 'mdi-badge-account-horizontal-outline',
      text: 'Employees',
      model: false,
      children: [
        {
          text: 'Mgmt',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'employees',
          tabTitle: 'Employees Management'
        }
      ]
    },
    {
      icon: 'mdi-account-box-multiple',
      'icon-alt': 'mdi-account-box-multiple-outline',
      text: 'Customers',
      model: false,
      children: [
        {
          text: 'Mgmt',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'customers'
        }
      ]
    },
    {
      icon: 'mdi-store',
      'icon-alt': 'mdi-store-outline',
      text: 'Stores',
      model: false,
      children: [
        {
          text: 'Mgmt',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'stores'
        }
      ]
    },
    {
      icon: 'mdi-cog',
      'icon-alt': 'mdi-cog-outline',
      text: 'Settings',
      model: false,
      children: [
        {
          text: 'Account Mgmt',
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

  private created() {
    this.currentTabName = this.$route.name ? this.$route.name : ''
  }

  private mounted() {
    const theme = window.localStorage.getItem('tm')
    if (theme) {
      if (theme === 'true') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    } else {
      window.localStorage.setItem('tm', 'false')
    }
  }
}
</script>
