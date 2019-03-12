<template>
  <div class="card">
    <div class="card-content">
      <div class="form">
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-right">
              <input class="input is-size-6" v-model="name" @input="emitName(name)" name="name" data-vv-as="Un nom" type="text" placeholder="Nom du projet" v-validate.initial="'required'" :class="{'is-danger': errors.has('name') }">
              <span v-show="!errors.has('name')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
            </div>
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            <span class="help has-text-grey-light">slug : {{name | slugify}}</span>
          </div>
          <div class="field">
            <div class="control has-icons-right">
              <input class="input is-size-6" v-model="author" @input="emitAuthor(author)" name="author" data-vv-as="Un auteur" type="text" placeholder="Auteur du projet" v-validate.initial="'required'" :class="{'is-danger': errors.has('author') }">
              <span v-show="!errors.has('author')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
            </div>
            <span v-show="errors.has('author')" class="help is-danger">{{ errors.first('author') }}</span>
            <span class="help has-text-grey-light">slug : {{author | slugify}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  name: 'CardInfo',
  props: {
    infoName: {type: String},
    infoAuthor: {type: String}
  },
  data () {
    return {
      name: this.infoName,
      author: this.infoAuthor
    }
  },
  watch: {
    infoName (value) {
      this.name = value
    },
    infoAuthor (value) {
      this.author = value
    }
  },
  methods: {
    emitName (value) { this.$emit('emitName', value) },
    emitAuthor (value) { this.$emit('emitAuthor', value) }
  }
}
</script>
