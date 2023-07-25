import { defineComponent, PropType, ref } from 'vue';
import 'uno.css';

export type ISize = 'small' | 'medium' | 'large';
export type IColor = 'black' | 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
export const props = {
	// 新增
	size: {
		type: String as PropType<ISize>,
		default: 'medium'
	},

	color: {
		type: String as PropType<IColor>,
		default: 'blue'
	},

	round: {
		type: Boolean,
		default: false
	},

	plain: {
		type: Boolean,
		default: false
	},

	icon: {
		type: String,
		default: ''
	},
	// 新增
	disabled: {
		type: Boolean,
		default: false
	}
};

export default defineComponent({
	name: 'CButton',
	props,
	setup(props, { slots }) {
		const size = {
			small: {
				x: '2',
				y: '1',
				text: 'sm'
			},
			medium: {
				x: '3',
				y: '1.5',
				text: 'base'
			},
			large: {
				x: '4',
				y: '2',
				text: 'lg'
			}
		};

		return () => (
			<button
				disabled={props.disabled}
				onClick={() => {
					if (!props.disabled) {
						// your code
					}
				}}
				class={`
          py-${size[props.size].y}
          px-${size[props.size].x}
          ${props.round ? 'rounded-full' : 'rounded-lg'}
          bg-${props.color}-${props.plain ? '100' : '500'}
          hover:bg-${props.color}-400
          border-${props.color}-${props.plain ? '500' : '500'}
          cursor-pointer
          border-solid
          text-${props.plain ? props.color + '-500' : 'white'}
          text-${size[props.size].text}
          hover:text-white
          transition duration-300 ease-in-out transform hover:scale-105
          mx-1
          ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}
          `}
			>
				{props.icon !== '' ? <i class={`i-ic-baseline-${props.icon} p-3`} /> : ''}
				{slots.default ? slots.default() : ''}
			</button>
		);
	}
});
