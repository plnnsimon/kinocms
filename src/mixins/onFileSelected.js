export default {
    methods: {
        onFileSelected(event, item, lang) {
            if (lang == 'ru') {
                const files = event.target.files;
                item.ruSelectedFile = files[0].name;
                if (item.ruSelectedFile.indexOf(".") <= 0) {
                    return alert("Please add a valid file");
                }
                const fileReader = new FileReader();
                fileReader.onload = function() {
                    item.ruImageUrl = fileReader.result;
                }
                fileReader.readAsDataURL(files[0]);
            } else if (lang == 'ua') {
                const files = event.target.files;
                item.uaSelectedFile = files[0].name;
                if (item.uaSelectedFile.indexOf(".") <= 0) {
                    return alert("Please add a valid file");
                }
                const fileReader = new FileReader();
                fileReader.onload = function() {
                    item.uaImageUrl = fileReader.result;
                };
                fileReader.readAsDataURL(files[0]);
            } else {
                const files = event.target.files;
                item.selectedFile = files[0].name;
                if (item.selectedFile.indexOf(".") <= 0) {
                    return alert("Please add a valid file");
                }
                const fileReader = new FileReader();
                fileReader.onload = function() {
                    item.imageUrl = fileReader.result;
                };
                fileReader.readAsDataURL(files[0]);
            }
        },
        removeImage(item) {
            if (this.lang == "ru" && item.ruImageUrl) {
                item.ruImageUrl = '';
            } else if (this.lang == "ua" && item.uaImageUrl) {
                item.uaImageUrl = '';
            } else {
                item.imageUrl = '';
            }
        },
    }
}