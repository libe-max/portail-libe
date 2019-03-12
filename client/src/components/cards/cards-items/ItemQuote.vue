<template>
  <div class="message">
    <div class="message-header">
      <span>{{idx + 1}} - {{item.name}}</span>
      <button class="delete" @click="remove(idx)"></button>
    </div>
    <div class="message-body">
      <div class="field">
        <div class="control has-icons-right">
          <textarea class="textarea" v-model="item.text" name="text" data-vv-as="Un texte" placeholder="Texte" v-validate.initial="'required'" :class="{'is-danger': errors.has('text') }"></textarea>
          <span v-show="!errors.has('text')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('text')" class="help is-danger">{{ errors.first('text') }}</span>
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <input class="input" v-model="item.quote" name="quote" data-vv-as="Une signiature" type="text" placeholder="Signature" v-validate.initial="'required'" :class="{'is-danger': errors.has('quote') }">
          <span v-show="!errors.has('quote')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('quote')" class="help is-danger">{{ errors.first('quote') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemQuote',
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
