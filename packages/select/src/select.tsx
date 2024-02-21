    import { defineComponent, ref, watch, Transition, onMounted, computed } from 'vue'
    import { selectProps as props, selectEmits as emits } from './props'
    // import { useClickOutside } from '../../_utils/useClickOutside'
    import { onClickOutside } from '@vueuse/core'
    import './select.css'

    export default defineComponent({
    name: 'CSelect',
    props,
    emits,
    setup(props, { emit }) {
        const selectValue = ref(props.modelValue)
        const filteredOptions = ref([])
        const selectOptionVisible = ref<boolean>(false)
        const selectOptionsRef = ref<HTMLElement>(null)

        const selectIsFocus = ref<boolean>(false)

        onMounted(() => {
        onClickOutside(selectOptionsRef.value, (event) => {
            const classList = (event.target as HTMLElement).classList
            if (
            !classList?.contains('CSelect__input') &&
            !classList.contains('ik-icon') &&
            !classList.contains('CSelect__inner')
            ) {
            selectOptionVisible.value = false
            }
        })
        })
        const onClickSelectItem = (item) => {
        // if (selectValue.value === item) return
        emit('update:modelValue', item)
        selectValue.value = item
        selectOptionVisible.value = false
        }
        const onClickSelct = () => {
        selectOptionVisible.value = true
        }
        watch(
        () => props.modelValue,
        (value) => emit('change', value)
        )
        const onInput = (e) => {
        if (typeof e.target.value === 'string' && e.target.value) {
            const ls = props.option.filter((item: string) => {
            return item.includes(e.target.value)
            })
            filteredOptions.value = ls || []
        } else {
            filteredOptions.value = props.option
        }
        }
        const onFocus = () => {
        selectIsFocus.value = true
        }
        const onBlur = () => {
        selectIsFocus.value = false
        }
        const selectOptions = computed<any[]>(() => {
        if (!filteredOptions.value.length) return props.option
        return filteredOptions.value
        })

        const selectComputedCls = computed(() => {
        return [
            'CSelect__inner',
            {
            'select--focus': selectIsFocus.value,
            },
        ]
        })
        return () => {
        const Content = (
            <div class="CSelect">
            <div class={selectComputedCls.value} onClick={onClickSelct}>
                <input
                placeholder="请选择"
                class="CSelect__input"
                value={selectValue.value}
                readonly={!props.filterOn}
                type="text"
                onInput={onInput}
                onFocus={onFocus}
                onBlur={onBlur}
                />
                <ik-icon class="CSelect--clear" name="arrow-right" size={18}></ik-icon>
            </div>

            <Transition name="slide-fade__select">
                <div v-show={selectOptionVisible.value} class="CSelect--options" ref={selectOptionsRef}>
                {selectOptions.value.map((item, index) => (
                    <div
                    class={{ 'CSelect--item': true, 'CSelect--item__active': item === props.modelValue }}
                    key={index}
                    onClick={() => onClickSelectItem(item)}
                    >
                    {item}
                    </div>
                ))}
                </div>
            </Transition>
            </div>
        )
        return Content
        }
    },
    })
