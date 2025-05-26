<script setup lang="ts">
import type { CardStatus } from '@/types/cardStatuses'
import { CARD_STATUS } from '@/types/cardStatuses'

defineProps<{
  image: string
  status: CardStatus
  disabled?: boolean
}>()
</script>

<template>
  <div
    class="card"
    :class="{
      flipped: status === CARD_STATUS.OPENED || status === CARD_STATUS.MATCHED,
      matched: status === CARD_STATUS.MATCHED,
      disabled,
    }"
  >
    <div class="card-inner">
      <div class="card-face card-back"></div>
      <div class="card-face card-front">
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 120px;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-back {
  background-color: #f7a3eb;
  border: 2px solid #f7a3eb;
}

.card-front {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  transform: rotateY(180deg);
}

.card-front img {
  width: 60%;
  height: 60%;
  object-fit: contain;
}

.card.matched .card-front {
  background-color: #e6ffe6;
  border-color: #2ecc71;
}

.card.disabled {
  pointer-events: none;
}
</style>
