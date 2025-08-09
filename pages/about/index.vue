<template>
  <div>
    <page-header
      :title="$t('common.pages.about.title')"
      back-to="/oblyk"
    />
    <v-container class="common-page-container">
      <!-- In few words -->
      <h1 class="text-center mt-5 mb-10">
        {{ $t('common.pages.about.title') }}
      </h1>
      <h2 class="mb-2">
        En Bref
      </h2>
      <p>
        <strong>Oblyk</strong> est une platform communautaire <strong>dédiée à l'escalade</strong>, elle a pour but de créer une grande <strong>base de donnée des falaises et voies</strong> de France et du monde, aider les grimpeur·euse·s à <strong>trouver des partenaires</strong>, suivre sa progression en escalade en tenant un <strong>carnet de croix</strong>, permettre au salle de tenir un <strong>topo indoor</strong>, et plus généralement : Oblyk est un <strong>réseau social de la grimpe</strong>.
      </p>

      <!-- Why? -->
      <h2 class="mt-10 mb-2">
        Oblyk, pourquoi&nbsp;? pour aller où&nbsp;?
      </h2>
      <p>
        Oblyk a pour vocation de fournir l'outil le plus complet possible dédié à l'escalade, que ça soit indoor, outdoor ou la recherche de partenaire de grimpe.<br>
        Ici on ne parle pas de ski, de rando, ou autre sport lié à la montagne. C'est escalade, escalade, escalade 😆
      </p>
      <p>
        Nous ne sommes pas journalistes non plus, l'actualité des compétitions et des croix des gros·se·s grimpeur·euse·s ce n'est pas notre créneau. Par contre, que vous sachiez qu'un nouveau 6a a été ouvert à côté de chez vous, ça on veut que vous le sachiez&nbsp;!
      </p>
      <p>
        On espère qu'en se focalisant sur l'escalade et en ne s'éparpillant pas <cite>(trop)</cite> nous réussirons à vous proposer un outil pertinent et complet.
      </p>

      <!-- Project history -->
      <h2 class="mt-10 mb-2">
        L'histoire du projet
      </h2>
      <p>
        Oblyk n'est pas né de la dernière pluie et a déjà eu un certain nombre de changements de cap et remaniements, en voici les quelques dates clés&nbsp;:
      </p>
      <ul>
        <!-- 2014 -->
        <li class="pb-5">
          <strong>2014 :</strong>
          Les premiers pas du projet avec "carnet-de-croix.net", un site né d'une volonté : permettre aux grimpeur·euse·s de noter leurs croix, et garder une trace de leurs réalisations pendant toutes leurs années de grimpe.
        </li>

        <!-- 2015 -->
        <li class="pb-5">
          <strong>2015 :</strong>
          Fabio Carmouche rejoint l'équipe et l'envie de pousser plus loin le champs d'action du projet se concrétise par un nouveau site&nbsp;: "oblyk.net".
          Le carnet de croix reste central, mais le développement de fonctionnalités plus "communauté" est là&nbsp;: forum, messagerie, système d'amitié, etc.<br>
          <v-row>
            <v-col class="text-center">
              <v-img
                height="150"
                contain
                src="/images/oblyk-net.jpg"
                @click="oblykNetHomeImg = true"
              />
              <small class="text--disabled">Page d'accueil oblyk.net</small>
            </v-col>
          </v-row>
        </li>

        <!-- 2017 -->
        <li class="pb-5">
          <strong>2017 :</strong>
          Oblyk.net devient Oblyk.org. Derrière ce changement de nom de domaine se cache une refonte complète du code, du design et de l'orientation "éthique" du site. oblyk devient open source, une première ébauche d'accès à la base de donnée des falaises <cite>(via api)</cite> et faite. De nouvelles fonctionnalités sont développées&nbsp;: comme la recherche de partenaire d'escalade.
          <v-row>
            <v-col class="col-6 text-center">
              <v-img
                height="200"
                contain
                src="/images/oblyk-org-old-dashboard.jpg"
                @click="oblykOrgOldDashboardImg = true"
              />
              <small class="text--disabled">Tableau de bord d'un·e grimpeur·euse</small>
            </v-col>
            <v-col class="col-6 text-center">
              <v-img
                height="200"
                contain
                src="/images/oblyk-org-old-outdoor.jpg"
                @click="oblykOrgOldOutdoorImg = true"
              />
              <small class="text--disabled">Une page falaise</small>
            </v-col>
          </v-row>
        </li>

        <!-- 2021 -->
        <li class="pb-5">
          <strong>2021 :</strong>
          Après presque deux années sans développement un nouveau vent de fraîcheur souffle sur Oblyk&nbsp;!
          Une nouvelle refonte est faite pour effacer la dette technique, mais aussi réorienter légèrement le projet&nbsp;:
          être conçu comme une application, supprimer le forum inactif, améliorer la recherche de partenaire,
          perfectionner le référencement des sites outdoor et le carnet de croix,
          inclure dès les bases du projet tout un ensemble d'outil pour la grimpe indoor, et être toujours plus open source.
        </li>
      </ul>

      <p>
        Dans le future nous souhaitons continuer d'améliorer ces 4 axes de développement qui sont&nbsp;:
      </p>
      <ul>
        <li>La grimpe outdoor <cite class="text--disabled">(référencement des falaises et voies, carnet de croix)</cite></li>
        <li>La grimpe indoor <cite class="text--disabled">(topo indoor, suivi de sa progression)</cite></li>
        <li>Grimper ensemble <cite class="text--disabled">(recherche de partenaire)</cite></li>
        <li>Être ouvert et utile à la communauté grimpante <cite class="text--disabled">(open-source, API ouverte)</cite></li>
      </ul>

      <!-- Who? -->
      <h2 class="mt-10 mb-2">
        Qui est derrière Oblyk&nbsp;?
      </h2>
      <p>
        Oblyk est développé par <a href="https://github.com/lucien-chastan">Lucien CHASTAN</a>, drômois passionné d'escalade depuis toujours&nbsp;!
      </p>
      <p
        v-if="figures.all"
      >
        Un merci à celles et ceux qui ont, où qui contribuent activement au projet&nbsp;: Fabio Carmouche, <a href="https://github.com/Cdriss">Cdriss</a> et les {{ figures.all.users_count }} grimpeur·euse·s d'oblyk 🙂
      </p>

      <!-- Contribute -->
      <h2 class="mt-10 mb-2">
        Contribuer au projet
      </h2>
      <p>
        Si vous aussi vous trouvez que le projet est chouette et vous aimeriez lui donner un petit coup de pouce bienvenu&nbsp;! Sachez qu'il existe plusieurs façons de nous aider 🙂
      </p>
      <ul>
        <li class="pb-3">
          <strong>Proposer des idées et faire remonter les bugs.</strong><br>
          À force d'avoir le nez dans le projet on fini par ne plus avoir de recul dessus. Votre regard neuf nous est très précieux&nbsp;!<br>
          Si vous avez une suggestion ou que vous avez trouvé un bug, vous pouvez soit&nbsp;: nous écrire (<a href="/contact">mail</a>, <a href="https://www.facebook.com/pageoblyk/">Facebook</a>),
          soit ouvrir une <a href="https://github.com/oblyk/oblyk-app/issues">issue sur github</a>.
        </li>
        <li class="pb-3">
          <strong>Parler d'oblyk, faire connaître la plateforme</strong>.<br>
          Que vous teniez un blog, ou que vous en parliez autour de vous&nbsp;: ça nous aide&nbsp;!<br>
          Plus oblyk est connu, plus il y aura de contributeurs, et plus la plateforme sera riche et utile aux grimpeur·euse·s.
        </li>
        <li class="pb-3">
          <strong>Participer à la base de connaissance.</strong><br>
          En ajoutant des infos, des photos, des voies sur les falaises, en partageant ce que vous savez de la grimpe autour de chez vous, ou juste en tenant un carnet de croix.
          Vous contribuez à enrichir la base de connaissance de la grimpe outdoor.
        </li>
        <li class="pb-3">
          <strong>Vous savez coder ?</strong><br>
          <a href="https://github.com/oblyk/oblyk-api">Le back</a> est en Ruby on Rails, <a href="https://github.com/oblyk/oblyk-app">le front</a> en Vuejs.
          tout est dans le readme. La stack est toute neuve. On vous attend 😎
        </li>
      </ul>
      <p>
        Peu importe la contribution que vous apporterez à Oblyk, on vous en remercie&nbsp;!
        <v-icon color="red">
          {{ mdiHeart }}
        </v-icon>
      </p>

      <p class="text-right font-italic mt-10">
        Lucien<br>
        Team Oblyk
      </p>

      <!-- Images dialogue -->
      <v-dialog v-model="oblykNetHomeImg" width="1000">
        <v-img contain alt="capture de oblyk.net" src="/images/oblyk-net.jpg" />
      </v-dialog>

      <v-dialog v-model="oblykOrgOldDashboardImg" width="1000">
        <v-img contain alt="dashboard de oblyk.org" src="/images/oblyk-org-old-dashboard.jpg" />
      </v-dialog>

      <v-dialog v-model="oblykOrgOldOutdoorImg" width="1000">
        <v-img contain alt="une page falaise de oblyk.org" src="/images/oblyk-org-old-outdoor.jpg" />
      </v-dialog>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { mdiHeart } from '@mdi/js'
import CommonApi from '@/services/oblyk-api/CommonApi'
import AppFooter from '@/components/layouts/AppFooter'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, AppFooter },

  data () {
    return {
      mdiHeart,
      oblykNetHomeImg: false,

      oblykOrgOldHomeImg: false,
      oblykOrgOldDashboardImg: false,
      oblykOrgOldOutdoorImg: false,

      figures: {}
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "À propos d'Oblyk",
        metaDescription: 'En savoir plus sur Oblyk, pourquoi et qui est derrière le projet'
      },
      en: {
        metaTitle: 'About Oblyk',
        metaDescription: 'Learn more about Oblyk, why and who is behind the project'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      new CommonApi(this.$axios, this.$auth)
        .figures()
        .then((resp) => {
          this.figures = resp.data
        })
    }
  }
}
</script>
