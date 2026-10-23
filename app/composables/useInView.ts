import type { ShallowRef } from 'vue'

// Passe à true une seule fois, quand l'élément approche de l'écran
export function useInView(el: Readonly<ShallowRef<HTMLElement | null>>, rootMargin = '300px') {
  const inView = ref(false)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      inView.value = true
      observer?.disconnect()
    }, { rootMargin })
    observer.observe(el.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return inView
}
