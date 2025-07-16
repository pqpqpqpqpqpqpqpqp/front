import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Thread from "components/Thread";
import { useAuth } from "context/AuthContext";
import { useWrite } from "context/WriteContext";
import 'css/home.css';

function Home() {
  const { isLoggedIn, userIdx } = useAuth();
  const [threadList, setThreadList] = useState([]);
  const { openWrite } = useWrite();

  useEffect(() => {
    if (!userIdx) return;

    const fetchThreadList = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/thread/page/feed/recommend?userIdx=${userIdx}`);
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

  if (threadList === null) return <div>로딩 중...</div>;

  return (
    <div className="home_thread_container">
      <div className="home_title">
        <h3>홈</h3>
      </div>

      <ul className="home_thread_list">
        <div className="home_quick_post">
          <input
            type="text"
            placeholder="무슨 생각을 하고 있나요?"
            readOnly
          />
          <div
            className="home_quick_post_btn"
            title="작성"
            onClick={() => {
              if (!isLoggedIn) {
                toast.warn('로그인이 필요합니다');
                return;
              }
              openWrite();
            }} >작성</div>
        </div>

        {threadList.map((thread) => (
          <li key={thread.threadIdx}>
            <Thread thread={thread} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;