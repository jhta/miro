import { isElement, isValidEmail } from './utils'
import createInputElement from './input'
import createBlockEmail from './block-email'

export default function EmailInput($el, options) {
  if (typeof $el === 'undefined') throw new Error('Argument $el is required')
  if (!isElement($el)) throw new Error('Container $el is not a DOM element')
  this.emails = {}

  this.$input = createInputElement(options, {
    keyup: value => {
      this.addEmail(value)
    },
    paste: value => {
      console.log('on paste', value)
    },
  })
  $el.appendChild(this.$input)
  this.$el = $el
}

EmailInput.prototype.getElement = function() {
  return this.$el
}

EmailInput.prototype.addEmail = function(email) {
  if (!email) return

  const emailObj = { email, valid: isValidEmail(email) }
  this.emails[email] = emailObj
  this.insertBlockEmail(emailObj)
}

EmailInput.prototype.insertBlockEmail = function({ email, valid }) {
  const $blockEmail = createBlockEmail({ email, valid })
  this.$el.appendChild($blockEmail)
}
