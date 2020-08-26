<template>
  <v-container
    class="fill-height"
    fluid>
     <v-flex xs12 sm6 offset-sm3>
          <div>
            <v-row justify="center" align="center">
              <v-list
              subheader
              two-line
              flat>

                <v-list-item-group>
                  <v-list-item
                    v-for="todo of todos"
                    v-bind:todo="todo"
                    :key="todo.id"
                    v-if="!todo.complited">
                           
                    <template>

                      <v-list-item-action>
                        <v-btn
                          x-small
                         color="green"
                         v-on:click="compliteTodo(todo.id)"
                         >&#10003;</v-btn>
                      </v-list-item-action>  


                      <v-list-item-content>
                        <v-list-item-title>{{todo.title}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{todo.subtitle}}</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn
                          x-small
                         color="red"
                         v-on:click="removeTodo(todo.id)"
                         >&times;</v-btn>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-row>
          </div>
          <div>
            <Taskbuttons />
          </div>
     </v-flex>
  </v-container>

</template>

<script>
  import Taskbuttons from '@/components/Tasks/Taskbuttons'
  import { mapMutations } from 'vuex'
  export default {
    data: () => ({
      newTitle: '',
    }),
    components: {
      Taskbuttons
    },
    computed: {
      todos () {
        return this.$store.state.todos;
      }
    },
    methods: {
      ...mapMutations(['removeTodo', 'addTodo',  'compliteTodo']),
      compliteTodo () {
        this.$store.dispatch('compliteTodo', {
          complited: this.complited,
          id: this.id
        })
      }
    }
  }
</script>