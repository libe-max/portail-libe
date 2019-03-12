<template>
  <div class="message">
    <div class="message-header">
      <span>{{idx + 1}} - {{name}}</span>
      <button @click="isOpen = !isOpen">
        <span class="icon is-small collapse-icon">
          <i class="material-icons has-text-white" v-if="!isOpen">keyboard_arrow_down</i>
          <i class="material-icons has-text-white" v-if="isOpen">keyboard_arrow_up</i>
        </span>
      </button>
      <button class="delete" @click="remove(idx)"></button>
    </div>
    <div class="message-body" v-show="isOpen">
      <div class="field" v-if="type == 'chiffre'">
        <div class="control has-icons-right">
          <input class="input" v-model="chiffre" name="chiffre" data-vv-as="Un chiffre" type="number" placeholder="Chiffre" v-validate.initial="'required|numeric'" :class="{'is-danger': errors.has('chiffre') }">
          <span v-show="!errors.has('chiffre')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('chiffre')" class="help is-danger">{{ errors.first('chiffre') }}</span>
      </div>
      <div class="field" v-if="type == 'simple' || type == 'text'">
        <div class="control has-icons-right">
          <input class="input" v-model="title" name="title" data-vv-as="Un titre" type="text" placeholder="Titre" v-validate.initial="'required'" :class="{'is-danger': errors.has('title') }">
          <span v-show="!errors.has('title')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
      </div>
      <div class="field" v-if="type == 'text' || type == 'citation' || type == 'chiffre'">
        <div class="control has-icons-right">
          <textarea class="textarea" v-model="text" name="text" data-vv-as="Un texte" placeholder="Texte" v-validate.initial="'required'" :class="{'is-danger': errors.has('text') }"></textarea>
          <span v-show="!errors.has('text')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('text')" class="help is-danger">{{ errors.first('text') }}</span>
        <span class="help" v-if="type == 'citation'">Ne pas mettre de guillemets</span>
      </div>
      <div class="field" v-if="type == 'citation'">
        <div class="control has-icons-right">
          <input class="input" v-model="signature" name="signature" data-vv-as="Une signature" type="text" placeholder="Signature" v-validate.initial="'required'" :class="{'is-danger': errors.has('signature') }">
          <span v-show="!errors.has('signature')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('signature')" class="help is-danger">{{ errors.first('signature') }}</span>
      </div>
      <div class="field" v-if="type == 'video'">
        <div class="control">
          <div class="select">
            <select v-model="videoType" name="videoType" data-vv-as="Un type de vidéo" v-validate.initial="'required|in:youtube,dailymotion'" :class="{'is-danger': errors.has('videoType') }">
              <option value="youtube">YouTube</option>
              <option value="dailymotion">Dailymotion</option>
            </select>
          </div>
          <span v-show="errors.has('videoType')" class="help is-danger">{{ errors.first('videoType') }}</span>
        </div>
      </div>
      <div class="field" v-if="type == 'video'">
        <div class="control has-icons-right">
          <input class="input" v-model="videoUrl" name="videoUrl" data-vv-as="L'url de la video" type="text" placeholder="Url de la video" v-validate.initial="'required|url'" :class="{'is-danger': errors.has('videoUrl') }">
          <span v-show="!errors.has('videoUrl')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('videoUrl')" class="help is-danger">{{ errors.first('videoUrl') }}</span>
      </div>
      <div v-if="type == 'text' || type == 'image'">
        <p v-if="type == 'text'">Image d'illustration</p>
        <figure class="image" style="margin-bottom: 15px;">
          <img :src="photo">
          <button class="delete" @click="removeImg()" v-if="photo !== ''"></button>
        </figure>
        <form enctype="multipart/form-data" novalidate>
          <div class="file">
            <label class="file-label">
              <input class="file-input" v-on:change="updateImg($event.target)" name="cardeFile" accept=".jpg, .jpeg, .png" data-vv-as="Une image" type="file" v-validate.initial="'image'" :class="{'is-danger': errors.has('image') }">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="material-icons">file_upload</i>
                </span>
                <span class="file-label">
                  Choisir un fichier
                </span>
              </span>
            </label>
            <span v-show="errors.has('image')" class="help is-danger">{{ errors.first('image') }}</span>
          </div>
        </form>
        <div class="field" v-if="type == 'image'">
          <div class="control has-icons-right">
            <input class="input" v-model="caption" name="caption" data-vv-as="Une légende" type="text" placeholder="Légende (max 300 signes)" v-validate.initial="'required|max:300'" :class="{'is-danger': errors.has('caption') }">
            <span v-show="!errors.has('caption')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
          </div>
          <span v-show="errors.has('caption')" class="help is-danger">{{ errors.first('caption') }}</span>
        </div>
      </div>
      <div class="field" v-if="type == 'instagram'">
        <div class="control has-icons-right">
          <input class="input" v-model="instagram" name="instagram" data-vv-as="L'url du post instagram" type="text" placeholder="Url du post instagram" v-validate.initial="'required|url'" :class="{'is-danger': errors.has('instagram') }">
          <span v-show="!errors.has('instagram')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('instagram')" class="help is-danger">{{ errors.first('instagram') }}</span>
      </div>
      <div class="field" v-if="type == 'tweet'">
        <div class="control has-icons-right">
          <input class="input" v-model="tweet" name="tweet" data-vv-as="L'url du Tweet" type="text" placeholder="Url du Tweet" v-validate.initial="'required|url'" :class="{'is-danger': errors.has('tweet') }">
          <span v-show="!errors.has('tweet')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('tweet')" class="help is-danger">{{ errors.first('tweet') }}</span>
      </div>
      <div class="field" v-if="type == 'iframe'">
        <div class="control has-icons-right">
          <input class="input" v-model="iframe" name="iframe" data-vv-as="Une url" type="text" placeholder="Url" v-validate.initial="'required|url'" :class="{'is-danger': errors.has('iframe') }">
          <span v-show="!errors.has('iframe')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
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
  name: 'CardTemoignage',
  props: {
    idxCard: {type: Number},
    typeCard: {type: String},
    nameCard: {type: String},
    chiffreCard: {type: String, default: ''},
    titleCard: {type: String, default: ''},
    textCard: {type: String, default: ''},
    imageCard: {type: String, default: 'https://dummyimage.com/500x150/ccc/fff/'},
    signatureCard: {type: String, default: ''},
    videoTypeCard: {type: String, default: ''},
    videoUrlCard: {type: String, default: ''},
    photoCard: {type: String, default: ''},
    captionCard: {type: String, default: ''},
    instagramCard: {type: String, default: ''},
    tweetCard: {type: String, default: ''},
    iframeCard: {type: String, default: ''}
  },
  data () {
    return {
      idx: this.idxCard,
      type: this.typeCard,
      name: this.nameCard,
      chiffre: this.chiffreCard,
      title: this.titleCard,
      text: this.textCard,
      image: this.imageCard,
      signature: this.signatureCard,
      videoType: this.videoTypeCard,
      videoUrl: this.videoUrlCard,
      photo: this.photoCard,
      caption: this.captionCard,
      instagram: this.instagramCard,
      tweet: this.tweetCard,
      iframe: this.iframeCard,
      fileTypes: ['image/jpeg', 'image/png', 'image/gif'],
      isOpen: true
    }
  },
  watch: {
    idxCard (value) { this.idx = this.idxCard },
    typeCard (value) { this.type = this.typeCard },
    nameCard (value) { this.name = this.nameCard },
    chiffreCard (value) { this.chiffre = this.chiffreCard },
    titleCard (value) { this.title = this.titleCard },
    textCard (value) { this.text = this.textCard },
    imageCard (value) { this.image = this.imageCard },
    signatureCard (value) { this.signature = this.signatureCard },
    videoTypeCard (value) { this.videoType = this.videoTypeCard },
    videoUrlCard (value) { this.videoUrl = this.videoUrlCard },
    photoCard (value) { this.photo = this.photoCard },
    captionCard (value) { this.caption = this.captionCard },
    instagramCard (value) { this.instagram = this.instagramCard },
    tweetCard (value) { this.tweet = this.tweetCard },
    iframeCard (value) { this.iframe = this.iframeCard },
    chiffre (value) { this.$emit('emitCardChiffre', value) },
    title (value) { this.$emit('emitCardTitle', value) },
    text (value) { this.$emit('emitCardText', value) },
    signature (value) { this.$emit('emitCardSignature', value) },
    videoType (value) { this.$emit('emitCardVideoType', value) },
    videoUrl (value) { this.$emit('emitCardVideoUrl', value) },
    photo (value) { this.$emit('emitCardPhoto', value) },
    caption (value) { this.$emit('emitCardCaption', value) },
    instagram (value) { this.$emit('emitCardInstagram', value) },
    tweet (value) { this.$emit('emitCardTweet', value) },
    iframe (value) { this.$emit('emitCardIframe', value) }
  },
  methods: {
    updateImg (input) {
      var curFiles = input.files
      if (curFiles.length === 0) {
        this.image = 'https://dummyimage.com/500x150/ccc/fff/'
      } else {
        if (this.validFileType(curFiles[0])) {
          this.image = slugify(curFiles[0].name) + '.' + curFiles[0].name.split('.').pop()
          this.photo = window.URL.createObjectURL(curFiles[0])
          this.$emit('emitCardImage', this.image)
          this.$emit('emitCardPhoto', this.photo)
          this.uploadImage(input)
        } else {
          this.image = 'https://dummyimage.com/500x150/ccc/fff/'
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
      httpFiles.post('upload/temoignage', formData)
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
      this.image = ''
      this.photo = ''
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
.collapse-icon {vertical-align: middle;}
</style>
