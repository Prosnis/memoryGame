<script setup lang="ts">
import MemoryCard from '@/components/MemoryCard.vue'
import { useMemoryGame } from '@/composables/useMemoryGame'

const { cards, moves, isGameWon, getStatus, openCard, resetGame,matches,totalPairs,hasTwoCardsOpened } = useMemoryGame()
</script>

<template>
  <div id="app">
    <h1>Memory Game</h1>

    <div class="game-info">
      <div>Moves: {{ moves }}</div>
      <div>Matches: {{ matches }} / {{ totalPairs }}</div>
    </div>

    <div class="board">
      <MemoryCard v-for="(card, index) in cards" :key="index" :status="getStatus(index)" :disabled="hasTwoCardsOpened"
        :image="card.image" @click="openCard(index)" />
    </div>

    <button @click="resetGame">New Game</button>

    <div v-if="isGameWon" class="win-message">Congratulations! You won in {{ moves }} moves!</div>
  </div>
</template>

<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f7f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

#app {
  width: 100%;
  max-width: 800px;
  text-align: center;
}

h1 {
  color: #101e2b;
  margin-bottom: 20px;
}

.game-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.game-info div {
  font-size: 1.2rem;
  font-weight: bold;
  color: #34495e;
}

.board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  margin: 0 auto;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f7a3eb;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ad29b9;
}

.win-message {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #27ae60;
  font-weight: bold;
}

@media (max-width: 600px) {
  .board {
    grid-template-columns: repeat(3, 1fr);
  }

  .card {
    height: 100px;
  }
}
</style>
