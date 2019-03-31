<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Todo Manager</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Detail</th>
              <th>Updated At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todos" :key="todo.id">
              <td>{{ todo.title }}</td>
              <td>{{ todo.body|truncate(50) }}</td>
              <td>{{ todo.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateTodoToEdit(todo)">Edit</a> -
                <a href="#" @click.prevent="deleteTodo(todo.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Todo ID#' + model.id : 'New Todo')">
          <form @submit.prevent="saveTodo">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="What do you wish to accomplish?">
              <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Todo</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data () {
    return {
      loading: false,
      todos: [],
      model: {}
    }
  },
  filters: {
    truncate: function (value, limit) {
      if (value.length > limit) {
        value = value.substring(0, (limit - 3)) + '...'
      }
      return value
    }
  },
  async created () {
    this.refreshList()
  },
  methods: {
    async refreshList () {
      this.loading = true
      this.todos = await api.getTodosList()
      this.loading = false
    },
    async populateTodoToEdit (todo) {
      this.model = Object.assign({}, todo)
    },
    async saveTodo () {
      if (this.model.id) {
        await api.updateTodo(this.model.id, this.model)
      } else {
        await api.createTodo(this.model)
      }
      this.model = {} // reset form
      await this.refreshList()
    },
    async deleteTodo (id) {
      if (confirm('Are you sure you want to delete this todo?')) {
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteTodo(id)
        await this.refreshList()
      }
    }
  }
}
</script>
