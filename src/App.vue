<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="light-green lighten-1"
    >
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          @click="onLogout"
          text
          v-if="isUserLoggedIn">
          <v-list-item-icon>
            <v-icon>mdi-account-minus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Выход</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      dence
      color="light-green lighten-1"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Список задач</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for ="link in links"
          :key="link.title"
          :to="link.url"
          text>
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>

        <v-btn
          @click="onLogout"
          text
          v-if="isUserLoggedIn">
          <v-icon left>mdi-account-minus</v-icon>
          Выход
        </v-btn>

      </v-toolbar-items>
    </v-app-bar>
    <router-view/>
    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false
    }),

    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      },
      links () {
        if (this.isUserLoggedIn) {
          return [
          ]
        }
        return [
          {title: 'Регистрация', icon: 'mdi-account-plus', url: '/registration'},
          {title: 'Авторизация', icon: 'mdi-account-key', url: '/login'}
        ]
      }
    },

    methods: {
      onLogout () {
        this.$store.dispatch('logoutUser')
        this.$router.push('/logout')
      }
    }
  };
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>>
