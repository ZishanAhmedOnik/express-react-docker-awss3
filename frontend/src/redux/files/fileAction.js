import axios from "axios";

import { FETCH_LIST_FILES, FILE_UPLOADED } from './fileType';

const fetchFilesSuccess = (files) => {
    return {
        type: FETCH_LIST_FILES,
        payload: files
    }
}

const fileUploaded = (file) => {
    return {
        type: FILE_UPLOADED,
        payload: file
    }
}

export const fetchFiles = () => (dispatch) => {
    axios.get('http://localhost:8080/aws/list')
        .then(response => {
            let files = response.data;

            dispatch(fetchFilesSuccess(files))
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const fileUpload = (file) => (dispatch) => {
    let formData = new FormData();

    formData.append("file", file);

    axios.post('http://localhost:8080/aws/upload', formData)
        .then(response => {
            dispatch(fileUploaded(response.data))
        })
        .catch(err => {
            console.log(err.message);
        })
}