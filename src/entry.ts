import { App } from 'vue';
import MyButton from './button/Button';
import Input from './input';
import Link from './link';
import Title from './title';
import CheckBox from './checkbox';
import SFCButton from './SFCButton.vue';
import JSXButton from './JSXButton';
import Avatar from './avatar';
import Switch from './switch';
import Skeleton from './skeleton';
import Textarea from './textarea';

// 导出单独组件
export { MyButton, SFCButton, JSXButton, Input, Link, CheckBox, Avatar, Skeleton, Textarea };

// 编写一个插件，实现一个install方法

export default {
	install(app: App): void {
		app.component(MyButton.name, MyButton);
		app.component(SFCButton.name, SFCButton);
		app.component(JSXButton.name, JSXButton);
		app.component(Link.name, Link);
		app.component(Input.name, Input);
		app.component(Title.name, Title);
		app.component(CheckBox.name, CheckBox);
		app.component(Avatar.name, Avatar);
		app.component(Switch.name, Switch);
		app.component(Skeleton.name, Skeleton);
		app.component(Textarea.name, Textarea);
	}
};
