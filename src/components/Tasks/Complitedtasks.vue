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
                    v-for="todo of complitedTodo"
                    v-bind:todo="todo"
                    :key="todo.id">         
                    <template>
                      <v-list-item-content>
                        <v-list-item-title>{{todo.title}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{todo.subtitle}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-row>
          </div>
     </v-flex>
  </v-container>

</template>

<script>
export default {
    computed: {
        complitedTodo () {
            return this.$store.getters.complitedTodo
        }
    }
}
</script>