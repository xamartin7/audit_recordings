import { createClient } from "@supabase/supabase-js";
import { useState, useRef, useEffect } from "react";
import { FaStop, FaVideo, FaCamera, FaTimes } from "react-icons/fa";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export function VideoRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<MediaDeviceInfo | null>(null);

    useEffect(() => {
        loadDevices();
    }, []);

    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: selectedDevice ? { deviceId: { exact: selectedDevice.deviceId } } : true,
                audio: true,
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsCameraOn(true);
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError('Failed to access camera: ' + err.message);
            } else {
                setError('Failed to access camera');
            }
        }
    }

    function stopCamera() {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setIsCameraOn(false);
        // Stop recording if camera is turned off
        if (isRecording) {
            stopRecording();
        }
    }

    async function startRecording() {
        if (!streamRef.current) {
            setError('Camera must be on to start recording');
            return;
        }
        
        try {
            mediaRecorderRef.current = new MediaRecorder(streamRef.current, {
                mimeType: 'video/webm',
            });
        
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };
        
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                storeVideo(blob);
                setRecordedChunks([]);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setError(null);
        } catch (err) {
            if (err instanceof Error) {
                setError('Failed to start recording: ' + err.message);
            } else {
                setError('Failed to start recording');
            }
        }
    }

    async function stopRecording() {
        setIsRecording(false);
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
    }

    async function storeVideo(video: Blob) {
        console.log('Storing video to supabase', video);
        const { data, error } = await supabase.storage.from('videos').upload('video.webm', video, {
            upsert: true,
        });
        if (error) {
            console.error('Error storing video:', error);
        } else {
            console.log('Video stored successfully:', data);
        }
    }

    async function loadDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            setVideoDevices(devices.filter(device => device.kind === 'videoinput'));
            setAudioDevices(devices.filter(device => device.kind === 'audioinput'));
            console.log('Devices:', devices);
        } catch (err) {
            console.error('Error enumerating devices:', err);
        }
    }

    return (
        <div>
            <h3>Grabación de video</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <video ref={videoRef} autoPlay className="w-full max-w-md mb-4 border border-gray-300 rounded-md" />
            <div className="flex gap-2 mb-4">
                <select onChange={(e) => setSelectedDevice(videoDevices.find(d => d.deviceId === e.target.value) || null)}>
                    {videoDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => setSelectedDevice(audioDevices.find(d => d.deviceId === e.target.value) || null)}>
                    {audioDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                            {device.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-2">
                {/* Camera control button */}
                {isCameraOn ? (
                    <button 
                        className="bg-gray-500 text-white p-2 rounded-md flex items-center gap-2" 
                        onClick={stopCamera}
                    >
                        <FaTimes />
                        <span>Apagar cámara</span>
                    </button>
                ) : (
                    <button 
                        className="bg-green-500 text-white p-2 rounded-md flex items-center gap-2" 
                        onClick={startCamera}
                    >
                        <FaCamera />
                        <span>Encender cámara</span>
                    </button>
                )}
                
                {/* Recording control button */}
                {isRecording ? (
                    <button 
                        className="bg-red-500 text-white p-2 rounded-md flex items-center gap-2" 
                        onClick={stopRecording}
                        disabled={!isCameraOn}
                    >
                        <FaStop />
                        <span>Detener grabación</span>
                    </button>
                ) : (
                    <button 
                        className="bg-blue-500 text-white p-2 rounded-md flex items-center gap-2" 
                        onClick={startRecording}
                        disabled={!isCameraOn}
                    >
                        <FaVideo />
                        <span>Iniciar grabación</span>
                    </button>
                )}
            </div>
        </div>
    )
}