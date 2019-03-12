<template>
  <div class="control is-narrow">
    <a class="button is-shadowless" style="width: 40px" v-tooltip="dataTooltip" @click="add()">
      <slot>
        <span class="icon">
          <i class="material-icons">{{icon}}</i>
        </span>
      </slot>
    </a>
    <div class="is-more">
      <span class="icon is-small has-text-success">
        <i class="material-icons">add_circle</i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonAddItem',
  props: {
    dataTooltip: String,
    type: String,
    icon: [String, Boolean]
  },
  methods: {
    add () {
      this.$emit('add')
    }
  }
}
</script>

<style scoped>
.control.is-narrow {position: relative;}
.is-more {position: absolute; top: -6px; left: -6px; width: 16px; height: 16px; background: #fff; border-radius: 50%;}
</style>
