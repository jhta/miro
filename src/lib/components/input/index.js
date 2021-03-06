import { DEFAULT_PLACEHOLDER, kEYCODE_COMMA } from '../../constants'
import { keyPressedIsCommaOrEnter } from '../../utils'

/**
 * onkeyup event handler factory
 * @param {Function} cb callback to execute
 * @param {Function} reset callback to reset input value
 */
export function onKeyupFactory(cb, reset) {
  return event => {
    const {
      target: { value },
      keyCode,
    } = event
    if (!keyPressedIsCommaOrEnter(keyCode)) return

    const valueWithoutComma =
      keyCode === kEYCODE_COMMA ? value.slice(0, -1) : value

    event.preventDefault()
    event.stopPropagation()
    cb(valueWithoutComma)
    reset()
  }
}

/**
 * onpaste event handler factory
 * @param {Function} cb callback to execute
 * @param {Function} reset callback to reset input value
 */
export function onPasteFactory(cb, reset) {
  return event => {
    event.preventDefault()
    event.stopPropagation()

    const clipboardData = event.clipboardData || window.clipboardData
    const value = clipboardData.getData('text')
    cb(value)
    reset()
  }
}

/**
 * onpaste event handler factory
 * @param {Function} cb callback to execute
 * @param {Function} reset callback to reset input value
 */
export function onBlurFactory(cb, reset) {
  return event => {
    event.preventDefault()
    event.stopPropagation()

    const {
      target: { value },
    } = event

    cb(value)
    reset()
  }
}

/**
 *
 * @param {String} params.placeholder
 * @param {Object} events
 * @param {Function} events.keyup
 * @param {Function} events.paste
 * @return {HTMLDocument}
 */
function createInputElement(
  { placeholder = DEFAULT_PLACEHOLDER } = {},
  events = {}
) {
  const { keyup, paste, blur } = events
  const $input = document.createElement('input')
  $input.placeholder = placeholder
  $input['data-test'] = 'input'
  $input.id = 'input'
  $input.classList.add('email-input--input')

  const reset = () => {
    $input.value = ''
  }

  const onKeyup = onKeyupFactory(keyup, reset)
  $input.addEventListener('keyup', onKeyup)

  const onPaste = onPasteFactory(paste, reset)
  $input.addEventListener('paste', onPaste)

  const onBlur = onBlurFactory(blur, reset)
  $input.addEventListener('blur', onBlur)

  return $input
}

export default createInputElement
