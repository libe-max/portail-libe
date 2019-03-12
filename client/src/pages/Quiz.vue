<template>
  <div id="quiz">
  <section class="level">
    <div class="level-left">
      <div class="level-item">
        <div class="tabs ">
          <ul>
            <li v-for="tab in tabs" :key="tab" :class="{'is-active': currentTab === tab}">
              <a href="#" @click.stop.prevent="currentTab = tab">{{tab | capitalize}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <statut-tag :currentStatut="format.statut"></statut-tag>
      </div>
    </div>
  </section>
  <section class="columns is-multiline">
    <div id="tuto" class="column is-4" v-show="isTuto">
      <div class="section" :style="tutoHeight">
        <tuto-quiz></tuto-quiz>
      </div>
    </div>
    <div id="make" class="column">
      <div class="section" v-show="currentTab === tabs[0]">
        <div class="container is-fluid">
          <div class="columns is-multiline">
            <div class="column is-12">
              <card-info
                :infoName="format.name"
                @emitName="infoName => {format.name = infoName}"
                :infoAuthor="format.author"
                @emitAuthor="infoAuthor => {format.author = infoAuthor}"
              ></card-info>
            </div>
            <div class="column is-12">
              <card-quiz-result
                :textQuizOk="format.txtQuizOk"
                @emitQuizOk="quizOk => {format.txtQuizOk = quizOk}"
                :textQuizNop="format.txtQuizNop"
                @emitQuizNop="quizNop => {format.txtQuizNop = quizNop}"
                :textTweet="format.tweetPartage"
                @emitTweet="tweetQuiz => {format.tweetPartage = tweetQuiz}"
                :textLink="format.linkQuiz"
                @emitLink="link => {format.linkQuiz = link}">
              </card-quiz-result>
            </div>
          </div>
        </div>
      </div>
      <div class="section" v-show="currentTab === tabs[1]">
        <div class="container is-fluid">
          <div class="has-text-centered" v-if="format.items.length == 0">
            <p>Ajouter du contenu avec le bouton <span class="icon is-small has-text-success"><i class="material-icons">add_circle</i></span> en bas</p>
            <p>&darr;</p>
          </div>
          <draggable class="columns is-multiline" :list="format.items" :options="dragOptions">
            <div class="column is-6" v-for="(item, idx) in format.items" :key="idx">
              <card-quiz
                :idx="idx"
                :question="item.question"
                :image="item.image"
                :photo="item.photo"
                :answers="item.answers"
                :titleIsOk="item.titleIsOk"
                :textIsOk="item.textIsOk"
                :titleIsNop="item.titleIsNop"
                :textIsNop="item.textIsNop"
                :link="item.link"
                @emitIdxCard="idxCard => {item.idx = idxCard}"
                @emitQuestionCard="questionCard => {item.question = questionCard}"
                @emitCardImage="CardImage => {item.image = CardImage}"
                @emitCardPhoto="CardPhoto => {item.photo = CardPhoto}"
                @emitAnswersCard="answersCard => {item.answers = answersCard}"
                @emitTitleIsOkCard="titleIsOkCard => {item.titleIsOk = titleIsOkCard}"
                @emitTextIsOkCard="textIsOkCard => {item.textIsOk = textIsOkCard}"
                @emitTitleIsNopCard="titleIsNopCard => {item.titleIsNop = titleIsNopCard}"
                @emitTextIsNopCard="textIsNopCard => {item.textIsNop = textIsNopCard}"
                @emitLinkCard="linkCard => {item.link = linkCard}"
                @remove="modalItem(idx)">
              </card-quiz>
            </div>
          </draggable>
        </div>
      </div>
      <div class="footer fixed-footer">
        <div class="columns">
          <div class="column is-third">
            <div class="field is-grouped">
              <div class="control">
                <a class="button help-button is-shadowless" @click="isTuto = !isTuto" v-if="!isTuto">
                  <span class="icon">
                    <i class="material-icons">help</i>
                  </span>
                  <span>AFFICHER L'AIDE</span>
                </a>
                <a class="button help-button is-shadowless" @click="isTuto = !isTuto" v-if="isTuto">
                  <span class="icon">
                    <i class="material-icons">close</i>
                  </span>
                  <span>FERMER L'AIDE</span>
                </a>
              </div>
            </div>
          </div>
          <div class="column is-third" v-show="currentTab === tabs[1]">
            <div class="field is-grouped columns is-centered" style="margin: 0 auto;">
              <button-add-item :dataTooltip="model.name" :type="model.type" :icon="model.icon" @add="addItem()"></button-add-item>
            </div>
          </div>
          <div class="column is-third">
            <div class="field is-grouped is-pulled-right">
              <div class="control">
                <a class="button is-shadowless" v-tooltip="'Aperçu'" @click="showWebPage()">
                  <span class="icon">
                    <i class="material-icons">visibility</i>
                  </span>
                </a>
              </div>
              <div class="control">
                <button class="button is-shadowless" v-tooltip="'Enregistrer'" @click="saveWebPage()" :disabled="canISave()">
                  <span class="icon">
                    <i class="material-icons">save</i>
                  </span>
                </button>
              </div>
              <div class="control">
                <button class="button is-shadowless" v-tooltip="'Publier'" @click="isModaleSubmit = true" :disabled="errors.any()">
                  <span class="icon">
                    <i class="material-icons">check</i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <modal-validation :message="'supprimer cet élément'" :is-active="isModaleItem" @cancel="cancelItem()" @submit="removeItem()"></modal-validation>
  <modal-validation :message="'valider le format'" :is-active="isModaleSubmit" @cancel="cancelSubmit()" @submit="publishWebPage()"></modal-validation>
  <transition name="slide-fade">
    <notification :text="textNotification" :color="colorNotification" @delete="isNotification = false" v-show="isNotification"></notification>
  </transition>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import TutoQuiz from '@/pages/tutoriels/TutoQuiz'
import ButtonAddItem from '@/components/button/ButtonAddItem'
import CardQuizResult from '@/components/cards/CardQuizResult'
import CardQuiz from '@/components/cards/CardQuiz'
import {slugify} from '@/services/utils'
import {httpApiQuiz} from '@/services/http-common'

export default {
  inject: ['$validator'],
  name: 'Quiz',
  data () {
    return {
      isTuto: false,
      isModaleItem: false,
      itemToRemove: false,
      isModaleSubmit: false,
      isNotification: false,
      textNotification: '',
      colorNotification: 'is-dark',
      window: false,
      tabs: ['Informations générales', 'Ajouter et modifier le contenu'],
      currentTab: '',
      format: {
        id: false,
        type: 'quiz',
        date: 0,
        created_date: 0,
        modification_date: 0,
        statut: 'created',
        name: '',
        author: '',
        author_slug: '',
        mainColor: '#000',
        sideColor: '#fff',
        txtQuizOk: 'Vous n\'êtes pas mauvais ! Partagez vite la bonne nouvelle avec vos amis.',
        txtQuizNop: 'Il faudra s\'entraîner... Voyez si vos amis font mieux que vous.',
        tweetPartage: 'Et vous ?',
        linkQuiz: '',
        social: ' data:image/png;base64,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',
        items: []
      },
      newItem: {
        question: '',
        image: '',
        photo: '',
        answers: false,
        titleIsOk: '',
        textIsOk: '',
        titleIsNop: '',
        textIsNop: '',
        link: ''
      },
      model: {type: 'question', name: 'Question', componentName: 'CardQuiz', icon: 'question_answer'}
    }
  },
  mounted () {
    this.getDataId()
  },
  watch: {
    '$route': 'getDataId'
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        handle: '.message-header'
      }
    },
    tutoHeight () {
      return {height: document.getElementById('app').offsetHeight - (53 + 41 + 57) + 'px'}
    }
  },
  methods: {
    getDataId () {
      this.currentTab = this.tabs[0]

      if (this.$route.params.id !== 'new') {
        httpApiQuiz.get('formatData/' + this.$route.params.id)
          .then(response => {
            console.log(response.data)
            console.log(response.data.format)
            this.$nextTick(function () {
              this.format = response.data.format
            })
            // this.$set(this.someObject, 'b', 2)
          })
          .catch(err => {
            console.log(err)
            // this.errors.push(e)
          })
      } else {
        httpApiQuiz.post('clean', {dataJson: this.format})
          .then(response => {
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
            // this.errors.push(e)
          })
      }
    },
    addItem () {
      var newItem = Object.assign({}, this.newItem)
      newItem.answers = [{text: '', isOk: false}, {text: '', isOk: false}]
      this.format.items.push(newItem)
    },
    modalItem (idx) {
      this.itemToRemove = idx
      this.isModaleItem = true
    },
    cancelItem () {
      this.itemToRemove = false
      this.isModaleItem = false
    },
    removeItem () {
      console.log(this.itemToRemove)
      this.format.items.splice(this.itemToRemove, 1)
      this.itemToRemove = false
      this.isModaleItem = false
      this.showNotification('Votre item à bien été supprimé', 'is-success')
    },
    cancelSubmit () {
      this.isModaleSubmit = false
    },
    showWebPage () {
      httpApiQuiz.post('show', {dataJson: this.format})
        .then(response => {
          console.log(response.data)
          if (response.data) {
            var link = 'http://10.14.244.101:8081/tmp/'
            if (this.window) {
              this.window.close()
            }
            this.window = window.open(link, '_blank')
          }
        })
        .catch(err => {
          console.log(err)
          // this.errors.push(e)
        })
    },
    updateWebPage () {
      var now = new Date()
      if (!this.format.id) {
        this.format.id = slugify(this.format.name)
        this.format.author_slug = slugify(this.format.author)
        this.format.date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear()
        this.format.created_date = now
        this.format.modification_date = now
      } else {
        this.format.modification_date = now
      }
    },
    saveWebPage () {
      this.updateWebPage()

      this.format.statut = 'saved'
      httpApiQuiz.post('save', {dataJson: this.format})
        .then(response => {
          console.log(response.data)
          this.showNotification('Votre projet à bien été enregistré', 'is-info')
        })
        .catch(err => {
          console.log(err)
          this.showNotification('Une erreur c\'est produite', 'is-danger')
        })
    },
    publishWebPage () {
      this.updateWebPage()

      this.format.statut = 'published'
      httpApiQuiz.post('save', {dataJson: this.format})
        .then(response => {
          console.log(response.data)
          this.isModaleSubmit = false
          this.showNotification('Votre projet a bien été publié', 'is-success')
        })
        .catch(err => {
          console.log(err)
          this.isModaleSubmit = false
          this.showNotification('Une erreur c\'est produite', 'is-danger')
        })
    },
    canISave () {
      var errorToCheck = ['name', 'author']
      var isOk = false
      errorToCheck.forEach(d => {
        if (this.errors.has(d)) {
          isOk = true
        }
      })
      return isOk
    },
    showNotification (txt, color) {
      this.isNotification = true
      this.textNotification = txt
      this.colorNotification = color
      setTimeout(_ => {
        this.isNotification = false
      }, 1500)
    }
  },
  components: {
    Draggable,
    TutoQuiz,
    ButtonAddItem,
    CardQuizResult,
    CardQuiz
  }
}
</script>

<style scoped>
.card {height: 100%;}
#make {margin-bottom: 64px;}
#make .container {max-width: 1344px; margin: 0 auto;}
.fixed-footer {position: fixed; bottom: 0; left: 0; width: 100%; padding: 10px 1.5rem; border-top: 1px solid #DBDBDB; z-index: 10;}
.button {width: 40px;}
.help-button {width: auto;}
.help-button .icon {margin-right: 5px !important;}
#tuto .section {overflow-y: scroll;}
#tuto {margin-bottom: 64px;}
.tabs a, .tabs ul {border-bottom-color: transparent;}
.level {border-bottom: 1px solid #dbdbdb; background: #fff;}
.level .tag {margin-right: 1em;}
</style>
