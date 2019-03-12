<template>
  <div class="card">
    <div class="card-content">
      <div class="subtitle">Choix des couleurs</div>
      <div class="columns is-gapless is-multiline">
        <div class="column is-2 color-box" v-for="color in colors" :key="color.name" :class="getOpacity(color.name)" @click="getMain(color.name)">
          <span :style="backgroundColor(color.main)"></span>
        </div>
      </div>
      <hr>
      <div class="columns is-gapless is-multiline">
        <div class="column is-10" style="margin-bottom: 1.5rem; line-height: 40px;">Couleur du texte</div>
        <div class="column is-2 color-box">
          <span class="border-black" style="margin-bottom: 1.5rem;" :style="backgroundColor(getTextColor())"></span>
        </div>
        <div class="column" :class="isOneSide" style="margin-bottom: 1.5rem; line-height: 40px;">Couleur du fond</div>
        <div class="column color-box" @click="sideChoice = white">
          <span :class="borderBlack(white)" :style="backgroundColor(white)"></span>
        </div>
        <div class="column color-box" v-if="mainChoice != black" @click="sideChoice = grey">
          <span :class="borderBlack(grey)" :style="backgroundColor(grey)"></span>
        </div>
        <div class="column color-box" v-if="mainChoice != black" @click="sideChoice = getMainColor.light">
          <span :class="borderBlack(getMainColor.light)" :style="backgroundColor(getMainColor.light)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardColor',
  props: {
    main: {type: String, default: '#000'},
    side: {type: String, default: '#fff'}
  },
  data () {
    return {
      mainChoice: this.main,
      sideChoice: this.side,
      colors: [
        {name: 'red', main: '#e61e49', light: '#e61e49'},
        {name: 'pink', main: '#e91e63', light: '#f48fb1'},
        {name: 'purple', main: '#9c27b0', light: '#ce93d8'},
        {name: 'indigo', main: '#3f51b5', light: '#9fa8da'},
        {name: 'blue', main: '#2196f3', light: '#90caf9'},
        {name: 'cyan', main: '#00bcd4', light: '#80deea'},
        {name: 'teal', main: '#009688', light: '#80cbc4'},
        {name: 'green', main: '#4caf50', light: '#a5d6a7'},
        {name: 'lime', main: '#cddc39', light: '#e6ee9c'},
        {name: 'yellow', main: '#ffeb3b', light: '#fff59d'},
        {name: 'orange', main: '#ff9800', light: '#ffcc80'},
        {name: 'blue-grey', main: '#607d8b', light: '#b0bec5'}
      ],
      white: '#fff',
      grey: '#ccc',
      black: '#000'
    }
  },
  watch: {
    mainChoice (color) {
      this.$emit('update:main', this.getTextColor())
    },
    sideChoice (color) {
      this.$emit('update:side', color)
    }
  },
  computed: {
    getMainColor () {
      return this.$lodash.find(this.colors, {'name': this.mainChoice})
    },
    isOneSide () {
      return {'is-10': this.mainChoice === this.black, 'is-6': this.mainChoice !== this.black}
    }
  },
  methods: {
    getMain (name) {
      this.mainChoice = this.mainChoice === name ? this.black : name
      if (this.mainChoice === this.black) this.sideChoice = this.white
      else if (this.sideChoice !== this.white && this.sideChoice !== this.grey) this.sideChoice = this.getMainColor.light
      this.$emit('update:main', this.getTextColor())
    },
    getOpacity (name) {
      return {'opacity': this.mainChoice !== this.black && this.mainChoice !== name}
    },
    getTextColor () {
      return this.mainChoice === this.black ? this.black : this.getMainColor.main
    },
    getSideColor (color) {
      return this.sideChoice === color
    },
    borderBlack (color) {
      return {'border-black': this.getSideColor(color)}
    },
    backgroundColor (color) {
      return {'backgroundColor': color}
    }
  }
}
</script>

<style scoped>
.color-box {cursor: pointer;}
.color-box span {display: block; width: 100%; height: 50px; margin: 0 auto; border: 1px solid #f4f4f4;}
.color-box span.border-black {border: 3px solid #000;}
.opacity {opacity: .3;}
.subtitle {border-bottom: 1px solid #dbdbdb;}
</style>
