import Link from '../src/link/Link'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

//使用shallowMount()方法挂载组件，并使用expect断言方法来检验组件的渲染是否正确
describe('Link', () => {
    test("mount @vue/test-utils", () => {
        const wrapper = shallowMount(Link, {
            slots: {
                default: 'Link'
            }
        });

        //断言
        expect(wrapper.text()).toBe("Link")
    })
})

//对组件颜色进行测试，测试默认link颜色
describe('color', () => {
    test('default', () => {
        const wrapper = shallowMount(Link, {
            slots: {
                default: 'Link'
            }
        })
        expect(wrapper.classes().map(v => v.replace('\n', '')).includes('')).toBe(true)
    })
})