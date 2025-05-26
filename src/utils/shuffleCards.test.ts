import {describe, it, expect} from 'vitest'
import { shuffleCards } from './shuffleCards'
import type { Card } from '@/types/cards'


const mockCards: Card[] = [
  { name: 'apple', image: 'apple.png' },
  { name: 'banana', image: 'banana.png' },
  { name: 'cherry', image: 'cherry.png' },
]


describe('shuffleCards', ()=>{

    it('returns a new array', ()=>{
        const RESULT = shuffleCards(mockCards)
        expect(RESULT).not.toBe(mockCards)
    })

    it('containts the same elements', ()=>{
        const RESULT = shuffleCards(mockCards)
        expect(RESULT).toHaveLength(mockCards.length)
        expect(RESULT).toEqual(expect.arrayContaining(mockCards))
    })

    it('shuffles the array', ()=>{
        const FIRST = shuffleCards(mockCards)
        const SECOND = shuffleCards(mockCards)
        expect(FIRST).not.toEqual(SECOND)
    })
})