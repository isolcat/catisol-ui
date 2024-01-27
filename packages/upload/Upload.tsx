import { defineComponent, ref } from 'vue';
import 'uno.css';
import './upload.css';

export default defineComponent({
	name: 'CUpload',
	setup() {
		const fileInputRef = ref(null);

		const handleUpload = () => {
			if (fileInputRef.value) {
				fileInputRef.value.click(); // 触发文件选择对话框
			}
		};

		const handleFileChange = () => {
			const file = fileInputRef.value.files[0];
		};

		return () => (
			<div class="upload">
				<label for="my-file" class="upload-label">
					上传文件
				</label>
				<input
					id="my-file"
					type="file"
					class="inputFile"
					ref={fileInputRef}
					style="display: none;"
					onChange={handleFileChange}
				/>
			</div>
		);
	}
});
