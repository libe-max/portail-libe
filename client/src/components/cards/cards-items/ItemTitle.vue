<template>
  <div class="message">
    <div class="message-header">
      <span>{{idx + 1}} - {{item.name}}</span>
      <button class="delete" @click="remove(idx)"></button>
    </div>
    <div class="message-body">
      <div class="field">
        <div class="control has-icons-right">
          <input class="input" v-model="item.title" name="title" data-vv-as="Un titre" type="text" placeholder="Titre" v-validate.initial="'required'" :class="{'is-danger': errors.has('title') }">
          <span v-show="!errors.has('title')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemTitle',
  props: {
    idx: {type: Number, require: true},
    item: {type: Object, require: true},
    show: {type: Boolean, default: true}
  },
  methods: {
    remove (idx) {
      this.$emit('remove', idx)
    }
  }
}
</script>
