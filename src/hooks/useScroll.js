import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'

export default function useScroll(elRef) {
  let el = window

  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const clientHeight = ref(0)
  const isReachBottom = ref(false)

  // 节流
  const scrollListenerHandler = throttle(() => {
    if(el === window) {
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
      clientHeight.value = document.documentElement.clientHeight
    } else {
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
      clientHeight.value = el.clientHeight
    }
    if(clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log('滚动到底部了')
      isReachBottom.value = true
    }
  }, 100)
  
  onMounted(() => {
    if(elRef) {
      el = elRef.value
    }
    el.addEventListener("scroll", scrollListenerHandler)
  })
  
  
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return {isReachBottom, scrollTop, scrollHeight, clientHeight}
}