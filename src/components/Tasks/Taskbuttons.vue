<template>
    <v-row justify="center" align="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue"
          dark
          v-bind="attrs"
          v-on="on"
          class="ma-2">
          Создать задачу
        </v-btn>
        <v-btn
          color="green"
          dark
          :to="url">
          Завершенные задачи
        </v-btn>

      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Введите описание задачи</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Задача" name="title" v-model="title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Детали" name="subtitle" v-model="subtitle" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text v-on:click="closeModal" @click="dialog = false">Закрыть</v-btn>
          <v-btn color="blue" text v-on:click="addTodo" @click="dialog = false">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>  


</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data: () => {
    return {
      title: '',
      subtitle: '',
      complited: false,
      dialog: false,
      url: '/complited'
    }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      ...mapMutations(['addTodo']),
      addTodo () {
        const newTodo = {
          title: this.title,
          subtitle: this.subtitle,
          complited: this.complited,
          id: this.id
        }
        this.$store.dispatch('addTodo', newTodo)
        this.title = this.subtitle = ''
      },
      closeModal () {
        this.title = this.subtitle = ''
      }
    }
  }
</script>