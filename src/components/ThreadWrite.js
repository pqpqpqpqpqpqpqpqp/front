import { useState, useRef, useEffect } from "react";
import { HiPhotograph, HiEmojiHappy } from "react-icons/hi";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import 'css/thread_write.css';

const ThreadWrite = ({ onClose }) => {
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");
    const [img, setImg] = useState(null);
    const [preview, setPreview] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const textRef = useRef(null);
    const pickerRef = useRef(null);

    const handleWriteClose = (e) => {
        if (e.target.classList.contains('thread-write-modal-overlay')) {
            onClose();
        }
    };

    const checkTopic = (e) => {
        const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9\s]*$/;
        if (regex.test(e.target.value)) {
            setTopic(e.target.value);
        }
    }

    useEffect(() => {
        if (textRef.current) {
            textRef.current.style.height = "auto";
            textRef.current.style.height = textRef.current.scrollHeight + "px";
        }
    }, [content]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        } else if (!file.type.startsWith("image/")) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            return;
        } else if (file.size > 2 * 1024 * 1024) {
            alert("2MB 이하의 이미지만 업로드할 수 있습니다.");
            return;
        } else {
            setImg(file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const onEmojiClick = (emoji) => {
        const textarea = textRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = content.slice(0, start) + emoji.native + content.slice(end);
        setContent(newText);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        }
    }, [preview]);

    const postThread = () => {
        // 대충 나중에 여기서 서버로 요청넣는다는 말
        console.log("내용: ", content);
        const formData = new FormData();
        if (img) formData.append('img', img);
        console.log("주제: ", topic)
        onClose();
    }

    return (
        <div className="thread-write-modal-overlay" onMouseDown={handleWriteClose}>
            <div className="thread-write-box">
                <div className="thread-write-box-header">
                    <div className="thread-write-cancel" onClick={onClose}>취소</div>
                    <div className="thread-write-title">새로운 스레드</div>
                </div>
                <div className="thread-write-box-body">
                    <div className="thread-write-card">
                        <div className="thread-write-card-img"></div>
                        <div className="thread-write-card-main">
                            <div className="thread-write-card-top">
                                <div className="thread-write-card-user-name">requestfield&nbsp;&nbsp;&gt;&nbsp;&nbsp;</div>
                                <input className="thread-write-topic-add" placeholder="주제 추가" value={topic} maxLength={12} onChange={checkTopic} />
                            </div>
                            <div className="thread-write-content">
                                <textarea placeholder="새로운 소식이 있나요?" value={content}
                                    ref={textRef} maxLength={500} onChange={(e) => {
                                        setContent(e.target.value);
                                    }} />
                                {preview && (
                                    <div className="thread-image-preview">
                                        <img src={preview} alt="미리보기" style={{ maxWidth: '200px' }} />
                                        <button onClick={() => { setImg(null); setPreview(""); }}>X</button>
                                    </div>
                                )}
                            </div>
                            <div className="thread-write-attachment">
                                <label>
                                    <HiPhotograph title="사진 첨부" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                <label>
                                    <HiEmojiHappy title="이모지 추가" onClick={
                                        () => { setShowPicker((prev) => !prev) }} />
                                    {showPicker && (
                                        <div className="thread-write-emoji" ref={pickerRef}>
                                            <Picker data={data} onEmojiSelect={onEmojiClick} />
                                        </div>
                                    )}
                                </label>
                            </div>
                            <div className={`thread-write-post ${content.trim() ? "" : "disabled"}`}
                                onClick={(e) => { if (!content.trim()) return; postThread(); }}>게시</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreadWrite;