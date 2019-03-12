<template>
  <div id="notification" class="notification" :class="color">
    <button class="delete" @click="deleteNotification()"></button>
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    text: {type: String},
    color: {type: String}
  },
  methods: {
    deleteNotification () {
      this.$emit('delete')
    }
  }
}
</script>

<style>
#notification {position: fixed; bottom: 10px; right: 10px; z-index: 999;}
</style>
