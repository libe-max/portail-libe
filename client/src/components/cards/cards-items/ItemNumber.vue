<template>
  <div class="message">
    <div class="message-header">
      <span>{{idx + 1}} - {{item.name}}</span>
      <button class="delete" @click="remove(idx)"></button>
    </div>
    <div class="message-body">
      <div class="field">
        <div class="control has-icons-right">
          <input class="input" v-model="item.chiffre" name="chiffre" data-vv-as="Un chiffre" type="number" placeholder="Chiffre" v-validate.initial="'required|numeric'" :class="{'is-danger': errors.has('chiffre') }">
          <span v-show="!errors.has('chiffre')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('chiffre')" class="help is-danger">{{ errors.first('chiffre') }}</span>
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <textarea class="textarea" v-model="item.text" name="text" data-vv-as="Un texte" placeholder="Texte" v-validate.initial="'required'" :class="{'is-danger': errors.has('text') }"></textarea>
          <span v-show="!errors.has('text')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('text')" class="help is-danger">{{ errors.first('text') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemNumber',
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
