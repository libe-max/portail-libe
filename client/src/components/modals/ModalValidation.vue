<template>
  <div class="modal" :class="{'is-active': isActive}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <article class="message">
        <header class="message-header">
          <p>Attention</p>
          <button class="delete" @click="cancel()"></button>
        </header>
        <div class="message-body">
          Voulez-vous vraiment {{message}} ?
        </div>
        <footer class="card-footer">
          <a class="card-footer-item has-text-dark" @click="cancel()">Annuler</a>
          <a class="card-footer-item has-text-success" @click="submit()">Valider</a>
        </footer>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalValidation',
  props: {
    message: {type: String, default: 'effectuer cette action'},
    isActive: {type: Boolean, default: false}
  },
  data () {
    return {
      active: this.isActive
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
