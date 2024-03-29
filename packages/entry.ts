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
import Textarea from './textarea';
import Upload from './upload';
import Select from './select';
import ScrollContent from './scrollcontent';
import Badge from './badge';
import Tabs from './tabs'
import Table from './table'
import Form from './form'
import FormItem from './formitem'
import Row from './row'
import Col from './col'


// 导出单独组件
export { MyButton, SFCButton, JSXButton, Input, Link, CheckBox, Avatar, Textarea, Upload, Select, ScrollContent, Badge, Tabs, Table, Form, FormItem, Row, Col };

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
		app.component(Textarea.name, Textarea);
		app.component(Upload.name, Upload);
		app.component(Select.name, Select);
		app.component(ScrollContent.name, ScrollContent);
		app.component(Badge.name, Badge)
		app.component(Tabs.name, Tabs)
		app.component(Table.name, Table)
		app.component(Form.name, Form)
		app.component(FormItem.name, FormItem)
		app.component(Col.name,Col)
		app.component(Row.name,Row)
	}
};
