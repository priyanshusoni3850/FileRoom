//roompage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/RoomPage.css';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const RoomPage = () => {
    const { roomCode } = useParams();
    const [uploadProgress, setUploadProgress] = useState(0);

    const [uploads, setUploads] = useState([]);
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');

    const fetchUploads = async (roomCode) => {
        try {
            console.log('Fetching uploads for roomCode:', roomCode);
            const response = await axios.get(`https://fileroom.onrender.com/api/rooms/${roomCode}/uploads`);
            setUploads(response.data.uploads);
        } catch (error) {
            console.error('Error fetching uploads:', error);
        }
    };

    useEffect(() => {
        if (roomCode) {
            fetchUploads(roomCode);
        }
    }, [roomCode]);

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            await axios.post(`https://fileroom.onrender.com/api/rooms/${roomCode}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    // Update the uploadProgress state with the progress percentage
                    setUploadProgress(percentCompleted);
                },
            });
            // After upload is complete, you can clear the upload progress state.
            setUploadProgress(0);
            fetchUploads(roomCode);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const uploadText = async () => {
        try {
            await axios.post(`https://fileroom.onrender.com/api/rooms/${roomCode}/upload-text`, { text });
            fetchUploads(roomCode);
        } catch (error) {
            console.error('Error uploading text:', error);
        }
    };

    const downloadFile = async (filePath, fileName) => {
        try {
            const response = await axios.get(`https://fileroom.onrender.com/api/rooms/download`, {
                params: { filePath },
                responseType: 'blob',
            });

            console.log("response");
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Use the original fileName for download
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="room-page-container">
            <div className="left-panel">
                <h2>Room: {roomCode}</h2>
                <div>
                    <h3>File Upload</h3>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <button onClick={uploadFile}>Upload File</button>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
                                {uploadProgress}%
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <h3>Uploaded Files:</h3>
                    <ul>
                        {uploads.map((upload, index) => (
                            !upload.isText && (
                                <li key={index}>
                                    <button
                                        className="link-button"
                                        onClick={() => downloadFile(upload.filePath, upload.fileName)}
                                    >
                                        {upload.fileName}
                                    </button>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
            <div className="right-panel">
                <h3>Text Upload</h3>
                <textarea
                    rows="4"
                    cols="50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button onClick={uploadText}>Upload Text</button>
                <div>
                    <h3>Uploaded Text:</h3>
                    <ul>
                        {uploads.map((upload, index) => (
                            upload.isText && (
                                <li key={index}>
                                    <div>{upload.text}</div>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default RoomPage;
