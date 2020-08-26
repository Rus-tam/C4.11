import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from 'firebase'

Vue.use(Vuex);

class newTodo {
  constructor (title, subtitle, ownerId, complited = false, id = null) {
    this.title = title
    this.subtitle = subtitle
    this.ownerId = ownerId
    this.complited = complited
    this.id = id
  }
}

class User {
  constructor(id) {
    this.id = id
  }
}

export default new Vuex.Store({
  state: {
    todos: [],
    complitedTodo: [],
    user: null,
    
    loading: false,
    error: null
  },
  mutations: {
    removeTodo(state, id) {
      console.log(id)
      state.todos = state.todos.filter(t => t.id !== id)
    },

    compliteTodo (state, id) {
      // const todo = state.todos.find(a => {
      //   return a.id === id
      // })

      // todo.complited = true
    },

    addTodo(state, payload) {
      state.todos.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },

    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    loadTodos (state, payload) {
      state.todos = payload
    }
  },
  actions: {
    async addTodo ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const newnewTodo = new newTodo(payload.title, payload.subtitle, getters.user.id)

        const fromDt = await fb.database().ref('listInStorage').push(newnewTodo)

        commit('setLoading', false)
        commit('addTodo', {
          ...newnewTodo,
          id: Math.random()
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    async fetchTodo ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultTodos = []

      try {
        const fbVal = await fb.database().ref('listInStorage').once('value')
        const todos = fbVal.val()
        
        Object.keys(todos).forEach(key => {
          const todo = todos[key]
          resultTodos.push(
            new newTodo(todo.title, todo.subtitle, todo.ownerId, todo.complited, key)
          )
        })

        commit('loadTodos', resultTodos)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    async compliteTodo ({commit}, {complited, id}) {
      commit('clearError')
      console.log(id)

      try {
        await fb.database().ref('listInStorage').child(id).update({
          complited
        })
        commit('compliteTodo', {
          complited
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },

    registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      fb.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        commit('setUser', new user(user.uid))
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },

    loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      fb.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        commit('setUser', new user(user.uid))
        commit('setLoading', false)
      })
      .catch(error => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },

    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    clearError ({commit}) {
      commit('clearError')
    },

    autoLogginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },

    logoutUser ({commit}) {
      fb.auth().signOut()
      commit('setUser', null)
    }

  },
  getters: {
    complitedTodo (state) {
      return state.todos.filter(todos => {
        return todos.complited
      })
    },
    user (state) {
      return state.user
    },

    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },

    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
});
