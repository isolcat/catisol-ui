import CheckBox from '../src/checkbox/CheckBox'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('CheckBox', () => {
    test("mount @vue/test-utils", () => {
        const wrapper = shallowMount(CheckBox, {
            slots: {
                default: 'CheckBox'
            }
        });

        expect(wrapper.text()).toBe("CheckBox")
    })
})

describe("CheckBox", () => {
    test("disabled state", () => {
        // 使用 shallowMount 方法挂载组件，并将 disabled prop 设置为 true
        const wrapper = shallowMount(CheckBox, {
            propsData: {
                disabled: true
            }
        });

        // 断言组件是否被禁用
        expect(wrapper.vm.disabled).toBe(true);
    });
});

describe("CheckBox", () => {
    test("size", () => {
        // 使用 shallowMount 方法挂载组件，并将 size prop 设置为 "large"
        const wrapper = shallowMount(CheckBox, {
            propsData: {
                size: "large"
            }
        });

        // 断言组件的 size prop 是否为 "large"
        expect(wrapper.props().size).toBe("large");
    });
});



