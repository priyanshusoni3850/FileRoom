import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/RoomPage.css';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
    const { roomCode } = useParams();

    const [uploads, setUploads] = useState([]);
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');

    const fetchUploads = async (roomCode) => {
        try {
            console.log('Fetching uploads for roomCode:', roomCode);
            const response = await axios.get(`http://localhost:5000/api/rooms/${roomCode}/uploads`);
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
            await axios.post(`http://localhost:5000/api/rooms/${roomCode}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchUploads(roomCode);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const uploadText = async () => {
        try {
            await axios.post(`http://localhost:5000/api/rooms/${roomCode}/upload-text`, { text });
            fetchUploads(roomCode);
        } catch (error) {
            console.error('Error uploading text:', error);
        }
    };

    const downloadFile = async (filePath, fileName) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/rooms/download`, {
                params: { filePath },
                responseType: 'blob',
            });
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
        <div>
            <h2>Room: {roomCode}</h2>
            <div>
                <h3>File Upload</h3>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={uploadFile}>Upload File</button>
            </div>
            <div>
                <h3>Text Upload</h3>
                <textarea
                    rows="4"
                    cols="50"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button onClick={uploadText}>Upload Text</button>
            </div>
            <div>
                <h3>Uploaded Files and Text:</h3>
                <ul>
                    {uploads.map((upload, index) => (
                        <li key={index}>
                            {upload.isText ? (
                                <div>{upload.text}</div>
                            ) : (
                                <button
                                    className="link-button"
                                    onClick={() => downloadFile(upload.filePath, upload.fileName)}
                                >
                                    {upload.fileName}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RoomPage;
