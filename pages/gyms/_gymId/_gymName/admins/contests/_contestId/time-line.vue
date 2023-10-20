<template>
  <div class="mt-2">
    <spinner v-if="loadingTimeLine" />
    <v-timeline
      v-else
      dense
      clipped
    >
      <v-timeline-item
        v-for="(time, timeIndex) in timeLine"
        :key="`time-index-${timeIndex}`"
        small
      >
        <v-row>
          <v-col cols="auto">
            <p class="mb-0 font-weight-bold">
              Le {{ humanizeDate(time.start_date) }}
            </p>
            <p
              v-if="time.start_time"
              class="mb-0"
            >
              À {{ humanizeDate(time.start_time, 'TIME_SIMPLE').replace(':', 'h') }}
            </p>
          </v-col>
          <v-col>
            <v-sheet
              v-for="(event, eventIndex) in time.events"
              :key="`event-index-${eventIndex}`"
              class="px-4 py-3 rounded-sm"
            >
              <!-- Subscription start -->
              <div v-if="event.event_type === 'SubscriptionOpen'">
                <p class="mb-2 font-weight-bold">
                  <v-icon
                    left
                    class="vertical-align-top"
                  >
                    {{ mdiPen }}
                  </v-icon>
                  Ouverture des inscriptions
                </p>
                <p class="mb-0">
                  Fin des inscriptions le {{ humanizeDate(event.end_date) }}.
                </p>
                <p class="mb-2">
                  Vous pouvez partager le lien publique du contest à vos grimpeurs et grimpeuses.
                </p>
                <share-btn
                  title="Partager la page publique"
                  :url="contest.path"
                  :icon="false"
                />
                <v-btn
                  outlined
                  text
                  @click="editContestModal"
                >
                  {{ $t('actions.edit') }} l'ouverture des inscriptions
                </v-btn>
              </div>

              <!-- Contest start -->
              <div v-if="event.event_type === 'ContestStart'">
                <p class="font-weight-bold mb-2">
                  <v-icon
                    left
                    class="vertical-align-top"
                  >
                    {{ mdiDoorOpen }}
                  </v-icon>
                  Début du contest
                </p>
                <p class="mb-2">
                  Vous pouvez inscrire de nouveau participant·e manuellement depuis l'onglet 'Participant·e·s'.<br>
                  Sur ce même onglet vous pouvez chercher un·e participant·e pour vérifier ou modifier son inscription.
                </p>
                <v-btn
                  outlined
                  text
                  to="participants"
                >
                  <v-icon left>
                    {{ mdiAccountMultiple }}
                  </v-icon>
                  Participant·e·s
                </v-btn>
                <v-btn
                  outlined
                  text
                  @click="editContestModal"
                >
                  {{ $t('actions.edit') }} la date de début
                </v-btn>
              </div>

              <!-- Contest Step event -->
              <div v-if="event.event_type === 'ContestStep'">
                <p class="font-weight-bold mb-2">
                  <v-icon
                    left
                    class="vertical-align-top"
                  >
                    {{ mdiFormatListChecks }}
                  </v-icon>
                  {{ event.step.name }} {{ $t(`models.climbs.${event.stage.climbing_type}`).toLowerCase() }}
                </p>
                <p class="mb-0">
                  Catégorie(s) : {{ event.categories.map((category) => category.name).join(', ') }}
                  <v-chip small>
                    <gender-icon :gender="event.genre_type" />
                    {{ $t(`models.genres.${event.genre_type}`) }}
                  </v-chip>
                  <v-chip
                    v-if="event.wave"
                    small
                    class="font-weight-bold"
                  >
                    <v-icon
                      color="blue darken-2"
                      small
                      left
                    >
                      {{ mdiWaves }}
                    </v-icon>
                    {{ event.wave.name }}
                  </v-chip>
                </p>
                <p class="mb-0">
                  Fin <span v-if="event.end_date !== time.start_date">le {{ humanizeDate(event.end_date) }}</span> à {{ humanizeDate(event.end_time, 'TIME_SIMPLE').replace(':', 'h') }}.
                </p>
                <p v-if="event.step.self_reporting">
                  Les participants ont 20 minutes après la fin des {{ event.step.name }} pour renseigner leur performances avant la fermeture du formulaire.
                </p>
                <div
                  v-if="event.step.step_order > 1 || !event.step.self_reporting"
                  class="pt-2"
                >
                  <v-btn
                    v-if="event.step.step_order > 1"
                    outlined
                    text
                    to="results?subscribe_mode=true"
                  >
                    <v-icon left>
                      {{ mdiCheckboxMultipleOutline }}
                    </v-icon>
                    Gérer le passage aux {{ event.step.name }}
                  </v-btn>
                  <v-btn
                    v-if="!event.step.self_reporting"
                    outlined
                    text
                    to="results?show_self_reporting_alert=true"
                  >
                    <v-icon left>
                      {{ mdiScaleBalance }}
                    </v-icon>
                    Juger
                  </v-btn>
                </div>
              </div>

              <!-- Subscription start -->
              <div v-if="event.event_type === 'ContestEnd'">
                <p class="font-weight-bold mb-2">
                  <v-icon
                    left
                    class="vertical-align-top"
                  >
                    {{ mdiClose }}
                  </v-icon>
                  Fin du contest
                </p>
                <v-btn
                  outlined
                  text
                  :to="`/contests/${contest.gym_id}/${contest.id}/print-results`"
                  target="_blank"
                >
                  <v-icon left>
                    {{ mdiPrinter }}
                  </v-icon>
                  Imprimer les résultats
                </v-btn>
                <v-btn
                  outlined
                  text
                  @click="editContestModal"
                >
                  {{ $t('actions.edit') }} la fin du contest
                </v-btn>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import {
  mdiWaves,
  mdiPrinter,
  mdiCheckboxMultipleOutline,
  mdiScaleBalance,
  mdiAccountMultiple,
  mdiPen,
  mdiDoorOpen,
  mdiFormatListChecks,
  mdiClose
} from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import Spinner from '~/components/layouts/Spiner'
import ContestApi from '~/services/oblyk-api/ContestApi'
import GenderIcon from '~/components/ui/GenderIcon'
import ShareBtn from '~/components/ui/ShareBtn'

export default {
  components: { ShareBtn, GenderIcon, Spinner },
  meta: { orphanRoute: true },
  mixins: [DateHelpers],
  middleware: ['auth', 'gymAdmin'],

  props: {
    contest: {
      type: Object,
      required: true
    },
    editContestModal: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      loadingTimeLine: true,
      timeLine: null,

      mdiWaves,
      mdiPrinter,
      mdiCheckboxMultipleOutline,
      mdiScaleBalance,
      mdiAccountMultiple,
      mdiPen,
      mdiDoorOpen,
      mdiFormatListChecks,
      mdiClose
    }
  },

  mounted () {
    this.getTimeLine()
  },

  methods: {
    getTimeLine () {
      this.loadingTimeLine = true
      new ContestApi(this.$axios, this.$auth)
        .timeLine(
          this.$route.params.gymId,
          this.$route.params.contestId
        )
        .then((resp) => {
          this.timeLine = resp.data
        })
        .finally(() => {
          this.loadingTimeLine = false
        })
    }
  }
}
</script>
