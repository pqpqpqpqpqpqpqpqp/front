import { useEffect } from "react";
import Thread from "components/Thread";

function Follow() {
  // 내가 팔로우한 유저의 스레드를 가져올 페이지
  
  const threads = [
    {
      id: 1,
      user: 'requestfield',
      content: '123890570984-2107492174-2108934=1-238단 쓰레드',
      hashtag: '임시',
      createdAt: '2025-07-01',
      likes: 6,
      replies: 2,
      parentId: null
    },
    {
      id: 2,
      user: 'requestfield',
      content: '235209757147-285-02385=-1284=218940912=-49=-39502836-293417894-단 쓰레드',
      hashtag: '임시',
      createdAt: '2025-07-02',
      likes: 3,
      replies: 1,
      parentId: 1
    },
    {
      id: 3,
      user: 'requestfield',
      content: '32903570-3748-1240982136508623094812947091275093285-203-573-076031894=-129=4-85=0823-7509213-491-289-=12395-185-1291=-294단 쓰레드',
      hashtag: '임시',
      createdAt: '2025-07-03',
      likes: 1,
      replies: 0,
      parentId: 2
    },
    {
      id: 4,
      user: 'requestfield',
      content: '1.1단 쓰레드',
      createdAt: '2025-07-03',
      likes: 1,
      replies: 0,
      parentId: 1
    },
    {
      id: 5,
      user: 'requestfield',
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
        <h3>팔로우</h3>
      </div>
      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={thread.id}>
            <Thread thread={thread} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Follow;