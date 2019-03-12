<template>
  <div class="card collapse-item">
    <header class="card-header" role="tab" @click="toggle">
      <h3 class="card-header-title" v-html="title"></h3>
      <div class="card-header-icon">
        <span class="icon">
          <i class="material-icons" v-if="!isActived">keyboard_arrow_down</i>
          <i class="material-icons" v-if="isActived">keyboard_arrow_up</i>
        </span>
      </div>
    </header>
    <div class="card-content" v-show="isActived">
      <div class="card-content-box">
        <slot></slot>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    selected: Boolean,
    title: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      isActived: this.selected
    }
  },

  methods: {
    toggle () {
      this.isActived = !this.isActived
    }
  }
}
</script>

<style>
.collapse-item .card-header {
  cursor: pointer;
}
.collapse-item .card-header-icon {
  transition: transform .377s ease;
}
.collapse-item .card-content {
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}
.collapse-item .card-content-box {
  padding-top: 20px;
  padding-bottom: 20px;
}
.collapse-item.is-active > .card-header > .card-header-icon {
  transform: rotate(90deg);
}
</style>
