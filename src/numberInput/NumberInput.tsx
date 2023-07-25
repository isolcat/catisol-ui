import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'CNumberInput',
	props: {
		modelValue: {
			type: Number,
			default: 0
		},
		min: {
			type: Number,
			default: -Infinity
		},
		max: {
			type: Number,
			default: Infinity
		},
		step: {
			type: Number,
			default: 1
		}
	},
	emits: [ 'update:modelValue' ],
	setup(props, { emit }) {
		const value = ref(props.modelValue);

		const handleInputChange = (event) => {
			const inputValue = Number(event.target.value);
			if (!isNaN(inputValue)) {
				value.value = inputValue;
				emit('update:modelValue', inputValue);
			}
		};

		const handleIncrease = () => {
			const newValue = value.value + props.step;
			if (newValue <= props.max) {
				value.value = newValue;
				emit('update:modelValue', newValue);
			}
		};

		const handleDecrease = () => {
			const newValue = value.value - props.step;
			if (newValue >= props.min) {
				value.value = newValue;
				emit('update:modelValue', newValue);
			}
		};

		return {
			value,
			handleInputChange,
			handleIncrease,
			handleDecrease
		};
	},
	template: `
    <div>
      <button @click="handleDecrease">-</button>
      <input type="number" :value="value" @input="handleInputChange" />
      <button @click="handleIncrease">+</button>
    </div>
  `
});
