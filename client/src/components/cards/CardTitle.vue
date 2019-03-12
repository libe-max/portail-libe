<template>
  <div class="card">
    <div class="card-content">
      <div class="subtitle">Titraille</div>
      <div class="form">
        <div class="field">
          <div class="control has-icons-right">
            <input class="input" v-model="titlePage" @input="emitTitle(titlePage)" name="titlePage" data-vv-as="Un titre" type="text" placeholder="Titre" v-validate.initial="'required'" :class="{'is-danger': errors.has('titlePage') }">
            <span v-show="!errors.has('titlePage')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('titlePage')" class="help is-danger">{{ errors.first('titlePage') }}</span>
        </div>
        <div class="field">
          <div class="control has-icons-right">
            <input class="input" v-model="subTitle" @input="emitSubTitle(subTitle)" name="subTitle" data-vv-as="Un sous-titre" type="text" placeholder="Sous-titre" v-validate.initial="'required'" :class="{'is-danger': errors.has('subTitle') }">
            <span v-show="!errors.has('subTitle')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('subTitle')" class="help is-danger">{{ errors.first('subTitle') }}</span>
        </div>
        <div class="field">
          <div class="control has-icons-right">
            <textarea class="textarea" v-model="chapo" @input="emitChapo(chapo)" name="chapo" data-vv-as="Un chapo" placeholder="Chapo" v-validate.initial="'required'" :class="{'is-danger': errors.has('chapo') }"></textarea>
            <span v-show="!errors.has('chapo')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('chapo')" class="help is-danger">{{ errors.first('chapo') }}</span>
        </div>
        <div class="field">
          <div class="control has-icons-right">
            <input class="input" v-model="link" @input="emitLink(link)" type="text" placeholder="Lien «à lire aussi» (optionnel)">
          </div>
        </div>
        <div class="field" v-if="titleLink">
          <div class="control has-icons-right">
            <input class="input" v-model="url" @input="emitUrl(url)" name="urlLien" data-vv-as="L'url du lien" type="text" placeholder="Url du lien" v-validate.initial="'required|url'" :class="{'is-danger': errors.has('urlLien') }">
            <span v-show="!errors.has('urlLien')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('urlLien')" class="help is-danger">{{ errors.first('urlLien') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  name: 'CardTitle',
  props: {
    titleTitle: {type: String},
    titleSubTitle: {type: String},
    titleChapo: {type: String},
    titleLink: {type: String},
    titleUrl: {type: String}
  },
  data () {
    return {
      titlePage: this.titleTitle,
      subTitle: this.titleSubTitle,
      chapo: this.titleChapo,
      link: this.titleLink,
      url: this.titleUrl
    }
  },
  watch: {
    titleTitle (value) {
      this.titlePage = value
    },
    titleSubTitle (value) {
      this.subTitle = value
    },
    titleChapo (value) {
      this.chapo = value
    },
    titleLink (value) {
      this.link = value
    },
    titleUrl (value) {
      this.url = value
    }
  },
  methods: {
    emitTitle (value) { this.$emit('emitTitle', value) },
    emitSubTitle (value) { this.$emit('emitSubTitle', value) },
    emitChapo (value) { this.$emit('emitChapo', value) },
    emitLink (value) { this.$emit('emitLink', value) },
    emitUrl (value) { this.$emit('emitUrl', value) }
  }
}
</script>
