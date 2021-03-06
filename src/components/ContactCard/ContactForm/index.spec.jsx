import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import ContactForm from './index'
import { I18n } from 'cozy-ui/transpiled/react/I18n'

import langEn from '../../../locales/en.json'
import { johnDoeContact as contact } from '../../../helpers/testData'

const dictRequire = () => langEn

describe('ContactForm', () => {
  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <I18n lang="en" dictRequire={dictRequire}>
          <ContactForm onSubmit={() => {}} onCancel={() => {}} />
        </I18n>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should fill form with contact data', () => {
    const tree = renderer
      .create(
        <I18n lang="en" dictRequire={dictRequire}>
          <ContactForm
            contact={contact}
            onSubmit={() => {}}
            onCancel={() => {}}
          />
        </I18n>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should submit a well formatted contact', () => {
    const onSubmit = contact => {
      expect(contact).toMatchSnapshot()
    }

    const form = mount(
      <I18n lang="en" dictRequire={dictRequire}>
        <ContactForm onSubmit={onSubmit} onCancel={() => {}} />
      </I18n>
    )

    const fields = {
      givenName: 'Jean-Claude',
      familyName: 'Van Cozy',
      'phone[0].phone': '+33678987654',
      'email[0].email': 'jcvc@cozy.cloud',
      'address[0].address': '18 rue des fleurs, Pecado',
      cozy: 'https://jcvd.cozy.cloud',
      company: 'Cozy CLoud',
      birthday: '31/12/2015',
      note: 'Whatever.'
    }

    Object.keys(fields).forEach(fieldName => {
      const candidates = form.find(`Field[name='${fieldName}']`)
      const field = candidates.length === 1 ? candidates : candidates.first()
      field.simulate('change', { target: { value: fields[fieldName] } })
    })

    form.find('form').simulate('submit')
  })

  it('should submit empty fields', () => {
    const onSubmit = contact => {
      expect(contact).toMatchSnapshot()
    }

    const form = mount(
      <I18n lang="en" dictRequire={dictRequire}>
        <ContactForm onSubmit={onSubmit} onCancel={() => {}} />
      </I18n>
    )

    form.find('form').simulate('submit')
  })
})
