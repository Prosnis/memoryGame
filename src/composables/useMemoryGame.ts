import { ref, computed, watch } from 'vue'
import type { Card } from '@/types/cards'
import { shuffleCards } from '@/utils/shuffleCards'
import { ICONS } from '@/constants/icons'
import { CLOSE_TIMEOUT } from '@/constants/timeouts'
import { CARD_STATUS } from '@/types/cardStatuses'
import type { CardStatus } from '@/types/cardStatuses'

export function useMemoryGame() {
  const cards = ref<Card[]>([])
  const moves = ref(0)
  const totalPairs = ICONS.length
  const openedCards = ref(new Set<number>())
  const matchedCards = ref(new Set<number>())
  const matches = computed(() => matchedCards.value.size / 2)
  const isGameWon = computed(() => matches.value === totalPairs)
  const hasTwoCardsOpened = computed(() => openedCards.value.size === 2)

  const resetGame = () => {
    moves.value = 0
    matchedCards.value.clear()
    openedCards.value.clear()
    setTimeout(() => {
      cards.value = shuffleCards([...ICONS, ...ICONS])
    }, 300)
  }

  const openCard = (index: number) => {
    if (
      openedCards.value.has(index) ||
      matchedCards.value.has(index) ||
      openedCards.value.size >= 2
    ) {
      return
    }
    openedCards.value.add(index)
  }

  const getStatus = (index: number): CardStatus => {
    if (openedCards.value.has(index)) {
      return CARD_STATUS.OPENED
    }
    if (matchedCards.value.has(index)) {
      return CARD_STATUS.MATCHED
    }
    return CARD_STATUS.CLOSED
  }

  const checkMatch = () => {
    const [firstIndex, secondIndex] = [...openedCards.value.values()]
    if (cards.value[firstIndex].name === cards.value[secondIndex].name) {
      matchedCards.value.add(firstIndex)
      matchedCards.value.add(secondIndex)
    }
  }

  watch(hasTwoCardsOpened, (areTwoCardsOpened) => {
    if (!areTwoCardsOpened) return
    checkMatch()
    setTimeout(() => {
      openedCards.value.clear()
      moves.value++
    }, CLOSE_TIMEOUT)
  })

  resetGame()

  return {
    cards,
    moves,
    isGameWon,
    getStatus,
    openCard,
    resetGame,
    totalPairs,
    matches,
    hasTwoCardsOpened
  }
}
