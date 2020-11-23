import axios from "axios";
import { loadingStarted, loadingFinished } from '../loadingScreen/loadingScreenAction'

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
    dispatch(loadingStarted())

    axios.get('http://localhost:8080/aws/list')
        .then(response => {
            let files = response.data;

            dispatch(fetchFilesSuccess(files))
            dispatch(loadingFinished())
        })
        .catch(err => {
            console.log(err.message)
            dispatch(loadingFinished())
        })
}

export const fileUpload = (fileData) => (dispatch) => {
    let formData = new FormData();

    formData.append('file', fileData.fileToUpload);
    formData.append('contentName', fileData.contentName);
    formData.append('contentDescription', fileData.contentDescription);

    dispatch(loadingStarted())

    axios.post('http://localhost:8080/aws/upload', formData)
        .then(response => {
            dispatch(fileUploaded(response.data))
            dispatch(loadingFinished())
        })
        .catch(err => {
            console.log(err.message);
            dispatch(loadingFinished())
        })
}