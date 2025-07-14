import { useEffect } from "react";
import { toast } from "react-toastify";
import Thread from "components/Thread";
import { useAuth } from "context/AuthContext";
import { useWrite } from "context/WriteContext";
import 'css/home.css';

function Home() {
  const { isLoggedIn } = useAuth();
  const { openWrite } = useWrite();

  const threads = [
    {
      threadIdx: 1,
      userId: 'requestfield',
      userIdx: 1,
      content: '123890570984-2107492174-2108934=1-238단 쓰레드',
      hashtag: '임시',
      createdAt: '2025-07-01',
      likes: 6,
      replies: 2,
      parentId: null
    },
    {
      threadIdx: 2,
      userId: 'requestfield',
      userIdx: 1,
      content: '235209757147-285-02385=-1284=218940912=-49=-39502836-293417894-단 쓰레드',
      hashtag: '임시',
      createdAt: '2025-07-02',
      likes: 3,
      replies: 1,
      parentId: 1
    },
    {
      threadIdx: 3,
      userId: 'requestfield',
      userIdx: 1,
      content: '32903570-3748-1240982136508623094812947091275093285-203-573-076031894=-129=4-85=0823-7509213-491-289-=12395-185-1291=-294단 쓰레드',
      hashtag: '임시',
      createdAt: '2025-07-03',
      likes: 1,
      replies: 0,
      parentId: 2
    },
    {
      threadIdx: 4,
      userId: 'requestfield',
      userIdx: 1,
      content: '1.1단 쓰레드',
      createdAt: '2025-07-03',
      likes: 1,
      replies: 0,
      parentId: 1
    },
    {
      threadIdx: 5,
      userId: 'requestfield',
      userIdx: 1,
      content: '부모자식이 없는 쓰레드',
      createdAt: '2025-07-03',
      likes: 1,
      replies: 0,
      parentId: null
    }
  ];

  useEffect(() => {
  }, [])

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

        {threads.map((thread) => (
          <li key={thread.threadIdx}>
            <Thread thread={thread} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;