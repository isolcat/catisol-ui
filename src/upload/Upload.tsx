import { defineComponent,ref } from "vue";
import "uno.css";

export default defineComponent({
    name: "CUpload",
    setup() {
        const fileInputRef = ref(null);
        const handleFileChange = (e) => {
            const files = e.target.files;
        }
        return () => (
            <div class="upload">
                <input type="file" ref={fileInputRef} onChange={handleFileChange} />
            </div>
        );
    }
});
