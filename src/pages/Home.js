import { useEffect } from "react";
import Thread from "components/Thread";
import 'css/home.css';

function Home() {
  // 전체 스레드를 가져올 페이지
  // 가져올때 사용자 선호도 가중치 테이블로 적절히 추천 스레드를 가져올것
  // 그리고 전체 스레드를 다 가져오는건 너무 무거우므로 적절한 양을 잘라 가져오고
  // 스크롤하여 더 보여줄 필요가 생기면 추가로 가져와서 보여줄것 
  // 현재 데이터는 임시로, 추후 변경 필요

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
    console.log("페이지 로딩")
  }, [])

  return (
    <div className="thread-container">
      <div className="profile_title">
        <h3>홈</h3>
      </div>
      <ul className="thread-list">
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