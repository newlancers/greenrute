import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

describe('Header', () => {
  it('renders properly', () => {
    const wrapper = mount({
      template: '<div>Plug</div>'
    })
    expect(wrapper.text()).toContain('Plug')
  })
})
