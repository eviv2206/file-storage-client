import React, {useState} from "react";
import axios from "axios";
import {useToasters} from "../../../../common/ui/contexts/ToastersContext";
import s from './Files.module.scss';

const INPUT_FILE = 'Выберите файл:';
const FILE_SERVER = 'Путь:';
const NEW_PATH = 'Новый путь файла:';
const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';
const GET_FILES = 'GET ALL FILES';
const HEAD = 'HEAD';
const DELETE = 'DELETE';
const COPY = 'COPY';
const MOVE = 'MOVE';
const IS_OPEN_TO_EVERYONE = 'Публичный файл:';
const CHOOSE_METHOD = 'Выберите действие:';
const SUMBIT = 'Отправить';

const Files = () => {
    const [file, setFile] = useState(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [get, setGet] = useState(false);
    const [post, setPost] = useState(false);
    const [put, setPut] = useState(false);
    const [allFiles, setAllFiles] = useState(false);
    const [deleteFile, setDeleteFile] = useState(false);
    const [move, setMove] = useState(false);
    const [copy, setCopy] = useState(false);
    const [head, setHead] = useState(false);
    const [response, setResponse] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const {showToasterError, showToasterSuccess} = useToasters();

    const handlePostClick = () => {
        if (!file) {
            showToasterError('Файл не выбран');
        } else {
            axios.post('http://localhost:8080/api/v1/file/add', {
                file: file,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('Authorization')
                },
                params: {
                    filePath: from,
                    isOpenToEveryOne: isOpen,
                }
            })
                .then((r) => {
                    setResponse(r.data);
                })
                .catch((e) => {
                    showToasterError(e);
                })
        }
    }

    const handlePutClick = () => {
        if (!file) {
            showToasterError('Файл не выбран');
        } else {
            axios.put('http://localhost:8080/api/v1/file/put', {
                file: file,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('Authorization')
                },
                params: {
                    path: from,
                    isOpenToEveryOne: isOpen,
                }
            })
                .then((r) => {
                    setResponse(r.data);
                })
                .catch((e) => {
                    debugger
                    showToasterError(e.response.data.error);
                })
        }
    }

    const handleGetFilesClick = () => {
        axios.get('http://localhost:8080/api/v1/file/get-all', {
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then((r) => {
                setResponse(r.data);
            })
            .catch((e) => {
                showToasterError(e.response.data.message);
            })
    }

    const handleMoveClick = () => {
        axios.request({
            method: 'MOVE',
            url: 'http://localhost:8080/api/v1/file/move',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization')
            },
            params: {
                path: from,
                newPath: to
            }
        })
            .then((r) => {
                setResponse(r.data);
            })
            .catch((e) => {
                showToasterError(e.response.data.error);
            })
    }

    const handleCopyClick = () => {
        axios.request({
            method: 'COPY',
            url: 'http://localhost:8080/api/v1/file/copy',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('Authorization')
            },
            params: {
                path: from,
                newPath: to
            }
        })
            .then((r) => {
                setResponse(r.data);
            })
            .catch((e) => {
                showToasterError(e.response.data.error);
            })
    }

    const handleDeleteClick = () => {
        if (!from) {
            showToasterError('Путь пустой');
        } else {
            axios.delete('http://localhost:8080/api/v1/file/delete', {
                headers: {
                    'Authorization': localStorage.getItem('Authorization')
                },
                params: {
                    path: from,
                }
            })
                .then((r) => {
                    setResponse(r.data);
                })
                .catch((e) => {
                    showToasterError(e.message);
                })
        }
    }

    const handleInfoClick = () => {
        if (!from) {
            showToasterError('Путь пустой');
        } else {
            axios.get('http://localhost:8080/api/v1/file/info', {
                headers: {
                    'Authorization': localStorage.getItem('Authorization'),
                },
                params: {
                    path: from,
                }
            })
                .then((r) => {
                    setResponse(r.data);
                })
        }
    }


    const getFileClick = () => {
        if (!from) {
            showToasterError('Путь пустой');
        } else {
            axios.get('http://localhost:8080/api/v1/file/get', {
                headers: {
                    'Authorization': localStorage.getItem('Authorization'),
                    'Content-Type': 'application/octet-stream',
                },
                params: {
                    path: from,
                },
                responseType: 'blob',
            })
                .then(r => {
                    const downloadedFilename = from.split('/').pop();
                    const url = window.URL.createObjectURL(new Blob([r.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', downloadedFilename);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                })
                .catch((e) => {
                    showToasterError(e.message);
                })
        }
    }

    const handleFileInput = (event) => {
        console.log(event);
        setFile(event.target.files[0]);
    }

    const handleFromInput = (event) => {
        setFrom(event.target.value);
    }

    const handleToInput = (event) => {
        setTo(event.target.value);
    }

    const handleCheckBox = (event) => {
        setIsOpen(event.target.checked);
    }

    const reset = () => {
        setGet(false);
        setPost(false);
        setPut(false);
        setAllFiles(false);
        setDeleteFile(false);
        setMove(false);
        setCopy(false);
        setHead(false);
    }

    const handleGet = () => {
        reset();
        setGet(true);
    }

    const handlePost = () => {
        reset();
        setPost(true);
    }

    const handlePut = () => {
        reset();
        setPut(true);
    }

    const handleAllFiles = () => {
        reset();
        setAllFiles(true);
    }

    const handleDelete = () => {
        reset();
        setDeleteFile(true);
    }

    const handleMove = () => {
        reset();
        setMove(true);
    }

    const handleCopy = () => {
        reset();
        setCopy(true);
    }

    const handleHead = () => {
        reset();
        setHead(true);
    }

    const handleSubmit = () => {
        if (get) {
            getFileClick();
        }
        if (post) {
            handlePostClick();
        }
        if (put) {
            handlePutClick();
        }
        if (deleteFile) {
            handleDeleteClick();
        }
        if (copy) {
            handleCopyClick();
        }
        if (move) {
            handleMoveClick();
        }
        if (head) {
            handleInfoClick();
        }
        if (allFiles) {
            handleGetFilesClick();
        }
        setResponse('');
    }

    return (
        <div className={s.Files}>
            <div>
                <h2>{CHOOSE_METHOD}</h2>
            </div>

            <div className={s.Files_buttons}>
                <button onClick={handleGet}>{GET}</button>
                <button onClick={handlePost}>{POST}</button>
                <button onClick={handlePut}>{PUT}</button>
                <button onClick={handleDelete}>{DELETE}</button>
                <button onClick={handleMove}>{MOVE}</button>
                <button onClick={handleCopy}>{COPY}</button>
                <button onClick={handleHead}>{HEAD}</button>
                <button onClick={handleAllFiles}>{GET_FILES}</button>
            </div>
            <div className={s.Files_inputs}>
                {(post || put) && <div>
                    <label htmlFor='fileInput'>{INPUT_FILE}</label>
                    <input type='file' onChange={handleFileInput}/>
                </div>
                }
                {(get || post || put || deleteFile || move || copy || head) && <div>
                    <label htmlFor='fromInput'>{FILE_SERVER}</label>
                    <input type='text' value={from} onChange={handleFromInput}/>
                </div>
                }
                {(move || copy) && <div>
                    <label htmlFor='toInput'>{NEW_PATH}</label>
                    <input type='text' value={to} onChange={handleToInput}/>
                </div>
                }
                {(post || put) && <div>
                    <label htmlFor='isOpenCheck'>{IS_OPEN_TO_EVERYONE}</label>
                    <input type='checkbox' value={isOpen} onChange={handleCheckBox}/>
                </div>
                }
                {(get || post || put || move || allFiles || copy || head || deleteFile) && <div>
                    <button onClick={handleSubmit}>{SUMBIT}</button>
                </div>
                }
            </div>
            {response && <h3>{'Response:'}</h3>}
            {response?.length ? Object.keys(response).map((key) => (
                <div className={s.Files_response_item}>
                    {Object.keys(response[key]).map(value => (
                        <div key={value}>
                            <p>{`${value}: ${response[key][value]}`}</p>
                        </div>
                    ))}
                </div>))
                : Object.keys(response).map((key) => (
                    <div key={key}>
                        <p>{`${key}: ${response[key]}`}</p>
                    </div>
                ))}

        </div>
    )
}

export default Files;