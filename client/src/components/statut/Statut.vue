<template>
  <div class="tag" :class="statutClass(currentStatut)">{{currentStatut | statut}}</div>
</template>

<script>
export default {
  name: 'Statut',
  props: {
    currentStatut: {type: String}
  },
  methods: {
    statutClass (statut) {
      if (statut === 'created') return 'is-lighter'
      else if (statut === 'saved') return 'is-info'
      else if (statut === 'published') return 'is-success'
    }
  }
}
</script>
