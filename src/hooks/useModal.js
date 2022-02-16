import { defineComponent, isVNode, render, createVNode, ref } from 'vue'
import FModal from '@/components/f-modal.vue'
import { isFunction } from '@/utils/util'

const Modal = defineComponent({
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { expose }) {
    // console.log('@@@@@', props.options.content, isVNode(props.options.content))

    const fmodalRef = ref()
    expose({
      fmodalRef
    })
    return () => (
      <FModal ref='fmodalRef' {...props.options.modalProps}>
        {{
          default: () =>
            props.options.content ? (
              // 这都行
              <props.options.content {...props.options?.contentProps} />
            ) : null,
        }}
      </FModal>
    )
  }
})

export const useModal = (options) => {
  let instance
  instance = createVNode(Modal, { options })
  render(instance, document.body)
  return instance.component.refs.fmodalRef
}
