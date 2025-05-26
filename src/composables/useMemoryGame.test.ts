import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMemoryGame } from './useMemoryGame'
import { ICONS } from '@/constants/icons'
import { nextTick } from 'vue'

describe('useMemoryGame composable', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('должен инициализировать карточки правильно', async () => {
    const game = useMemoryGame()

    vi.runAllTimers()
    await nextTick()

    expect(game.cards.value.length).toBe(ICONS.length * 2)
    expect(game.openedCards.value.size).toBe(0)
  })

  it('должен открывать карту, если это разрешено', async () => {
    const game = useMemoryGame()
    vi.runAllTimers()
    await nextTick()

    game.openCard(0)
    expect(game.openedCards.value.has(0)).toBe(true)
  })

  it('не должен открывать уже открытую или подобранную карту', async () => {
    const game = useMemoryGame()
    vi.runAllTimers()
    await nextTick()

    game.openedCards.value.add(0)
    game.openCard(0)
    expect(game.openedCards.value.size).toBe(1)

    game.matchedCards.value.add(1)
    game.openCard(1)
    expect(game.openedCards.value.has(1)).toBe(false)
  })

  it('не совпадающие карты закрываются и шаг увеличивается', async () => {
    const game = useMemoryGame()

    vi.runAllTimers() // таймер из resetGame
    await nextTick()

    game.cards.value = [{ name: 'A' }, { name: 'B' }] as any

    game.openCard(0)
    game.openCard(1)

    // 💡 Даем Vue время на реактивность и срабатывание watch
    await nextTick()
    await nextTick()

    // 📌 Теперь точно сработал watch и создал setTimeout
    vi.runAllTimers() // запускаем таймер из watch
    await nextTick()
    await nextTick()

    expect(game.openedCards.value.size).toBe(0)
    expect(game.moves.value).toBe(1)
  })

  it('распознаёт совпадение правильно', async () => {
    const game = useMemoryGame()
    vi.runAllTimers()
    await nextTick()

    game.cards.value = [{ name: 'X' }, { name: 'X' }, { name: 'Y' }] as any

    game.openedCards.value.add(0)
    game.openedCards.value.add(1)
    ;(game as any).checkMatch()

    expect(game.matchedCards.value.has(0)).toBe(true)
    expect(game.matchedCards.value.has(1)).toBe(true)
  })

  it('определяет победу, если все пары подобраны', async () => {
    const game = useMemoryGame()
    vi.runAllTimers()
    await nextTick()

    for (let i = 0; i < ICONS.length * 2; i++) {
      game.matchedCards.value.add(i)
    }

    expect(game.isGameWon.value).toBe(true)
  })
})
