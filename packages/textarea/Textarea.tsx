import { defineComponent, PropType, ref } from 'vue';
import 'uno.css';
import './textarea.css';

export const props = {
	disabled: {
		type: Boolean,
		default: false
	},
	placeholder: {
		type: String,
		default: ''
	},
	maxLength: {
		type: Number,
		default: Infinity
	}
};

export default defineComponent({
	name: 'CTextarea',
	props,
	setup(props, { slots }) {
		const textareaRef = ref(null);
		const isFocused = ref(false);

		const handleFocus = () => {
			isFocused.value = true;
		};

		const handleBlur = () => {
			isFocused.value = false;
		};

		const handleInput = () => {
			const textarea = textareaRef.value;
			let value = textarea.value;

			if (value.length > props.maxLength) {
				value = value.slice(0, props.maxLength);
				textarea.value = value;
			}
		};

		return () => (
			<div class="ctextarea">
				<textarea
					ref={textareaRef}
					class={{
						'w-full h-32 outline-none bg-gray-200 p-2 rounded-lg text-lg': true,
						'hover:bg-gray-300': !isFocused.value,
						'focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out':
							!props.disabled && !isFocused.value,
						'cursor-not-allowed': props.disabled // 添加禁止样式的类名
					}}
					style={{ resize: 'vertical' }}
					disabled={props.disabled}
					placeholder={props.placeholder}
					maxlength={props.maxLength}
					onInput={handleInput}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</div>
		);
	}
});
