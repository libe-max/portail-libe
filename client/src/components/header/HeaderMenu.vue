<template>
  <section class="hero">
    <header>
      <nav class="navbar is-light">
        <div class="navbar-brand">
          <router-link class="navbar-item brand-logo" to="/">{{title}}</router-link>
          <div class="navbar-item brand-logo current-route" v-if="isNotHome">{{routeName}}</div>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <span class="nav-item">V-{{version}}</span>
          </div>
        </div>
      </nav>
    </header>
  </section>
</template>

<script>
export default {
  name: 'HeaderMenu',
  data () {
    return {
      title: 'Les outils de Six Plus',
      version: '0.0.1'
    }
  },
  computed: {
    isNotHome () {
      return this.$route.name !== 'Home'
    },
    routeName () {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
.navbar {border-bottom: 1px solid #DBDBDB;}
.brand-logo {font-family: 'libesansweb-semicondensed'; font-size: 1.5em; letter-spacing: 0.06em; text-transform: uppercase;}
.nav-item {padding-right: 10px; line-height: 52px;}
.current-route {position: relative;}
.current-route:before {content: ''; position: absolute; top: 16px; left: 0; width: 2px; height: 20px; background: #363636;}
</style>
