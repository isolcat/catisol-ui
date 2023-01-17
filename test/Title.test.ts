import Title from '../src/title/Title'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe("Title", () => {
    test("render correctly", () => {
        const wrapper = shallowMount(Title);
        expect(wrapper.exists()).toBe(true);
    });
    //测试title默认的组件是否为medium
    test("default size is medium", () => {
        const wrapper = shallowMount(Title);
        expect(wrapper.props().size).toBe("medium");
    });
});
