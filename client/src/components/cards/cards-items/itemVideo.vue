<template>
  <div class="message">
    <div class="message-header">
      <span>{{idx + 1}} - {{item.name}}</span>
      <button class="delete" @click="remove(idx)"></button>
    </div>
    <div class="message-body">
      <div class="field">
        <div class="control">
          <div class="select">
            <select v-model="item.videoType" name="videoType" data-vv-as="Un type de vidéo" v-validate.initial="'required|in:youtube,dailymotion'" :class="{'is-danger': errors.has('videoType') }">
              <option value="youtube">YouTube</option>
              <option value="dailymotion">Dailymotion</option>
            </select>
          </div>
          <span v-show="errors.has('videoType')" class="help is-danger">{{ errors.first('videoType') }}</span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <input class="input" v-model="item.videoUrl" name="videoUrl" data-vv-as="L'url de la video" type="text" placeholder="Url de la video" v-validate.initial="'required|url'" :class="{'is-danger': errors.has('videoUrl') }">
          <span v-show="!errors.has('videoUrl')" class="icon is-small is-right has-text-success"><i class="material-icons">check</i></span>
        </div>
        <span v-show="errors.has('videoUrl')" class="help is-danger">{{ errors.first('videoUrl') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemVideo',
  props: {
    idx: {type: Number, require: true},
    item: {type: Object, require: true},
    show: {type: Boolean, default: true}
  },
  methods: {
    remove (idx) {
      this.$emit('remove', idx)
    }
  }
}
</script>
