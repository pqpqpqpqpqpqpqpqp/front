import { HiPhotograph, HiEmojiHappy } from "react-icons/hi";
import 'css/thread_write.css';

const ThreadWrite = () => {
    return (
        <div className="thread-write-box">
            <div className="thread-write-box-header">
                <div className="thread-write-cancel">취소</div>
                <div className="thread-write-title">새로운 스레드</div>
            </div>
            <div className="thread-write-box-body">
                <div className="thread-write-card">
                    <div className="thread-write-card-img"></div>
                    <div className="thread-write-card-user-name">
                        requestfield
                    </div>
                    <div className="thread-write-topic-add">주제 추가</div>
                    <div className="thread-write-content">
                        <textarea placeholder="새로운 소식이 있나요?" />
                    </div>
                    <div className="thread-write-attachment">
                        <HiPhotograph />
                        <HiEmojiHappy />
                    </div>
                </div>
                <div className="thread-write-box-post">
                    <button disabled>게시</button>
                </div>
            </div>
        </div>
    );
};

export default ThreadWrite;