<template>
  <div class="card">
    <div class="card-content">
      <div class="subtitle">Image d'appel</div>
      <div class="card-image" style="margin-bottom: 1.5rem;">
        <figure class="image is-marginless">
          <img :src="image">
        </figure>
        <button class="delete" @click="removeImg()"></button>
      </div>
      <form enctype="multipart/form-data" novalidate>
        <div class="file has-name is-boxed is-fullwidth">
          <label class="file-label">
            <input class="file-input" type="file" name="socialFile" accept=".jpg, .jpeg, .png" @change="updateImg($event.target)" data-vv-as="Une image" v-validate.initial="'required'" :class="{'is-danger': errors.has('socialFile') }">
            <span class="file-cta">
              <span class="file-icon">
                <i class="material-icons">file_upload</i>
              </span>
              <span class="file-label">
                Choisir un fichier
              </span>
            </span>
            <span class="file-name">{{name}}</span>
            <span v-show="errors.has('socialFile')" class="help is-danger">{{ errors.first('socialFile') }}</span>
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {slugify} from '@/services/utils'
import {httpFiles} from '@/services/http-common'
export default {
  inject: ['$validator'],
  name: 'CardSocial',
  props: {
    type: {type: String},
    social: {type: String, default: 'https://dummyimage.com/750x500/ccc/fff/&text=Image d\'appel 750x500px'}
  },
  data () {
    return {
      image: this.social,
      name: '...',
      fileTypes: ['image/jpg', 'image/jpeg', 'image/png']
    }
  },
  watch: {
    social (value) {
      if (this.$route.params.id !== 'new') {
        this.image = 'http://10.14.244.101:8081/app/' + this.$route.params.id + '/static/upload/' + value
        this.name = value
      }
    }
  },
  methods: {
    updateImg (input) {
      var curFiles = input.files
      if (curFiles.length === 0) {
        this.image = 'https://dummyimage.com/750x500/ccc/fff/&text=Aucunne image séléctionné'
      } else {
        console.log(this.validFileType(curFiles[0]))
        if (this.validFileType(curFiles[0])) {
          this.image = window.URL.createObjectURL(curFiles[0])
          this.name = slugify(curFiles[0].name) + '.' + curFiles[0].name.split('.').pop()
          this.$emit('update:socialImg', this.name)
          this.uploadSocial(input)
        } else {
          this.image = 'https://dummyimage.com/750x500/ccc/fff/&text=Le format d\'image n\'est pas valide'
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
    uploadSocial (input) {
      var formData = new FormData()
      // var config = { headers: { 'content-type': 'multipart/form-data' } }
      formData.append(input.name, input.files[0], input.files[0].name)
      httpFiles.post('social/' + this.type, formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          // this.errors.push(e)
        })
    },
    removeImg () {
      this.image = 'https://dummyimage.com/750x500/ccc/fff/&text=Image d\'appel 750x500px'
      this.name = '...'
    }
  }
}
</script>

<style scoped>
.file-cta {border: 1px solid #dbdbdb;}
.file.is-boxed .file-cta {
  flex-direction: row;
  padding: 10px;
}
.card-image {position: relative;}
.card-image .delete {position: absolute; top: 5px; right: 5px;}
</style>
