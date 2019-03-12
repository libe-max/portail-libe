<template>
  <div class="card">
    <div class="card-content">
      <div class="subtitle">Personnaliser l'écran de résultats</div>
      <div class="form">
        <div class="field">
          <label class="label">Texte pour un quiz réussi</label>
          <div class="control has-icons-right">
            <textarea class="textarea" v-model="textQuizOk" @input="emitQuizOk(textQuizOk)" name="textQuizOk" data-vv-as="Un texte" v-validate.initial="'required'" :class="{'is-danger': errors.has('textQuizOk') }"></textarea>
            <span v-show="!errors.has('textQuizOk')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('textQuizOk')" class="help is-danger">{{ errors.first('textQuizOk') }}</span>
        </div>
        <div class="field">
          <label class="label">Texte pour un quiz raté</label>
          <div class="control has-icons-right">
            <textarea class="textarea" v-model="quizNop" @input="emitQuizNop(quizNop)" name="quizNop" data-vv-as="Un texte" v-validate.initial="'required'" :class="{'is-danger': errors.has('quizNop') }"></textarea>
            <span v-show="!errors.has('quizNop')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('quizNop')" class="help is-danger">{{ errors.first('quizNop') }}</span>
        </div>
        <div class="field">
          <label class="label">Texte pour le partage Twitter</label>
          <div class="control has-icons-right">
            <p class="has-text-grey-light">J'ai fait ../.. au quiz de @libe</p>
            <textarea class="textarea" v-model="tweetQuiz" @input="emitTweet(tweetQuiz)" name="tweetQuiz" data-vv-as="Un tweet" v-validate.initial="'required|max:245'" :class="{'is-danger': errors.has('tweetQuiz') }"></textarea>
            <span v-show="!errors.has('tweetQuiz')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('tweetQuiz')" class="help is-danger">{{ errors.first('tweetQuiz') }}</span>
        </div>
        <div class="field">
          <label class="label">À lire aussi : un lien vers un article (facultatif)</label>
          <div class="control has-icons-right">
            <input class="input" type="text" v-model="textLink" @input="emitLink(textLink)" name="textLink" data-vv-as="Un lien" placeholder="Url du lien" v-validate.initial="'url'" :class="{'is-danger': errors.has('textLink') }">
            <span v-show="!errors.has('textLink')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('textLink')" class="help is-danger">{{ errors.first('textLink') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  name: 'CardQuizResult',
  props: {
    textQuizOk: {type: String},
    textQuizNop: {type: String},
    textTweet: {type: String},
    textLink: {type: String}
  },
  data () {
    return {
      quizOk: this.textQuizOk,
      quizNop: this.textQuizNop,
      tweetQuiz: this.textTweet,
      link: this.textLink
    }
  },
  watch: {
    textQuizOk (value) { this.quizOk = value },
    textQuizNop (value) { this.quizNop = value },
    textTweet (value) { this.tweetQuiz = value },
    textLink (value) { this.link = value }
  },
  methods: {
    emitQuizOk (value) { this.$emit('emitQuizOk', value) },
    emitQuizNop (value) { this.$emit('emitQuizNop', value) },
    emitTweet (value) { this.$emit('emitTweet', value) },
    emitLink (value) { this.$emit('emitLink', value) }
  }
}
</script>
