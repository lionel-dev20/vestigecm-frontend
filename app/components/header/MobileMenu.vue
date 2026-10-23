<script setup lang="ts">
defineProps<{ tabs: NavLink[]; categories: NavLink[] }>()

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <USlideover v-model:open="open" side="left" title="Menu" class="lg:hidden">
    <template #body>
      <nav aria-label="Menu mobile" class="space-y-6 text-ink">
        <ul class="flex gap-2">
          <li v-for="tab in tabs" :key="tab.to">
            <NuxtLink :to="tab.to" class="block rounded-full border-2 border-ink/10 px-4 py-2 text-sm font-semibold uppercase">
              {{ tab.label }}
            </NuxtLink>
          </li>
        </ul>
        <ul class="divide-y divide-ink/10">
          <li v-for="link in categories" :key="link.to">
            <NuxtLink :to="link.to" class="flex items-center gap-2 py-3.5 font-semibold">
              <UIcon v-if="link.icon" :name="link.icon" class="size-5" />
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </template>
  </USlideover>
</template>
