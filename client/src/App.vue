<template>
  <div id="app">
    <header-menu></header-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderMenu from '@/components/header/HeaderMenu'

export default {
  name: 'app',
  components: { HeaderMenu }
}
</script>
