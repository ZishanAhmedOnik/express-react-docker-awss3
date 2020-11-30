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
            // dispatch(loadingFinished())

            return files;
        })
        .then((files) => {
            axios.get('http://localhost:8080/aws/list_jobs')
                .then(response => {

                    console.log(files);

                    response.data.Jobs.forEach(job => {
                        console.log(job.Id);
                    })

                    // console.log(response.data);

                    dispatch(loadingFinished());
                })
                .catch(err => {
                    console.log(err);
                })
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
            let jobId = response.data.Job.Id;
            
            return jobId
        })
        .then(jobId => {
            console.log("job id insde another promise", jobId);

            return new Promise((res, rej) => {
                let interval = setInterval(() => {
                    axios.get('http://localhost:8080/aws/list_jobs')
                        .then(response => {
                            if(response.data.Jobs.length === 0) {
                                res(interval);
                            }
                        })
                        .catch(err => {
                            console.log(err);

                            clearInterval(interval);
                        })
                }, 1000);
            });
        })
        .then(interval => {
            clearInterval(interval);
            dispatch(loadingFinished());
        })
        .catch(err => {
            console.log(err.message);
            dispatch(loadingFinished());
        })
}