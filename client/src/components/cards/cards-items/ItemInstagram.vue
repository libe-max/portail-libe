<template>
  <div class="message">
    <div class="message-header">
      <span>{{idx + 1}} - {{item.name}}</span>
      <button class="delete" @click="remove(idx)"></button>
    </div>
    <div class="message-body">
      <div class="field">
        <div class="control has-icons-right">
          <input class="input" v-model="item.instagram" name="instagram" data-vv-as="L'url du post instagram" type="text" placeholder="Url du post instagram" v-validate.initial="'required|url'" :class="{'is-danger': errors.has('instagram') }">
          <span v-show="!errors.has('instagram')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('instagram')" class="help is-danger">{{ errors.first('instagram') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemInstagram',
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
