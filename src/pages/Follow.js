import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "context/AuthContext";
import Thread from "components/Thread";
import 'css/follow.css'

function Follow() {
  const { userIdx } = useAuth();
  const [threadList, setThreadList] = useState([]);

  useEffect(() => {
    if (!userIdx) return;

    const fetchThreadList = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/thread/page/feed/follow?userIdx=${userIdx}`);
        const data = await res.json();
        if (data.code === 200) {
          setThreadList(data.data);
        } else {
          toast.error(`스레드 목록 불러오기 실패: ${data.message}`);
        }
      } catch (err) {
        toast.error(`서버 오류: ${err.message}`);
      }
    };

    fetchThreadList();
  }, [userIdx]);

  return (
    <div className="thread-follow-container">
      <div className="thread-follow-title">
        <h3>팔로우</h3>
      </div>
      <ul className="thread-follow-list">
        {threadList.map((thread) => (
          <li key={thread.id}>
            <Thread thread={thread} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Follow;