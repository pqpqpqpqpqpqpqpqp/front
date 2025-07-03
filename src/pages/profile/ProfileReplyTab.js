import Thread from "components/Thread";
import 'css/profile_tab.css'

function ProfileReplyTab() {
  const threads = [
    {
      id: 1,
      user: 'requestfield',
      content: '4단 쓰레드',
      createdAt: '2025-07-01',
      likes: 6,
      replies: 2,
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