<template>
  <div>
    loggedIn:
    {{ $auth.loggedIn }}
    <div>
      <button class="button--green" @click="logout">logout</button>
      <nuxt-link to="/detail">detail</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>
