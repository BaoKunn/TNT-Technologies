<template>
  <VaCard>
    <VaCardContent>
      <section>
        <header class="flex items-center justify-between">
          <div
            class="p-1 rounded"
            :style="{
              // backgroundColor: iconBackground,
              color: iconBackground,
              fontSize: '24px',
              fontWeight: '700',
            }"
          >
            <div class="">{{ value }}</div>
            <!-- <slot name="icon"></slot> -->
          </div>
        </header>
        <div>
          <p class="mb-2 text-lg font-semibold">{{ title }}</p>
          <!-- <p class="text-xs text-secondary">
            <span :class="changeClass">
              <template v-if="up">↑</template>
              <template v-else>↓</template>
              {{ changeText }}
            </span>
            since last month
          </p> -->
        </div>
      </section>
      <!-- <section>
        <p>{{ value }}</p>
        <p>{{ title }}</p>
      </section> -->
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { VaCard } from 'vuestic-ui'
defineProps<{
  title: string
  value: string | number
  changeText: string
  up: boolean
  iconBackground: string
  iconColor: string
}>()
</script>
