<template>
  <div class="columns">
    <div class="column">
      <p class="is-size-3"><i class="material-icons">help</i> «Témoignages», mode d'emploi</p>
      <p>&nbsp;</p>
      <div class="collapse is-fullwidth">
        <collapse-item title="Comment créer votre format «Témoignages»&nbsp;?">
          <p>• La case <strong>Nom du projet</strong> vous permet de donner un nom simple à votre projet. C'est aussi ce qui apparaîtra dans l'url (adresse) du format lorsqu'il sera publié, donc choisissez quelque chose de clair, pas une private joke (vous pourrez le modifier en cours de route).</p>
          <p>• La case <strong>Titraille</strong> vous permet d'éditer les éléments qui apparaîtront en tête de page&nbsp;: titre, chapô etc.</p>
          <p>• La case <strong>Image</strong> est destinée à l'image de partage&nbsp;: celle qui accompagnera le nom de votre format lorsque celui-ci sera partagé par un utilisateur de Facebook ou Twitter. Dans la mesure du possible, elle doit être «paysage» (plus large que haute) et raccord avec le sujet, évidemment. Et il faut utiliser la même pour l'image d'appel en home de Libé (voir avec le web&nbsp;/ l'édition).</p>
          <p>• La case <strong>Couleurs</strong> vous permet de choisir le thème de votre format&nbsp;: pour chaque couleur de texte disponible, trois couleurs de fond au choix vous sont proposés.</p>
          <p>• Ensuite (ou d'abord, vous pouvez faire ça dans l'ordre que vous voulez) il vous suffit de créer des boites grâce aux <strong>boutons item</strong> en bas de l'écran. Chaque boite correspond à un élément de votre format «Témoignages».</p>
        </collapse-item>
        <collapse-item title="Les différents items disponibles">
          <p><i class="material-icons is-size-5">short_text</i><strong>Titre seul&nbsp;:</strong> pour afficher un simple texte de quelques mots. La case ainsi créée est non-cliquable.</p>
          <p><i class="material-icons is-size-5">art_track</i><strong>Texte&nbsp;:</strong> pour intégrer un texte (longueur au choix) qui s'affiche lorsque la case est dépliée (au clic). Lorsqu'elle est repliée, seul le titre est visible, ainsi que l'éventuelle image d'illustration.</p>
          <p><i class="material-icons is-size-5">photo_size_select_actual</i><strong>Image&nbsp;:</strong> permet d'afficher une image plein pot, dans une case non-cliquable. Possibilité d'y adjoindre une courte légende en-dessous.</p>
          <p><i class="material-icons is-size-5">looks_one</i><strong>Chiffre&nbsp;:</strong> cette boite non-cliquable permet de mettre en exergue un chiffre, sous lequel se déroule un texte explicatif.</p>
          <p><i class="material-icons is-size-5">format_quote</i><strong>Citation&nbsp;:</strong> une case non-cliquable qui affiche une citation et, en-dessous, son auteur.</p>
          <p><i class="icon ion-social-twitter is-size-5"></i><strong>Tweet&nbsp;:</strong> entrez l'URL d'un tweet pour que ce qui y est écrit (et le nom de celui qui l'a écrit) soient réadaptés à votre format «Témoignages».</p>
          <p><i class="material-icons is-size-5">ondemand_video</i><strong>Vidéo&nbsp;:</strong> permet d'insérer une vidéo Youtube ou Dailymotion directement dans le format, sans avoir à déplier une case.</p>
          <p><i class="icon ion-social-instagram is-size-5"></i><strong>Instagram&nbsp;:</strong> pour intégrer un post Instagram à partir de son URL.</p>
          <p><i class="material-icons is-size-5">code</i><strong>Iframe&nbsp;:</strong> le principe est le même que pour l'item texte, sauf que vous pouvez ajouter au pied du texte un iframe en copiant/collant le code (pour une vidéo, un youscribe, une playlist, etc…).</p>
        </collapse-item>
        <collapse-item title="Au fur et à mesure…">
          <p>• A tout moment, vous pouvez voir à quoi ressemblerait votre format si vous le publiez tout de suite grâce à l'outil <strong>Aperçu</strong>&nbsp;<i class="material-icons is-size-5">visibility</i>. Si l'aperçu ne s'ouvre pas, c'est sans doute que votre navigateur a bloqué la pop-up…</p>
          <p>• N'oubliez pas d'enregistrer de temps en temps grâce au bouton <strong>Enregistrer</strong>&nbsp;<i class="material-icons is-size-5">save</i>. Pratique pour reprendre le boulot un peu plus tard (en recherchant votre projet grâce au nom que vous lui avez donné au début).</p>
        </collapse-item>
        <collapse-item title="Et quand j'ai fini&nbsp;?">
          <p>Tout est bon&nbsp;? Vous êtes contents de vous&nbsp;? Tant mieux&nbsp;: il ne vous reste plus qu'à terminer votre projet grâce au bouton <strong>Publier</strong>&nbsp;<i class="material-icons is-size-5">check</i>. Passez ensuite nous voir à Six Plus (au web) et/ou à l'édition pour finaliser le tout et publier votre format «Témoignages»&nbsp;!</p>
        </collapse-item>
      </div>
    </div>
  </div>
</template>

<script>
import CollapseItem from '@/components/collapse/Item'
export default {
  name: 'Tutoriel-Temoignage',
  components: {
    CollapseItem
  }
}
</script>
