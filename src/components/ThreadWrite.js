import { useState, useRef, useEffect } from "react";
import { HiPhotograph, HiEmojiHappy } from "react-icons/hi";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { toast } from "react-toastify";
import 'css/thread_write.css';
import { useAuth } from "context/AuthContext";
import { useWrite } from "context/WriteContext";

const ThreadWrite = ({ onClose, initialContent = "" }) => {
    const { userIdx } = useAuth();
    const { parentIdx } = useWrite();
    const [userProfile, setUserProfile] = useState({ userId: '', profileImage: '' });
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");
    const [img, setImg] = useState(null);
    const [preview, setPreview] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const textRef = useRef(null);
    const pickerRef = useRef(null);

    useEffect(() => {
        setContent(initialContent || "");
    }, [initialContent]);

    const handleWriteClose = (e) => {
        if (e.target.classList.contains('thread-write-modal-overlay')) {
            onClose();
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/thread/write/profile?userIdx=${userIdx}`);
                const data = await res.json();

                if (data.code === 200) {
                    const profile = data.data;
                    setUserProfile({
                        userId: profile.userId,
                        profileImage: profile.profileImage,
                    });
                } else {
                    toast.error(`사용자 정보 불러오기 실패: ${data.message}`);
                }
            } catch (err) {
                toast.error(`서버 오류: ${err.message}`);
            }
        };

        if (userIdx) {
            fetchUserProfile();
        }
    }, [userIdx]);

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
            toast.error("이미지 파일만 업로드할 수 있습니다.");
            return;
        } else if (file.size > 2 * 1024 * 1024) {
            toast.warn("2MB 이하의 이미지만 업로드할 수 있습니다.");
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

    const postThread = async () => {
        if (!content.trim()) return;

        const formData = new FormData();
        formData.append("userIdx", userIdx);
        formData.append("content", content);

        if (img) {
            formData.append("images", img);
        }

        if (topic.trim()) {
            formData.append("hashtagName", topic.trim());
        }

        if (parentIdx) {
            formData.append("parentIdx", parentIdx);
        }

        try {
            const response = await fetch("http://localhost:8080/api/thread/regist", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("스레드가 등록되었습니다.");
                onClose();
            } else {
                toast.error(`스레드 등록 실패: ${data.message}`);
            }
        } catch (err) {
            toast.error(`서버 에러: ${err.message}`);
        }
    };

    return (
        <div className="thread-write-modal-overlay" onMouseDown={handleWriteClose}>
            <div className="thread-write-box">
                <div className="thread-write-box-header">
                    <div className="thread-write-cancel" onClick={onClose}>취소</div>
                    <div className="thread-write-title">새로운 스레드</div>
                </div>
                <div className="thread-write-box-body">
                    <div className="thread-write-card">
                        <div className="thread-write-card-img">
                            {userProfile.profileImage && (
                                <img src={`http://localhost:8080${userProfile.profileImage}`} alt="프로필" className="thread-profile-img" />
                            )}
                        </div>
                        <div className="thread-write-card-main">
                            <div className="thread-write-card-top">
                                <div className="thread-write-card-user-name">{userProfile.userId}&nbsp;&nbsp;&gt;&nbsp;&nbsp;</div>
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