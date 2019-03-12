<template>
  <div class="card">
    <div class="card-content">
      <div class="subtitle">Partage sur les réseaux</div>
      <div class="form">
        <div class="field">
          <div class="control has-icons-right">
            <textarea class="textarea" v-model="txtFacebook" @input="emitTextePartage(txtFacebook)" name="txtFacebook" data-vv-as="Un texte de partage" placeholder="Texte de partage" v-validate.initial="'required|max:200'" :class="{'is-danger': errors.has('txtFacebook') }"></textarea>
            <span v-show="!errors.has('txtFacebook')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('txtFacebook')" class="help is-danger">{{ errors.first('txtFacebook') }}</span>
        </div>
        <div class="field">
          <div class="control has-icons-right">
            <textarea class="textarea" v-model="txtTwitter" @input="emitTweetPartage(txtTwitter)" name="txtTwitter" data-vv-as="Un tweet" placeholder="Tweet de partage" v-validate.initial="'required|max:280'" :class="{'is-danger': errors.has('txtTwitter') }"></textarea>
            <span v-show="!errors.has('txtTwitter')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('txtTwitter')" class="help is-danger">{{ errors.first('txtTwitter') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  name: 'CardShare',
  props: {
    textePartage: {type: String},
    tweetPartage: {type: String}
  },
  data () {
    return {
      txtFacebook: this.partageTxt,
      txtTwitter: this.tweetTxt
    }
  },
  watch: {
    textePartage (value) {
      this.txtFacebook = value
    },
    tweetPartage (value) {
      this.txtTwitter = value
    }
  },
  methods: {
    emitTextePartage (value) { this.$emit('emitTextePartage', value) },
    emitTweetPartage (value) { this.$emit('emitTweetPartage', value) }
  }
}
</script>
