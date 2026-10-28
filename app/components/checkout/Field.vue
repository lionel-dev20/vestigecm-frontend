<script setup lang="ts">
// Les attributs (autocomplete, inputmode, type…) passent directement à l'<input>
defineOptions({ inheritAttrs: false })
defineProps<{ id: string; label: string; error?: string; hint?: string; prefix?: string }>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <div>
    <label :for="id" class="mb-1.5 block font-semibold text-[#222]">{{ label }}</label>
    <div
      class="flex h-14 items-center overflow-hidden rounded-xl border bg-white transition-colors duration-150 focus-within:ring-2"
      :class="error ? 'border-sale focus-within:ring-sale/20' : 'border-ink/20 focus-within:border-ink focus-within:ring-ink/10'"
    >
      <span v-if="prefix" class="flex h-full items-center border-r border-ink/10 bg-panel px-3 font-semibold text-[#444]">{{ prefix }}</span>
      <!-- text-base (16px) : évite le zoom automatique sur iPhone -->
      <input
        :id="id"
        v-model="model"
        v-bind="$attrs"
        class="h-full min-w-0 flex-1 px-4 text-base text-[#222] outline-none placeholder:text-[#999]"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : hint ? `${id}-hint` : undefined"
      >
    </div>
    <p v-if="error" :id="`${id}-error`" class="mt-1.5 flex items-center gap-1.5 text-sm text-sale">
      <UIcon name="i-lucide-circle-alert" class="size-4 shrink-0" />
      {{ error }}
    </p>
    <p v-else-if="hint" :id="`${id}-hint`" class="mt-1.5 text-sm text-[#666]">{{ hint }}</p>
  </div>
</template>
