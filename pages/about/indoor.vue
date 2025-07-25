<template>
  <div>
    <v-container class="indoor-presentation">
      <!-- Title and subtitle -->
      <v-img
        src="/images/indoor/indoor-presentation-banner.webp"
        alt="Bandeau de présentation d'Oblyk indoor"
        height="300"
        class="rounded align-end text-center mt-4 mb-10"
      >
        <v-sheet class="d-inline-block px-4 px-lg-15 py-3 rounded mb-lg-5 elevation-8">
          <h1 class="text-center">
            Oblyk pour votre salle
          </h1>
          <p class="subtitle-2 mb-2 text-center">
            Créez <em>LE</em> topo de votre salle d'escalade
          </p>
        </v-sheet>
      </v-img>

      <div class="px-lg-15">
        <p class="text-center introduction-text">
          Créez le <strong class="deep-purple--text text--accent-4">topo indoor</strong> de votre <strong class="deep-purple--text text--accent-4">salle d'escalade</strong>. Gérez facilement la rotation de vos <strong class="deep-purple--text text--accent-4">ouvertures</strong>. Connectez-vous à votre <strong class="deep-purple--text text--accent-4">communauté de grimpeurs et grimpeuses</strong>. Aidez-les à progresser en leur permettant de <strong class="deep-purple--text text--accent-4">noter leurs croix indoor</strong>.<br>
          Et profitez de plein d'autres fonctionnalités !
        </p>
      </div>

      <v-row class="my-15">
        <v-col cols="12" md="6" class="d-flex">
          <div class="px-5 align-self-center">
            <h3 class="mb-3 presentation-box-title">
              <span class="deep-purple--text text--accent-4">Organisez votre topo</span> librement
            </h3>
            <p>
              Votre salle est unique, et nous vous donnons les outils pour la représenter telle qu’elle est. Divisez votre salle en espaces et en secteurs logiques qui vous conviennent.
            </p>
            <p>
              Ajoutez ensuite vos voies et blocs en quelques clics grâce à une configuration de vos espaces simple et efficace.
            </p>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          order-lg="first"
          class="d-flex justify-center"
        >
          <v-img
            class="align-self-center"
            src="/svg/indoor/spaces.svg"
            alt="Concept des espaces sur Oblyk indoor"
          />
        </v-col>
      </v-row>

      <v-row class="my-15">
        <v-col cols="12" md="6" class="d-flex">
          <div class="px-5 align-self-center">
            <h3 class="mb-3 presentation-box-title">
              Peu importe le type d'escalade ou vos niveaux de difficulté, <span class="deep-purple--text text--accent-4">on s'adapte à votre salle</span>
            </h3>
            <p>
              Que vous soyez une salle de voies, de blocs, de pan, que vous utilisiez des étiquettes pour noter la difficulté ou des cotations (ou les deux), vous pouvez créer le topo de votre salle sur Oblyk.
            </p>
            <p class="font-weight-bold mb-2">
              Oblyk indoor est conçu pour gérer :
            </p>
            <ul class="list-style-none">
              <li>
                <v-icon
                  left
                  color="purple darken-2"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                Les blocs, voies, pans et voies de vitesse
              </li>
              <li>
                <v-icon
                  left
                  color="purple darken-2"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                Les niveaux par couleur de prise ou d'étiquette
              </li>
              <li>
                <v-icon
                  left
                  color="purple darken-2"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                Les niveaux par cotation "standard" (5c, 6a+, etc.)
              </li>
              <li>
                <v-icon
                  left
                  color="purple darken-2"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                La difficulté par un système de points
              </li>
              <li>
                <v-icon
                  left
                  color="purple darken-2"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                Les voies de plusieurs longueurs
              </li>
            </ul>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center"
        >
          <v-img
            max-width="330"
            class="align-self-center"
            src="/svg/indoor/grades.svg"
            alt="Les différents systèmes de cotation"
          />
        </v-col>
      </v-row>

      <v-row class="my-15">
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center"
        >
          <div class="px-5 align-self-center">
            <h3 class="mb-3 presentation-box-title">
              <span class="deep-purple--text text--accent-4">Supervisez vos ouvertures</span> en un clic
            </h3>
            <p>
              Faites un état des lieux de vos ouvertures&nbsp;: depuis quand elles sont montées, quelles sont les plus grimpées, comment est réparti le niveau d'escalade dans votre salle, etc.
            </p>
            <p>
              Besoin de plus de finesse&nbsp;? Vous pouvez simplement filtrer vos statistiques pour analyser une partie de vos ouvertures selon des critères comme l'espace ou les ouvreurs / ouvreuses.
            </p>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center"
          order-lg="first"
        >
          <v-img
            class="align-self-center"
            src="/svg/indoor/statistic.svg"
            alt="Les statistiques d'Oblyk indoor"
          />
        </v-col>
      </v-row>

      <v-row class="my-15">
        <v-col
          cols="12"
          md="6"
          class="d-flex"
        >
          <div class="px-5  align-self-center">
            <h3 class="mb-3 presentation-box-title">
              <span class="deep-purple--text text--accent-4">Un outil numérique</span> pour vos grimpeurs et grimpeuses
            </h3>
            <p>
              Créer le topo intérieur de votre salle d'escalade vous permet de mieux maîtriser vos ouvertures,
              mais aussi d'offrir à vos grimpeurs et grimpeuses un nouveau service numérique lié à votre salle.
            </p>
            <p class="font-weight-bold mb-2">
              Grâce à votre topo&nbsp;:
            </p>
            <ul class="list-style-none">
              <li class="mb-4">
                <v-icon left class="mt-n1" color="amber darken-2">
                  {{ mdiCheckboxOutline }}
                </v-icon>
                Les grimpeurs et grimpeuses peuvent noter les voies qu'ils font pour garder un suivi de leur séance et les aider à progresser
              </li>
              <li class="mb-4">
                <v-icon left class="mt-n1" color="red">
                  {{ mdiHeartHalfFull }}
                </v-icon>
                Ils/elles peuvent vous remonter les blocs/voies qu'ils/elles ont appréciés et ainsi vous aider dans la qualité de vos ouvertures
              </li>
              <li class="mb-4">
                <v-icon left class="mt-n1" color="blue">
                  {{ mdiRefreshCircle }}
                </v-icon>
                Ils/elles peuvent voir s'il y a des nouvelles ouvertures ou être au courant de celles qui vont prochainement êtres démontées
              </li>
              <li class="mb-4">
                <v-icon left class="mt-n1" color="green">
                  {{ mdiTerrain }}
                </v-icon>
                Ils/elles ont un seul carnet de croix pour <strong>l'outdoor</strong> et <strong>l'indoor</strong> !
              </li>
            </ul>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center"
        >
          <v-img
            max-width="360"
            class="align-self-center"
            src="/svg/indoor/climbers-logbook.svg"
            alt="Le carnet de croix indoor des grimpeurs"
          />
        </v-col>
      </v-row>

      <v-row class="my-15">
        <v-col
          cols="12"
          md="6"
          class="d-flex"
        >
          <div class="px-5 align-self-center">
            <h3 class="mb-3 presentation-box-title">
              Vous <span class="deep-purple--text text--accent-4">imprimez des étiquettes</span> pour vos pieds de voie&nbsp;? On vous mâche le travail
            </h3>
            <p>
              Sélectionnez un secteur, une journée d'ouverture ou des voies en particulier, cliquez sur <strong>"imprimer"</strong>&nbsp;! Vos étiquettes sont prêtes à être posées au pied de leurs voies.
            </p>
          </div>
        </v-col>
        <v-col
          order-lg="first"
          cols="12"
          md="6"
          class="d-flex justify-center"
        >
          <v-img
            max-width="330"
            class="align-self-center"
            src="/svg/indoor/print-route-sheet.svg"
            alt="Imprimer les fiches pour vos voies"
          />
        </v-col>
      </v-row>

      <v-row class="my-15">
        <v-col
          cols="12"
          md="6"
          class="d-flex"
        >
          <div class="px-5 align-self-center">
            <h3 class="mb-3 presentation-box-title">
              <span class="deep-purple--text text--accent-4">Organisez des contests</span> n'a jamais été aussi simple !
            </h3>
            <p>
              Organiser un contest via Oblyk vous permet notamment de vous affranchir de l'inscription des participants et du dépouillement des résultats. Mais vous pouvez faire bien plus&nbsp;!
            </p>
            <p class="font-weight-bold">
              Les contests sur oblyk vous permettent&nbsp;:
            </p>
            <div class="pl-4">
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiCalendarCheck }}
                </v-icon>
                Faites durer vos contest quelques heures comme plusieurs jours
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiWaves }}
                </v-icon>
                Divisez vos grimpeurs et grimpeuses en vagues pour limiter le nombre de personnes sur les tapis
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiShape }}
                </v-icon>
                Utilisez des catégories officielles (U12, U16, etc.) mais aussi des catégories personnalisées (loisir, confirmé, etc.)
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiFormatListNumbered }}
                </v-icon>
                Organisez votre contest en étapes (qualif, demi, finale)
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiCounter }}
                </v-icon>
                Choisissez parmi plus de 10 systèmes de décompte de points pour classer vos participants
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiSetMerge }}
                </v-icon>
                Faites des combinés <cite>voie - bloc - vitesse</cite> mais aussi des combinés plus originaux
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiAccountMultiple }}
                </v-icon>
                Faites des contests en équipe !
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiTrophy }}
                </v-icon>
                Liez tous vos contests annuels au sein d'un championnat
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiCircleBoxOutline }}
                </v-icon>
                Affichez vos résultats en direct comme un pro&nbsp;!
              </p>
              <p>
                <v-icon color="purple darken-2" left>
                  {{ mdiDice5 }}
                </v-icon>
                Tirez au sort parmi vos participants et participantes pour une tombola clé en main&nbsp;!
              </p>
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center"
        >
          <v-img
            max-width="330"
            class="align-self-center"
            src="/svg/indoor/contest.svg"
            alt="Les contests sur oblyk"
          />
        </v-col>
      </v-row>

      <v-row class="my-15">
        <v-col
          cols="12"
          md="6"
          class="d-flex"
        >
          <div class="px-5">
            <h3 class="mb-3 presentation-box-title">
              Nos reportings ne vous suffisent pas&nbsp;? <span class="deep-purple--text text--accent-4">Utilisez notre API en toute liberté</span>
            </h3>
            <p>
              Oblyk est entièrement conçu sur une API, l'application étant complètement décorrélée du serveur de données.<br>
              Si vous souhaitez consulter vos données dans un contexte que nous ne vous fournissons pas, nous pouvons vous donner accès à notre API REST pour que vous puissiez récupérer vos données d'ouverture brutes.
            </p>
            <div class="text-center">
              <v-btn
                dark
                large
                elevation="0"
                color="deep-purple accent-4"
                to="/contact"
              >
                <v-icon left>
                  {{ mdiEmail }}
                </v-icon>
                <u class="mr-1 font-weight-bold">Contactez-nous</u>
                pour en savoir plus
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col
          order-lg="first"
          cols="12"
          md="6"
          class="d-flex justify-center"
        >
          <v-img
            max-width="330"
            class="align-self-center"
            src="/svg/indoor/api.svg"
            alt="Les API d'Oblyk"
          />
        </v-col>
      </v-row>

      <div
        v-intersect="onIntersectGyms"
        class="my-15"
      >
        <h3 class="text-center mb-4 presentation-box-title">
          <span class="deep-purple--text text--accent-4">Ils/elles ont choisi Oblyk</span> pour gérer les ouvertures de voies dans leur salle&nbsp;!
        </h3>
        <v-row v-if="loadingGyms">
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <v-skeleton-loader type="list-item-avatar-two-line" />
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <v-skeleton-loader type="list-item-avatar-two-line" />
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="4"
          >
            <v-skeleton-loader type="list-item-avatar-two-line" />
          </v-col>
        </v-row>
        <div
          v-else
          class="mt-2"
        >
          <v-row justify="center">
            <v-col
              v-for="(gym, gymIndex) in limitedGyms"
              :key="`gym-index-${gymIndex}`"
              cols="12"
              md="6"
              lg="4"
            >
              <gym-small-card
                :gym="gym"
                small
                bordered
                go-to-spaces
              />
            </v-col>
          </v-row>
          <div
            v-if="gyms.length - gymLimit > 0 && gymLimit !== null"
            class="text-center mt-4"
          >
            <v-btn
              dark
              elevation="0"
              color="deep-purple accent-4"
              @click="gymLimit = null"
            >
              Voir {{ gyms.length - gymLimit }} autres salles
            </v-btn>
          </div>
        </div>
      </div>

      <div class="mt-16 mb-7">
        <h3 class="text-center mb-3 presentation-box-title">
          <span class="deep-purple--text text--accent-4">À chaque salle d’escalade</span> ses besoins !
        </h3>
      </div>

      <v-row>
        <!-- Starter formule -->
        <v-col cols="12" md="5">
          <v-card
            class="full-height d-flex flex-column plan-box--free"
          >
            <v-card-title class="border-bottom">
              Gratuit
            </v-card-title>
            <div class="pa-4 text-justify">
              Idéal pour commencer sans aucune contrainte financière.
              Créez votre topo, ajoutez vos voies et blocs et permettez à vos grimpeurs et grimpeuses de noter leurs croix.
            </div>
            <div class="px-4 pb-4">
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Créer votre topo en 2D ou en 3D&nbsp;!
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Ajoutez vos voies, blocs, etc. sans limite
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Intéragissez avec vos grimpeurs et grimpeuses
              </p>
            </div>
            <div class="text-right pb-4 pr-6 mt-auto">
              <strong class="text-h4">0€</strong>
              <p class="mb-0">
                <span class="text--disabled">alors lancez-vous&nbsp;!</span>
              </p>
            </div>
          </v-card>
        </v-col>

        <!-- Big gyms -->
        <v-col cols="12" md="7">
          <v-card
            class="full-height d-flex flex-column plan-box--full-package"
          >
            <v-card-title class="border-bottom">
              Full Package&nbsp;!
            </v-card-title>
            <div class="pa-4 text-justify">
              Débloquez tous les outils que peut vous proposer Oblyk&nbsp;: statistiques, impression d'étiquette, contest, et bien plus&nbsp;!
            </div>
            <div class="px-4 pb-4">
              <p class="mb-4">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckAll }}
                </v-icon>
                Les fonctionnalités du plan <strong>'Gratuit'</strong>
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Statistiques avancées
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Impression d'étiquettes
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Contests illimités
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Fiches d'ouvertures
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Accès à vos données par API
              </p>
            </div>
            <v-row>
              <v-col>
                <div class="text-right pb-4 pr-6 mt-auto">
                  <strong class="text-h4">
                    {{ price.toLocaleString() }} €
                  </strong>
                  <p class="mb-0">
                    <span class="text--disabled">TTC, par mois et par salle</span>
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-sheet rounded class="mt-4 pa-4">
        <span class="vertical-align-middle">
          <strong class="deep-purple--text text--accent-4">Vous êtes un club&nbsp;?</strong> Bénéficiez d'un super tarif&nbsp;!
        </span>
        <v-chip color="with" class="ml-2">
          <v-switch
            v-model="iAmAClub"
            label="Je suis un club"
          />
        </v-chip>
        <v-chip
          color="with"
          class="ml-2"
        >
          <v-switch
            v-model="annualPlan"
            label="Je paye annuellement ?"
          />
        </v-chip>
      </v-sheet>

      <div class="text-center my-16">
        <v-btn
          x-large
          elevation="0"
          dark
          color="deep-purple accent-4"
          to="/gyms/starter"
        >
          Créer le topo de ma salle <span class="d-none d-lg-inline ml-1">maintenant</span>&nbsp;!
        </v-btn>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import {
  mdiEmail,
  mdiCheckboxOutline,
  mdiHeartHalfFull,
  mdiRefreshCircle,
  mdiTerrain,
  mdiCheckBold,
  mdiCheckAll,
  mdiCalendarCheck,
  mdiWaves,
  mdiShape,
  mdiFormatListNumbered,
  mdiCounter,
  mdiSetMerge,
  mdiTrophy,
  mdiCircleBoxOutline,
  mdiDice5,
  mdiAccountMultiple
} from '@mdi/js'
import Gym from '~/models/Gym'
import GymSmallCard from '~/components/gyms/GymSmallCard'
import AppFooter from '~/components/layouts/AppFooter'
import CommonApi from '~/services/oblyk-api/CommonApi'

export default {
  components: { AppFooter, GymSmallCard },

  data () {
    return {
      loadingGyms: true,
      intersectGyms: false,
      gyms: [],
      iAmAClub: false,
      annualPlan: false,
      gymLimit: 6,

      mdiEmail,
      mdiCheckboxOutline,
      mdiHeartHalfFull,
      mdiRefreshCircle,
      mdiTerrain,
      mdiCheckBold,
      mdiCheckAll,
      mdiCalendarCheck,
      mdiWaves,
      mdiShape,
      mdiFormatListNumbered,
      mdiCounter,
      mdiSetMerge,
      mdiTrophy,
      mdiCircleBoxOutline,
      mdiDice5,
      mdiAccountMultiple
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Créer le topo indoor de votre salle d'escalade",
        metaDescription: "Organisez votre salle d'escalade en espace et secteur, permettez à vos grimpeurs et grimpeuses de noter leur croix, supervisez vos ouvertures, et pleins d'autres fonctionnalités"
      },
      en: {
        metaTitle: 'Create the indoor guidebook of your climbing gym',
        metaDescription: 'Organize your climbing gym in space and sector, allow your climbers to rate their ascents, supervise your openings, and many other features'
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
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/indoor/og-indoor-presentation-banner.webp` }
      ]
    }
  },

  computed: {
    price () {
      if (this.iAmAClub && this.annualPlan) {
        return 7.5
      } else if (this.iAmAClub && !this.annualPlan) {
        return 9
      } else if (!this.iAmAClub && this.annualPlan) {
        return 30
      } else {
        return 35
      }
    },

    limitedGyms () {
      if (this.gymLimit === null) {
        return this.gyms
      } else {
        return this.gyms.slice(0, this.gymLimit)
      }
    }
  },

  methods: {
    onIntersectGyms (entries, observer) {
      if (!this.intersectGyms && entries[0].isIntersecting) {
        this.getExhibitionGyms()
        this.intersectGyms = true
      }
    },

    getExhibitionGyms () {
      this.loadingGyms = true

      new CommonApi(this.$axios, this.$auth)
        .activeGyms()
        .then((resp) => {
          for (const gym of resp.data) {
            this.gyms.push(new Gym({ attributes: gym }))
          }
        })
        .finally(() => {
          this.loadingGyms = false
        })
    }
  }
}
</script>

<style lang="scss">
.indoor-presentation {
  .introduction-text {
    font-size: 1.2em;
  }
  .presentation-box-title {
    font-size: 1.5em;
    font-weight: 500;
    span {
      font-weight: 800;
    }
  }
  .plan-box--free, .plan-box--full-package {
    transition: transform 0.5s;
    &:hover {
      transform: scale(108%);
    }
  }
  .plan-box--full-package {
    border-style: solid;
    border-width: 3px;
    border-color: rgba(255,204,0,1);
  }
}
</style>
