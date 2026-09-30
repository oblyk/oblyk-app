<template>
  <v-sheet
    v-if="currentCrag.current_user.grade_protection.need_level_up"
    class="rounded pa-2 my-2 mx-4 missing-background inset-box-shadow"
  >
    <div class="px-2">
      <p class="mb-2 font-weight-medium">
        <v-icon left color="primary">
          {{ oblykLockGrade }}
        </v-icon>
        {{ $t('components.protectionGrade.title') }}
      </p>
      <p>
        {{ $t(`components.protectionGrade.level_${currentCrag.grade_protection_level}.explain`, { name: currentCrag.name }) }}
      </p>
    </div>

    <!-- Juste need account -->
    <div
      v-if="currentCrag.grade_protection_level === 1 || (currentCrag.grade_protection_level > 1 && !$auth.loggedIn) "
      class="rounded pa-2"
      style="background-color: rgba(49, 153, 78, 0.1)"
    >
      <div class="text-right">
        <v-btn
          elevation="0"
          text
          :to="`/sign-in?redirect_to=${$route.fullPath}&back_to=${$route.fullPath}`"
        >
          {{ $t('actions.signIn') }}
        </v-btn>
        <v-btn
          elevation="0"
          color="primary"
          :to="`/sign-up?redirect_to=${$route.fullPath}&back_to=${$route.fullPath}`"
        >
          {{ $t('actions.signUp') }}
        </v-btn>
      </div>
    </div>

    <!-- Need honour system -->
    <div
      v-if="currentCrag.grade_protection_level === 2 && $auth.loggedIn"
      class="rounded pa-2"
      style="background-color: rgba(49, 153, 78, 0.1)"
    >
      <v-checkbox v-model="honourCheckbox" hide-details class="mt-0">
        <template #label>
          <span v-html="$t('components.protectionGrade.level_2.label', { name: currentCrag.name })" />
        </template>
      </v-checkbox>
      <div class="text-right">
        <v-btn
          v-if="!successHonour"
          :to="`${currentCrag.app_path}/guide-books`"
          text
        >
          {{ $t('components.guideBookPaper.figures.seeGuides') }}
        </v-btn>
        <v-btn
          v-if="!successHonour"
          :disabled="!honourCheckbox"
          :loading="honourLoading"
          color="primary"
          @click="postHonour"
        >
          {{ $t('components.protectionGrade.level_2.action') }}
        </v-btn>
        <p
          v-if="successHonour"
          class="green--text text-center my-2"
        >
          {{ $t('components.protectionGrade.level_2.tanks') }}
        </p>
      </div>
    </div>

    <!-- Need "secret question" system -->
    <div
      v-if="currentCrag.grade_protection_level === 3 && $auth.loggedIn"
      class="rounded pa-2"
      style="background-color: rgba(49, 153, 78, 0.1)"
    >
      <v-checkbox
        v-model="iHaveGuideBooks"
        :label="$t('components.protectionGrade.level_3.label', { name: currentCrag.name})"
        :hide-details="iHaveGuideBooks"
        @click="getAvailableGuideBooks"
      />
      <v-slide-y-transition>
        <div v-if="iHaveGuideBooks" class="mt-2">
          <v-progress-circular
            v-if="loadingGuideBookPapers"
            indeterminate
          />

          <!-- Guide Books List -->
          <div v-if="guideBookPapers.length > 0 && question === null">
            <p class="font-weight-medium mb-2">
              {{ $t('components.protectionGrade.level_3.whichGuideBooks') }}
            </p>
            <div class="d-flex">
              <v-sheet
                v-for="(guideBookPaper, guideBookPaperIndex) in guideBookPapers"
                :key="`guide-book-paper-index-${guideBookPaperIndex}`"
                class="text-center activable-v-sheet rounded px-2 pt-2"
                @click="selectGuideBook(guideBookPaper.id)"
              >
                <v-img
                  :src="imageVariant(guideBookPaper.attachments.cover, { fit: 'scale-down', height: 720, width: 720 })"
                  contain
                  :height="130"
                  :max-width="170"
                />
                <p class="mt-1 mb-n1 font-weight-medium">
                  {{ guideBookPaper.name }}
                </p>
                <small>
                  {{ guideBookPaper.publication_year }}
                </small>
              </v-sheet>
            </div>
          </div>

          <!-- Question -->
          <v-slide-y-transition>
            <div v-if="question" class="mt-1">
              <guide-book-paper-small-card
                :guide-book-paper="selectedGuideBook"
                small
                :subscribable="false"
                :linkable="false"
              />
              <p class="font-weight-medium mt-3 mb-2">
                {{ question.question }}
              </p>
              <v-text-field
                v-model="answer"
                :label="$t('components.protectionGrade.level_3.myAnswer')"
                :hide-details="goodOrBadAnswer === null"
                :success="goodOrBadAnswer === 'goodAnswer'"
                :error="goodOrBadAnswer === 'badAnswer'"
                :error-messages="goodOrBadAnswer === 'badAnswer' ? $t('components.protectionGrade.level_3.badAnswer') : null"
                :messages="goodOrBadAnswer === 'goodAnswer' ? $t('components.protectionGrade.level_3.goodAnswer') : null"
                outlined
                @keydown="goodOrBadAnswer = null"
              />
              <div class="text-right mt-2">
                <v-btn
                  :disabled="answer === null || answer === ''"
                  color="primary"
                  :loading="secretQuestionLoading"
                  @click="postSecretQuestion"
                >
                  {{ $t('actions.reply') }}
                </v-btn>
              </div>
            </div>
          </v-slide-y-transition>
        </div>
      </v-slide-y-transition>
    </div>
  </v-sheet>
</template>
<script>
import { oblykLockGrade } from '~/assets/oblyk-icons'
import OblykApi from '~/services/oblyk-api/OblykApi'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import GuideBookPaperSmallCard from '~/components/guideBookPapers/GuideBookPaperSmallCard.vue'

export default {
  name: 'CragGradeProtectionActionRequired',
  components: { GuideBookPaperSmallCard },
  mixins: [ImageVariantHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    },
    getRoutesCallback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      loadingCrag: false,
      currentCrag: this.crag,

      honourCheckbox: false,
      honourLoading: false,
      successHonour: false,

      iHaveGuideBooks: false,
      loadingGuideBookPapers: false,
      guideBookPapers: [],
      selectedGuideBook: null,
      question: null,
      answer: null,
      secretQuestionLoading: false,
      goodOrBadAnswer: null,

      oblykLockGrade
    }
  },

  methods: {
    getCrag () {
      this.loadingCrag = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/public/crags/${this.currentCrag.id}`)
        .then((resp) => {
          this.currentCrag = resp.data
        })
        .finally(() => { this.loadingCrag = false })
    },

    postHonour () {
      this.honourLoading = true
      new OblykApi(this.$axios, this.$auth)
        .post(
          '/user_crag_declarations',
          { user_crag_declaration: { crag_id: this.currentCrag.id, declaration_system: 'honour' } }
        )
        .then(() => {
          this.successHonour = true
          setTimeout(() => {
            if (this.getRoutesCallback) {
              this.getCrag()
              this.getRoutesCallback()
            } else {
              window.location.reload()
            }
          }, 1000)
        })
        .finally(() => {
          this.honourLoading = false
        })
    },

    getAvailableGuideBooks () {
      if (this.guideBookPapers.length > 0) {
        return true
      }
      this.loadingGuideBookPapers = true
      new OblykApi(this.$axios, this.$auth)
        .get('/user_crag_declarations/available_guide_book_papers', { crag_id: this.currentCrag.id })
        .then((resp) => {
          this.guideBookPapers = resp.data
        })
        .finally(() => { this.loadingGuideBookPapers = false })
    },

    selectGuideBook (guideBookId) {
      if (this.selectedGuideBook?.id === guideBookId) {
        this.selectedGuideBook = null
        this.question = null
        return
      }
      for (const guideBookPaper of this.guideBookPapers) {
        if (guideBookPaper.id === guideBookId) {
          this.selectedGuideBook = guideBookPaper
          const rando = Math.floor(Math.random() * guideBookPaper.guide_book_paper_questions.length)
          this.question = guideBookPaper.guide_book_paper_questions[rando]
        }
      }
    },

    postSecretQuestion () {
      this.secretQuestionLoading = true
      new OblykApi(this.$axios, this.$auth)
        .post(
          '/user_crag_declarations',
          {
            user_crag_declaration: {
              question_id: this.question.id,
              answer: this.answer,
              declaration_system: 'guide_book_secret_question'
            }
          }
        )
        .then(() => {
          this.goodOrBadAnswer = 'goodAnswer'
          setTimeout(() => {
            if (this.getRoutesCallback) {
              this.getCrag()
              this.getRoutesCallback()
            } else {
              window.location.reload()
            }
          }, 1000)
        })
        .catch(() => {
          this.goodOrBadAnswer = 'badAnswer'
        })
        .finally(() => {
          this.secretQuestionLoading = false
        })
    }
  }
}
</script>
