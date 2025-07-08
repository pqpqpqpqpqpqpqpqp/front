import Thread from "components/Thread";
import 'css/profile_thread_tab.css'

function ProfileReplyTab() {
  // 내 스레드중 답글 스레드(부모가 있는 스레드)를 보여주는 페이지
  // 데이터 자체를 그렇게 받아와서 보여줄 것
  // db 검색시 부모가 있는 내 스레드를 검색한 후, 그것의 부모스레드도 가져올것
  // 현재는 임시로 만든 데이터, 추후 변경 필요
  const threads = [
    {
      id: 1,
      user: 'requestfield',
      content: '4단 쓰레드',
      createdAt: '2025-07-01',
      likes: 6,
      replies: 3,
      parentId: null
    },
    {
      id: 2,
      user: 'requestfield',
      content: '5단 쓰레드',
      createdAt: '2025-07-02',
      likes: 3,
      replies: 1,
      parentId: 1
    },
    {
      id: 3,
      user: 'requestfield',
      content: '6단 쓰레드',
      createdAt: '2025-07-03',
      likes: 1,
      replies: 0,
      parentId: 2
    },
    {
      id: 4,
      user: 'requestfield',
      content: '4.1단 쓰레드',
      createdAt: '2025-07-03',
      likes: 1,
      replies: 0,
      parentId: 1
    }
  ];

  const threadMap = new Map();
  threads.forEach(t => threadMap.set(t.id, { ...t, children: [] }));

  const rootThreads = [];
  threadMap.forEach(thread => {
    if (thread.parentId === null) {
      rootThreads.push(thread);
    } else {
      const parent = threadMap.get(thread.parentId);
      if (parent) parent.children.push(thread);
    }
  });

  const threadPairs = [];
  const collectPairs = (parent) => {
    parent.children.forEach(child => {
      threadPairs.push([parent, child]);
      collectPairs(child);
    });
  };
  rootThreads.forEach(root => collectPairs(root));

  return (
    <ul className="thread-list">
      {threadPairs.map(([parent, child]) => (
        <li key={`${parent.id}-${child.id}`} className="thread-pair">
          <Thread thread={parent} />
          <div className="thread-pair-connector" />
          <Thread thread={child} />
        </li>
      ))}
    </ul>
  );
}

export default ProfileReplyTab;