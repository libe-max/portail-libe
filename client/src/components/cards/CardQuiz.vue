<template>
  <div class="message">
    <div class="message-header">
      <span>{{idx + 1}} - {{name}}</span>
      <button @click="isOpen = !isOpen">
        <span class="icon is-small">
          <i class="material-icons has-text-white" v-if="!isOpen">keyboard_arrow_down</i>
          <i class="material-icons has-text-white" v-if="isOpen">keyboard_arrow_up</i>
        </span>
      </button>
      <button class="delete" @click="remove(idx)"></button>
    </div>
    <div class="message-body" v-if="isOpen">
      <div class="columns">
        <div class="column is-6">
          <div class="field">
            <div class="control has-icons-right">
              <input class="input" v-model="questionCard" name="questionCard" data-vv-as="Une question" type="text" placeholder="Question" v-validate.initial="'required|max:140'" :class="{'is-danger': errors.has('questionCard') }">
              <span v-show="!errors.has('questionCard')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
            </div>
            <span v-show="errors.has('questionCard')" class="help is-danger">{{ errors.first('questionCard') }}</span>
          </div>
          <div class="field">
            <figure class="image" style="margin-bottom: 15px;">
              <img :src="photoCard">
              <button class="delete" @click="removeImg()" v-if="photoCard !== ''"></button>
            </figure>
            <form enctype="multipart/form-data" novalidate>
              <div class="file">
                <label class="file-label">
                  <input class="file-input" v-on:change="updateImg($event.target)" name="cardeFile" accept=".jpg, .jpeg, .png, .gif" type="file">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="material-icons">file_upload</i>
                    </span>
                    <span class="file-label">
                      Choisir un fichier
                    </span>
                  </span>
                </label>
              </div>
            </form>
          </div>
          <div class="answers">
            <div class="field">
              <p>Réponses :<br>(définir au moins une bonne réponse)</p>
            </div>
            <div class="field has-addons" v-for="(answer, i) in answersCard" :key="i">
              <p class="control">
                <button class="button is-white" @click="answer.isOk = !answer.isOk">
                  <span class="icon is-small is-right">
                    <i class="material-icons has-text-danger" v-if="!answer.isOk">close</i>
                    <i class="material-icons has-text-success" v-if="answer.isOk">check</i>
                  </span>
                </button>
              </p>
              <p class="control is-expanded">
                <input class="input" type="text" v-model="answer.text" :placeholder="'Réponse ' + (i+1)" data-vv-as="Une réponse" :name="'rep' + i" v-validate.initial="'required|max:100'" :class="{'is-danger': errors.has('rep' + i) }">
                <span v-show="errors.has('rep' + i)" class="help is-danger">{{ errors.first('rep' + i) }}</span>
              </p>
              <p class="control" v-if="i > 1">
                <button class="button is-white" @click="deleteAnswer(i)">
                  <span class="icon is-small is-right">
                    <i class="material-icons has-text-danger">delete</i>
                  </span>
                </button>
              </p>
            </div>
            <p class="field" v-if="this.answersCard.length < 4">
              <button class="button is-info" @click="addAnswer()">
                <span class="icon">
                  <i class="material-icons">add</i>
                </span>
                <span>Ajouter une réponse</span>
              </button>
            </p>
          </div>
        </div>
        <div class="column is-6">
          <div class="field">
            <div class="control has-icons-right">
              <input class="input" v-model="titleIsOk" name="titleIsOk" data-vv-as="Un titre" type="text" placeholder="Titre en cas de bonne réponse" v-validate.initial="'required|max:40'" :class="{'is-danger': errors.has('titleIsOk') }">
              <span v-show="!errors.has('titleIsOk')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
            </div>
            <span v-show="errors.has('titleIsOk')" class="help is-danger">{{ errors.first('titleIsOk') }}</span>
          </div>
          <div class="field">
            <div class="control has-icons-right">
              <textarea class="textarea" v-model="textIsOkCard" name="textIsOkCard" data-vv-as="Un texte" placeholder="Texte en cas de bonne réponse" v-validate.initial="'required|max:400'" :class="{'is-danger': errors.has('textIsOkCard') }"></textarea>
              <span v-show="!errors.has('textIsOkCard')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
            </div>
            <span v-show="errors.has('textIsOkCard')" class="help is-danger">{{ errors.first('textIsOkCard') }}</span>
          </div>
          <div class="field">
            <div class="control has-icons-right">
              <input class="input" v-model="titleIsNopCard" name="titleIsNopCard" data-vv-as="Un titre" type="text" placeholder="Titre en cas de mauvaise réponse" v-validate.initial="'required|max:40'" :class="{'is-danger': errors.has('titleIsNopCard') }">
              <span v-show="!errors.has('titleIsNopCard')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
            </div>
            <span v-show="errors.has('titleIsNopCard')" class="help is-danger">{{ errors.first('titleIsNopCard') }}</span>
          </div>
          <div class="field">
            <div class="control has-icons-right">
              <textarea class="textarea" v-model="textIsNopCard" name="textIsNopCard" data-vv-as="Un texte" placeholder="Texte en cas de mauvaise réponse" v-validate.initial="'required|max:400'" :class="{'is-danger': errors.has('textIsNopCard') }"></textarea>
              <span v-show="!errors.has('textIsNopCard')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
            </div>
            <span v-show="errors.has('textIsNopCard')" class="help is-danger">{{ errors.first('textIsNopCard') }}</span>
          </div>
          <div class="field">
            <div class="control has-icons-right">
              <input class="input" v-model="linkCard" name="linkCard" data-vv-as="Un Lien" type="text" placeholder="Lien en savoir plus (facultatif)" v-validate.initial="'url'" :class="{'is-danger': errors.has('linkCard') }">
              <span v-show="!errors.has('linkCard')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
            </div>
            <span v-show="errors.has('linkCard')" class="help is-danger">{{ errors.first('linkCard') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {slugify} from '@/services/utils'
import {httpFiles} from '@/services/http-common'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'CardQuiz',
  props: {
    idx: {type: Number},
    name: {type: String, default: 'Question'},
    question: {type: String},
    image: {type: String},
    photo: {type: String},
    answers: {type: Array},
    titleIsOk: {type: String},
    textIsOk: {type: String},
    titleIsNop: {type: String},
    textIsNop: {type: String},
    link: {type: String}
  },
  data () {
    return {
      idxCard: this.idx,
      questionCard: this.question,
      imageCard: this.image,
      photoCard: this.photo,
      answersCard: this.answers,
      titleIsOkCard: this.titleIsOk,
      textIsOkCard: this.textIsOk,
      titleIsNopCard: this.titleIsNop,
      textIsNopCard: this.textIsNop,
      linkCard: this.link,
      fileTypes: ['image/jpeg', 'image/png'],
      isOpen: true
    }
  },
  watch: {
    idx (value) { this.idxCard = this.idx },
    question (value) { this.questionCard = this.question },
    image (value) { this.imageCard = this.image },
    photo (value) { this.photoCard = this.photo },
    answers (value) { this.answersCard = this.answers },
    titleIsOk (value) { this.titleIsOkCard = this.titleIsOk },
    textIsOk (value) { this.textIsOkCard = this.textIsOk },
    titleIsNop (value) { this.titleIsNopCard = this.titleIsNop },
    textIsNop (value) { this.textIsNopCard = this.textIsNop },
    link (value) { this.linkCard = this.link },
    idxCard (value) { this.$emit('emitIdxCard', value) },
    questionCard (value) { this.$emit('emitQuestionCard', value) },
    answersCard (value) { this.$emit('emitAnswersCard', value) },
    titleIsOkCard (value) { this.$emit('emitTitleIsOkCard', value) },
    textIsOkCard (value) { this.$emit('emitTextIsOkCard', value) },
    titleIsNopCard (value) { this.$emit('emitTitleIsNopCard', value) },
    textIsNopCard (value) { this.$emit('emitTextIsNopCard', value) },
    linkCard (value) { this.$emit('emitLinkCard', value) }
  },
  methods: {
    addAnswer () {
      if (this.answersCard.length < 4) {
        this.answersCard.push({text: '', isOk: false})
      }
    },
    deleteAnswer (idx) {
      this.answersCard.splice(idx, 1)
    },
    updateImg (input) {
      var curFiles = input.files
      if (curFiles.length === 0) {
        this.imageCard = 'https://dummyimage.com/500x150/ccc/fff/'
      } else {
        if (this.validFileType(curFiles[0])) {
          this.imageCard = slugify(curFiles[0].name)
          this.imageCard = slugify(curFiles[0].name) + '.' + curFiles[0].name.split('.').pop()
          this.photoCard = window.URL.createObjectURL(curFiles[0])
          this.$emit('emitCardImage', this.imageCard)
          this.$emit('emitCardPhoto', this.photoCard)
          this.uploadImage(input)
        } else {
          this.imageCard = 'https://dummyimage.com/500x150/ccc/fff/'
        }
      }
    },
    validFileType (file) {
      for (var i = 0; i < this.fileTypes.length; i++) {
        if (file.type === this.fileTypes[i]) {
          return true
        }
      }
      return false
    },
    uploadImage (input) {
      var formData = new FormData()
      // var config = { headers: { 'content-type': 'multipart/form-data' } }
      formData.append(input.name, input.files[0], input.files[0].name)
      httpFiles.post('upload/quiz', formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          // this.errors.push(e)
        })
    },
    remove (idx) {
      this.$emit('remove', idx)
    },
    removeImg () {
      this.imageCard = ''
      this.photoCard = ''
    }
  }
}
</script>

<style scoped>
.message {height: 100%; background-color: transparent;}
.message-header {cursor: move;}
.message-body {height: calc(100% - 36px); background: #fff;}
.image {position: relative;}
.image .delete {position: absolute; top: 5px; right: 5px;}
.answers {padding: 10px 0; margin: 10px 0;}
.collapse-icon {vertical-align: middle;}
</style>
