import { ref, unref } from 'vue'

function unrefElement(elRef){
  const plain = unref(elRef)
  return plain?.$el ?? plain
}

const functionsMap = [
  [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    'fullscreenchange',
    'fullscreenerror',
  ],
  // New WebKit
  [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
  ],
  // Old WebKit
  [
    'webkitRequestFullScreen',
    'webkitCancelFullScreen',
    'webkitCurrentFullScreenElement',
    'webkitCancelFullScreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
  ],
  [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    'mozfullscreenchange',
    'mozfullscreenerror',
  ],
  [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    'MSFullscreenChange',
    'MSFullscreenError',
  ],
]

export function useFullscreen(target) {
  const isClient = typeof window !== 'undefined'
  const document = isClient ? window.document : undefined
  const targetRef = target || document?.querySelector('html')
  console.log('SDASDASD', target.value)
  const isFullscreen = ref(false)
  let isSupported = false

  let map = functionsMap[0]

  if (!document) {
    isSupported = false
  } else {
    for (const m of functionsMap) {
      if (m[1] in document) {
        map = m
        isSupported = true
        break
      }
    }
  }

  const [REQUEST, EXIT, ELEMENT, , EVENT] = map

  async function exit() {
    if (!isSupported) return
    if (document?.[ELEMENT]) await document[EXIT]()

    isFullscreen.value = false
  }

  async function enter() {
    if (!isSupported) return

    await exit()

    const target = unrefElement(targetRef)
    if (target) {
      await target[REQUEST]()
      isFullscreen.value = true
    }
  }

  async function toggle() {
    if (isFullscreen.value) await exit()
    else await enter()
  }

  if (document) {
    document.addEventListener(EVENT, () => {
      isFullscreen.value = !!document?.[ELEMENT]
    }, false)
  }

  return {
    isSupported,
    isFullscreen,
    enter,
    exit,
    toggle,
  }
}
