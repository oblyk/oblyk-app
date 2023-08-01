<template>
  <div>
    <v-container class="indoor-presentation">
      <!-- Title and subtitle -->
      <v-img
        src="/images/indoor/indoor-presentation-banner.webp"
        alt="bandeau de présentation d'Oblyk indoor"
        height="300"
        class="rounded align-end text-center mt-4 mb-10"
      >
        <v-sheet class="d-inline-block px-4 px-lg-15 py-3 rounded mb-lg-5 elevation-8">
          <h1 class="text-center">
            Oblyk pour votre salle
          </h1>
          <p class="subtitle-2 mb-2 text-center">
            Créer <em>LE</em> topo de votre salle d'escalade
          </p>
        </v-sheet>
      </v-img>

      <div class="px-lg-15">
        <p class="text-center introduction-text">
          Créez le <strong class="primary--text">topo indoor</strong> de votre <strong class="primary--text">salle d'escalade</strong>. Gérez facilement la rotation de vos <strong class="primary--text">ouvertures</strong>. Connectez-vous à votre <strong class="primary--text">communauté de grimpeurs et grimpeuses</strong>. Aidez-les à progresser en leur permettant de <strong class="primary--text">noter leurs croix indoor</strong>.<br>
          Et plein d'autres fonctionnalités !
        </p>
      </div>

      <!-- Beta banner -->
      <v-sheet
        class="pa-4 mt-10 mb-10 beta-background"
        rounded
        dark
      >
        <h3 class="mb-3">
          <v-icon left>
            {{ mdiFlask }}
          </v-icon>
          Oblyk pour les salles est en version Beta
        </h3>
        <p class="font-weight-bold">
          <strong><u>Qu'est ce que ça signifie ?</u></strong><br>
          Toutes les fonctionnalités prévues ne sont pas encore présentes et vous pouvez tomber sur des bugs.
          Mais nous estimons que l'outil est suffisamment stable et fonctionnel pour être utilisé.
        </p>
        <p class="font-weight-bold">
          N'hésitez pas à nous remonter vos suggestions ou problèmes que vous rencontrez !
        </p>
      </v-sheet>

      <v-row class="my-15">
        <v-col cols="12" md="6" class="d-flex">
          <div class="px-5 align-self-center">
            <h3 class="mb-3 presentation-box-title">
              <span class="primary--text">Organisez votre topo</span> librement
            </h3>
            <p>
              Votre salle est unique, on vous donne les outils pour la représenter telle qu’elle est. Divisez votre salle en espaces et en secteurs logiques pour vous.
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
        <v-col
          cols="12"
          md="6"
          class="d-flex"
        >
          <div class="px-5 align-self-center">
            <h3 class="mb-3 presentation-box-title">
              Peut importe le type d'escalade ou vos niveaux de difficulté, <span class="primary--text">on s'adapte à votre salle</span>
            </h3>
            <p>
              Que vous soyez une salle de voie, de bloc, de pan, que vous utilisiez des étiquettes pour noter la difficulté, ou des cotations (ou les deux), vous pouvez créer le topo de votre salle sur Oblyk.
            </p>
            <p class="font-weight-bold mb-2">
              Oblyk indoor est conçu pour gérer :
            </p>
            <ul class="list-style-none">
              <li>
                <v-icon
                  left
                  color="primary"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                Les blocs, voies, pans et voies de vitesse
              </li>
              <li>
                <v-icon
                  left
                  color="primary"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                Les niveaux par couleur de prise ou d'étiquette
              </li>
              <li>
                <v-icon
                  left
                  color="primary"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                Les niveaux par cotation "standard" (5c, 6a+, etc.)
              </li>
              <li>
                <v-icon
                  left
                  color="primary"
                  class="mb-1"
                >
                  {{ mdiCheckboxOutline }}
                </v-icon>
                La difficulté par un système de points
              </li>
              <li>
                <v-icon
                  left
                  color="primary"
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
              <span class="primary--text">Supervisez vos ouvertures</span> en un clic
            </h3>
            <p>
              Faites un état des lieux de vos ouvertures : depuis quand elles sont montées, quelles sont les plus grimpées, comment est réparti le niveau d'escalade dans votre salle, etc.
            </p>
            <p>
              Besoin de plus de finesse ? Vous pouvez simplement filtrer vos statistiques pour analyser une partie de vos ouvertures selon des critères comme l'espace ou les ouvreurs / ouvreuses.
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
              <span class="primary--text">Un outil numérique</span> pour vos grimpeurs et grimpeuses
            </h3>
            <p>
              Créer le topo intérieur de votre salle d'escalade vous permet de mieux maîtriser vos ouvertures,
              mais aussi d'offrir à vos grimpeurs et grimpeuses un nouveau service numérique lié à votre salle.
            </p>
            <p class="font-weight-bold mb-2">
              Grâce à votre topo :
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
              Vous <span class="primary--text">imprimez des étiquettes</span> pour vos pieds de voie ? on vous mâche le travail
            </h3>
            <p>
              Sélectionnez un secteur, une journée d'ouverture ou des voies en particulier, cliquez sur <strong>"imprimer"</strong> ! Vos étiquettes sont prêtes à être posées au pied de leurs voies.
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
              <span class="primary--text">Organisez des contests</span> n'a jamais été aussi simple !
            </h3>
            <p>
              Organiser un contest via Oblyk vous permet de vous affranchir de l'inscription des participants et du dépouillement des résultats.
            </p>
            <p>
              Choisissez une période, une limite d'inscrits (si nécessaire), les blocs faisant partie du contest et le système de décompte des points que vous voulez utiliser. Oblyk s'occupe du reste.
            </p>
            <p class="font-weight-bold mt-5">
              <v-icon
                left
                color="blue"
              >
                {{ mdiFlask }}
              </v-icon>
              Les contests ne sont pas encore disponible
            </p>
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
            src="/svg/indoor/work-in-progress.svg"
            alt="Le développement est en cours"
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
              Nos reportings ne vous suffisent pas ? <span class="primary--text">Utilisez notre API en toute liberté</span>
            </h3>
            <p>
              Oblyk est entièrement conçu sur une API, l'application étant complètement décorrélée du serveur de données.<br>
              Si vous souhaitez consulter vos données dans un contexte que nous ne vous fournissons pas, nous pouvons vous donner accès à notre API REST pour que vous puissiez récupérer vos données d'ouverture brutes.
            </p>
            <div class="text-center">
              <v-btn
                dark
                large
                color="primary"
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
          <span class="primary--text">Ils/elles ont choisi Oblyk</span> pour gérer les ouvertures de voies dans leur salle !
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
        <div class="mt-2">
          <v-row
            v-if="!loadingGyms"
            justify="center"
          >
            <v-col
              v-for="(gym, gymIndex) in gyms"
              :key="`gym-index-${gymIndex}`"
              cols="12"
              md="6"
              lg="4"
            >
              <gym-small-card
                :gym="gym"
                small
                bordered
              />
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="mt-16 mb-7">
        <h3 class="text-center mb-3 presentation-box-title">
          <span class="primary--text">À chaque salle d’escalade</span> ses besoins !
        </h3>
      </div>

      <!-- Beta banner -->
      <v-sheet
        class="pa-4 mb-10 beta-background"
        rounded
        dark
      >
        <h3 class="mb-3">
          <v-icon left>
            {{ mdiFlask }}
          </v-icon>
          Tant qu’Oblyk indoor est en version beta, toutes les fonctionnalités sont gratuites !
        </h3>
        <p class="font-weight-bold">
          Les plans affichés ci-dessous sont une estimation des tarifs que nous prévoyons de mettre en place.<br>
          Il se peut que les prix ou les fonctionnalités proposées évoluent.
        </p>
        <p class="font-weight-bold">
          Si les fonctionnalités ou les prix évoluent en votre défaveur le jour de la finalisation d'Oblyk Indoor,
          nous vous offrirons une période de gratuité pour : <br>
          <strong>1)</strong> vous remercier d'avoir essayé le système ;<br>
          <strong>2)</strong> vous laisser le temps de décider d'adhérer ou non à un plan payant si vous utilisiez des fonctionnalités payantes.
        </p>
      </v-sheet>

      <v-row>
        <!-- Starter formule -->
        <v-col cols="12" md="6" lg="4">
          <v-card
            class="full-height d-flex flex-column plan-box--free"
          >
            <v-card-title class="border-bottom">
              Gratuit
            </v-card-title>
            <div class="pa-4 text-justify">
              Idéal pour commencer sans aucune contrainte financière.
              Créez votre topo, ayez une vision simplifiée de vos ouvertures et permettez à vos grimpeurs et grimpeuses de noter leurs croix.
            </div>
            <div class="px-4 pb-4">
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Créer des espaces et lignes en illimité
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Statistiques basiques
              </p>
            </div>
            <div class="text-right pb-4 pr-6 mt-auto">
              <strong class="text-h4">0€</strong>
              <p class="mb-0">
                <span class="text--disabled">alors lancez-vous !</span>
              </p>
            </div>
          </v-card>
        </v-col>

        <!-- Big gyms -->
        <v-col cols="12" md="6" lg="4">
          <v-card
            class="full-height d-flex flex-column plan-box--essential"
          >
            <v-card-title class="border-bottom">
              Essentiel
            </v-card-title>
            <div class="pa-4 text-justify">
              C'est le plan idéal si vous gérez une voire deux salles et que vous souhaitez avoir accès à la plupart des fonctionnalités qui vous concernent.
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
                Illustrez vos lignes avec des photos
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
                2 contests / an
              </p>
            </div>
            <div class="text-right pb-4 pr-6 mt-auto">
              <strong class="text-h4">{{ 18 / priceDiviser }}€</strong>
              <p class="mb-0">
                <span class="text--disabled">TTC, par mois et par salle</span>
              </p>
            </div>
          </v-card>
        </v-col>

        <!-- Big gyms -->
        <v-col cols="12" md="6" lg="4">
          <v-card
            class="full-height d-flex flex-column plan-box--group"
          >
            <v-card-title class="border-bottom">
              Groupe
            </v-card-title>
            <div class="pa-4 text-justify">
              Vous êtes un groupe de salles ? Vous avez un besoin de fonctionnalités avancées ? Ce plan est conçu pour vous.
            </div>
            <div class="px-4 pb-4">
              <p class="mb-4">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckAll }}
                </v-icon>
                Les fonctionnalités du plan <strong>'Essentiel'</strong>
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
                Gestion multi-salles
              </p>
              <p class="mb-1">
                <v-icon left class="mt-n1" color="primary">
                  {{ mdiCheckBold }}
                </v-icon>
                Accès à vos données par API
              </p>
            </div>
            <div class="text-right pb-4 pr-6 mt-auto">
              <strong class="text-h4">{{ 60 / priceDiviser }}€</strong>
              <p class="mb-0">
                <span class="text--disabled">TTC, par mois et par salle</span>
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-sheet rounded class="mt-4 pa-4">
        <span class="vertical-align-middle">
          <strong class="primary--text">Vous êtes un club ?</strong> Bénéficiez de <strong>-50%</strong> sur tous nos plans
        </span>
        <v-chip color="with" class="ml-2">
          <v-switch
            v-model="iAmAClub"
            label="Je suis un club"
          />
        </v-chip>
      </v-sheet>

      <div class="text-center my-16">
        <v-btn
          x-large
          color="primary"
          to="/gyms/starter"
        >
          Créer le topo de ma salle <span class="d-none d-lg-inline ml-1">maintenant</span> !
        </v-btn>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import {
  mdiFlask,
  mdiEmail,
  mdiCheckboxOutline,
  mdiHeartHalfFull,
  mdiRefreshCircle,
  mdiTerrain,
  mdiCheckBold,
  mdiCheckAll
} from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'
import Gym from '~/models/Gym'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import AppFooter from '~/components/layouts/AppFooter.vue'

export default {
  components: { AppFooter, GymSmallCard },

  data () {
    return {
      loadingGyms: true,
      intersectGyms: false,
      gyms: [],
      iAmAClub: false
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
    priceDiviser () {
      return this.iAmAClub ? 2 : 1
    }
  },

  created () {
    this.mdiFlask = mdiFlask
    this.mdiEmail = mdiEmail
    this.mdiCheckboxOutline = mdiCheckboxOutline
    this.mdiHeartHalfFull = mdiHeartHalfFull
    this.mdiRefreshCircle = mdiRefreshCircle
    this.mdiTerrain = mdiTerrain
    this.mdiCheckBold = mdiCheckBold
    this.mdiCheckAll = mdiCheckAll
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
      const exhibitionGyms = process.env.VUE_APP_EXHIBITION_GYM.split(',') || []

      if (exhibitionGyms.length < 1) { return }

      new GymApi(this.$axios, this.$auth)
        .all(exhibitionGyms)
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
  .plan-box--free, .plan-box--essential, .plan-box--group {
    transition: transform 0.5s;
    &:hover {
      transform: scale(108%);
    }
  }
  .plan-box--essential {
    border-style: solid;
    border-width: 3px;
    border-color: rgb(200, 200, 200);
  }
  .plan-box--group {
    border-style: solid;
    border-width: 3px;
    border-color: rgba(255,204,0,1);
  }
}
</style>
