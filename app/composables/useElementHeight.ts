import type { ShallowRef } from 'vue'

// Hauteur d'un élément, mise à jour à chaque redimensionnement (côté client)
export function useElementHeight(el: Readonly<ShallowRef<HTMLElement | null>>) {
  const height = ref<number>()
  let observer: ResizeObserver | undefined

  onMounted(() => {
    if (!el.value) return
    observer = new ResizeObserver(([entry]) => {
      height.value = entry?.borderBoxSize[0]?.blockSize
    })
    observer.observe(el.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return height
}
