import Input from "../src/input/Input"
import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";

test('Input', () => {
    const wrapper = mount(Input)
    expect(wrapper.attributes('class')).toBe('op80 text-lg fw300 m1')
})