import CAvatar from '../src/avatar/Avatar'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('CAvatar', () => {
    test("mount @vue/test-utils", () => {
        const wrapper = shallowMount(CAvatar, {
            propsData: {
                src: 'https://pic1.zhimg.com/v2-f28fb6bc6f0fe48c8554689a32e9dc77_xl.jpg?source=32738c0c'
            }
        });

        expect(wrapper.find('img').attributes().src).toBe("https://pic1.zhimg.com/v2-f28fb6bc6f0fe48c8554689a32e9dc77_xl.jpg?source=32738c0c")
    })
});

describe("CAvatar", () => {
    test("shape prop", () => {
        const wrapper = shallowMount(CAvatar, {
            propsData: {
                src: 'https://pic1.zhimg.com/v2-f28fb6bc6f0fe48c8554689a32e9dc77_xl.jpg?source=32738c0c',
                shape: "circle"
            }
        });

        expect(wrapper.props().shape).toBe("circle");
    });
});

describe("CAvatar", () => {
    test("size prop", () => {
        const wrapper = shallowMount(CAvatar, {
            propsData: {
                src: 'https://pic1.zhimg.com/v2-f28fb6bc6f0fe48c8554689a32e9dc77_xl.jpg?source=32738c0c',
                size: "large"
            }
        });

        expect(wrapper.props().size).toBe("large");
    });
});
