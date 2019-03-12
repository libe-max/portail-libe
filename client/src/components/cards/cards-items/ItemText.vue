<template>
  <div class="message">
    <div class="message-header">
      <span>{{idx + 1}} - {{item.name}}</span>
      <button class="delete" @click="remove(idx)"></button>
    </div>
    <div class="message-body">
      <div class="field">
        <div class="control has-icons-right">
          <input class="input" v-model="item.title" name="title" data-vv-as="Un titre" type="text" placeholder="Titre" v-validate.initial="'required'" :class="{'is-danger': errors.has('title') }">
          <span v-show="!errors.has('title')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</span>
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <textarea class="textarea" v-model="item.text" name="text" data-vv-as="Un texte" placeholder="Texte" v-validate.initial="'required'" :class="{'is-danger': errors.has('text') }"></textarea>
          <span v-show="!errors.has('text')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('text')" class="help is-danger">{{ errors.first('text') }}</span>
      </div>
      <div>
        <p>Image d'illustration</p>
        <figure class="image" style="margin-bottom: 15px;">
          <img :src="item.photo">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemText',
  props: {
    idx: {type: Number, require: true},
    item: {type: Object, require: true},
    show: {type: Boolean, default: true}
  },
  data () {
    return {
      fileTypes: ['image/jpeg', 'image/png']
    }
  },
  methods: {
    updateImg (input) {
      var curFiles = input.files
      if (curFiles.length === 0) {
        this.item.image = 'https://dummyimage.com/500x150/ccc/fff/'
      } else {
        if (this.validFileType(curFiles[0])) {
          this.item.image = curFiles[0].name
          this.photo = window.URL.createObjectURL(curFiles[0])
          this.$emit('emitCardImage', curFiles[0].name)
          this.$emit('emitCardPhoto', window.URL.createObjectURL(curFiles[0]))
          this.uploadImage(input)
        } else {
          this.item.image = 'https://dummyimage.com/500x150/ccc/fff/'
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
      httpFiles.post('upload', formData)
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
    }
  }
}
</script>
