import CSwitch from '../src/switch/Switch'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe("CSwitch", () => {
    test("disabled state", () => {
        // 使用 shallowMount 方法挂载组件，并将 disabled prop 设置为 true
        const wrapper = shallowMount(CSwitch, {
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
        const wrapper = shallowMount(CSwitch, {
            propsData: {
                size: "large"
            }
        });

        // 断言组件的 size prop 是否为 "large"
        expect(wrapper.props().size).toBe("large");
    });
});



