import { FilesCollection } from 'meteor/ostrio:files';

const Music = new FilesCollection({
    collectionName: 'Music',
    allowClientCode: true, // Disallow remove files from Client
    storagePath: '../../../../../public/',
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 20485760 && /mp3|waw|ogg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 20MB';
    }
});

export default Music;