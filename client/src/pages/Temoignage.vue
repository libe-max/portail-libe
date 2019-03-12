<template>
  <div id="temoignage">
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
      <div class="section">
        <tuto-temoignage></tuto-temoignage>
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
            <div class="column is-6">
              <card-title
                :titleTitle="format.title"
                @emitTitle="titleTitle => {format.title = titleTitle}"
                :titleSubTitle="format.subTitle"
                @emitSubTitle="titleSubTitle => {format.subTitle = titleSubTitle}"
                :titleChapo="format.chapo"
                @emitChapo="titleChapo => {format.chapo = titleChapo}"
                :titleLink="format.link"
                @emitLink="titleLink => {format.link = titleLink}"
                :titleUrl="format.linkUrl"
                @emitUrl="titleUrl => {format.linkUrl = titleUrl}"
              ></card-title>
            </div>
            <div class="column is-6">
              <card-color
                :main.sync="format.mainColor"
                @update:main="color => {format.mainColor = color}"
                :side.sync="format.sideColor"
                @update:foo="color => {format.sideColor = color}"
              ></card-color>
            </div>
            <div class="column is-6">
              <card-social
                :type="format.type"
                :social="format.social"
                @update:socialImg="value => {format.social = value}"
              ></card-social>
            </div>
            <div class="column is-6">
              <card-share
                :textePartage="format.txtPartage"
                @emitTextePartage="facebookDesc => {format.txtPartage = facebookDesc}"
                :tweetPartage="format.tweetPartage"
                @emitTweetPartage="twitterTweet => {format.tweetPartage = twitterTweet}"
              ></card-share>
            </div>
          </div>
        </div>
      </div>
      <div class="section" v-show="currentTab === tabs[1]">
        <div class="container is-fluid">
          <div class="has-text-centered" v-if="format.items.length == 0">
            <p>Ajouter du contenu avec les boutons <span class="icon is-small has-text-success"><i class="material-icons">add_circle</i></span> en bas</p>
            <p>&darr;</p>
          </div>
          <draggable class="columns is-multiline" :list="format.items" :options="dragOptions">
            <div class="column is-3" v-for="(item, idx) in format.items" :key="idx">
              <card-temoignage
                :idxCard="idx"
                :typeCard="item.type"
                :nameCard="item.name"
                :chiffreCard="item.chiffre"
                :titleCard="item.title"
                :textCard="item.text"
                :imageCard="item.image"
                :signatureCard="item.signature"
                :videoTypeCard="item.videoType"
                :videoUrlCard="item.videoUrl"
                :photoCard="item.photo"
                :captionCard="item.caption"
                :instagramCard="item.instagram"
                :tweetCard="item.tweet"
                :iframeCard="item.iframe"
                @emitCardChiffre="cardChiffre => {item.chiffre = cardChiffre}"
                @emitCardTitle="cardTitle => {item.title = cardTitle}"
                @emitCardText="cardText => {item.text = cardText}"
                @emitCardImage="CardImage => {item.image = CardImage}"
                @emitCardSignature="cardSignature => {item.signature = cardSignature}"
                @emitCardVideoType="cardVideoType => {item.videoType = cardVideoType}"
                @emitCardVideoUrl="cardVideoUrl => {item.videoUrl = cardVideoUrl}"
                @emitCardPhoto="cardPhoto => {item.photo = cardPhoto}"
                @emitCardCaption="cardCaption => {item.caption = cardCaption}"
                @emitCardInstagram="cardInstagram => {item.instagram = cardInstagram}"
                @emitCardTweet="cardTweet => {item.tweet = cardTweet}"
                @emitCardIframe="cardIframe => {item.iframe = cardIframe}"
                @emitCardErrors="cardErrors => {errors.items.push(cardErrors)}"
                @remove="modalItem(idx)">
              </card-temoignage>
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
              <button-add-item v-for="model in models" :key="model.type" :dataTooltip="model.name" :type="model.type" :icon="model.icon" @add="addItem(model)">
                <span class="icon is-size-4" v-if="model.type == 'instagram' || model.type == 'tweet'">
                  <i class="icon" :class="model.slot"></i>
                </span>
              </button-add-item>
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
import TutoTemoignage from '@/pages/tutoriels/TutoTemoignage'
import ButtonAddItem from '@/components/button/ButtonAddItem'
import CardTemoignage from '@/components/cards/CardTemoignage'
import {slugify} from '@/services/utils'
import {httpApiTemoingage} from '@/services/http-common'

export default {
  inject: ['$validator'],
  name: 'Temoignage',
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
        type: 'temoignage',
        date: 0,
        created_date: 0,
        modification_date: 0,
        statut: 'created',
        name: '',
        author: '',
        author_slug: '',
        title: '',
        subTitle: '',
        chapo: '',
        link: '',
        linkUrl: '',
        mainColor: '#000',
        sideColor: '#fff',
        txtPartage: '',
        tweetPartage: '',
        social: 'https://dummyimage.com/750x500/ccc/fff/&text=Image d\'appel 750x500px',
        items: []
      },
      models: [
        {type: 'simple', name: 'Titre seul', componentName: 'componentName', icon: 'short_text'},
        {type: 'text', name: 'Texte', componentName: 'componentName', icon: 'art_track'},
        {type: 'image', name: 'Image', componentName: 'componentName', icon: 'photo_size_select_actual'},
        {type: 'chiffre', name: 'Chiffre', componentName: 'componentName', icon: 'looks_one'},
        {type: 'citation', name: 'Citation', componentName: 'componentName', icon: 'format_quote'},
        {type: 'video', name: 'Vidéo', componentName: 'componentName', icon: 'ondemand_video'},
        {type: 'instagram', name: 'Instagram', componentName: 'componentName', icon: false, slot: 'ion-social-instagram'},
        {type: 'tweet', name: 'Tweet', componentName: 'componentName', icon: false, slot: 'ion-social-twitter'},
        {type: 'iframe', name: 'Iframe', componentName: 'componentName', icon: 'code'}
      ],
      values: ['chiffre', 'title', 'text', 'image', 'signature', 'videoType', 'videoUrl', 'photo', 'caption', 'instagram', 'tweet', 'iframe']
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
      return {'min-height': document.getElementById('app').offsetHeight - (53 + 41 + 57) + 'px'}
    }
  },
  methods: {
    getDataId () {
      this.currentTab = this.tabs[0]

      if (this.$route.params.id !== 'new') {
        httpApiTemoingage.get('formatData/' + this.$route.params.id)
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
        httpApiTemoingage.post('clean', {dataJson: this.format})
          .then(response => {
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
            // this.errors.push(e)
          })
      }
    },
    addItem (type) {
      var newItem = Object.assign({}, type)
      this.values.forEach((v) => {
        newItem[v] = ''
      })
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
      console.log(JSON.stringify(this.format))
      this.isModaleSubmit = false
    },
    submit () {
      console.log(JSON.stringify(this.format))
    },
    showWebPage () {
      httpApiTemoingage.post('show', {dataJson: this.format})
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
      httpApiTemoingage.post('save', {dataJson: this.format})
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
      httpApiTemoingage.post('save', {dataJson: this.format})
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
      var errorToCheck = ['name', 'author', 'titlePage', 'subTitle', 'chapo']
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
    TutoTemoignage,
    ButtonAddItem,
    CardTemoignage
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
#tuto {margin-bottom: 64px;}
.tabs a, .tabs ul {border-bottom-color: transparent;}
.level {border-bottom: 1px solid #dbdbdb; background: #fff;}
.level .tag {margin-right: 1em;}
</style>
