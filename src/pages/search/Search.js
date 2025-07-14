import { useState, useEffect } from 'react';
import Thread from 'components/Thread';
import ThreadUser from 'components/ThreadUser';
import 'css/search.css';

function Search() {
  const [currentTab, setCurrentTab] = useState('스레드');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const searchThreadList = [
    {
      threadIdx: 1,
      userId: "emily_james",
      userIdx: 11,
      hashtag: "#travel",
      createdAt: "2025-07-10",
      content: "Just came back from Iceland 🇮🇸 The landscapes are unreal!",
      likes: 124,
      replies: 8
    },{
      threadIdx: 2,
      userId: "noah_chen",
      userIdx: 12,
      hashtag: "#coding",
      createdAt: "2025-07-08",
      content: "Finally cracked the algorithm challenge I've been stuck on for days!",
      likes: 89,
      replies: 12
    },{
      threadIdx: 3,
      userId: "sofia_ruz",
      userIdx: 13,
      hashtag: "#art",
      createdAt: "2025-07-09",
      content: "New sketchbook drop 🎨✨ Would love some feedback!",
      likes: 203,
      replies: 34
    },{
      threadIdx: 4,
      userId: "liam_dev",
      userIdx: 14,
      hashtag: "#startup",
      createdAt: "2025-07-11",
      content: "We just hit 10k users on our app 🎉 Thanks for the support!",
      likes: 310,
      replies: 47
    },{
      threadIdx: 5,
      userId: "amelia_grace",
      userIdx: 15,
      hashtag: "#fitness",
      createdAt: "2025-07-07",
      content: "Early morning runs are my favorite 🏃‍♀️ #discipline",
      likes: 76,
      replies: 5
    }
  ];

  const searchUserList = [
    {
      userId: "emily_james",
      userIdx: 11,
      userName: "Emily James"
    },{
      userId: "noah_chen",
      userIdx: 12,
      userName: "Noah Chen"
    },{
      userId: "sofia_ruz",
      userIdx: 13,
      userName: "Sofia Ruz"
    },{
      userId: "liam_dev",
      userIdx: 14,
      userName: "Liam Davenport"
    },{
      userId: "amelia_grace",
      userIdx: 15,
      userName: "Amelia Grace"
    }
  ];


  useEffect(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, [currentTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim() === "") return;
    fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  /* const fetchResults = async (query) => {
    let url = "";

    if (currentTab === '스레드') {
      url = `/api/search/threads?q=${encodeURIComponent(query)}`;
    } else if (currentTab === '유저') {
      url = `/api/search/users?q=${encodeURIComponent(query)}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResults(data);
      console.log("🔍 검색 실행:", query, "결과:", data);
    } catch (err) {
      console.error("검색 중 오류 발생:", err);
    }
  }; */

  const fetchResults = (query) => {
    console.log("🔍 검색 실행:", query);
  };

  const renderSearchBody = () => {
    switch (currentTab) {
      case '스레드':
        return (
          <ul>
            {searchThreadList.map((thread) => (
              <li key={thread.threadIdx}>
                <Thread thread={thread} />
              </li>
            ))}
          </ul>);
      case '유저':
        return (
          <ul>
            {searchUserList.map((user) => (
              <li key={user.userIdx}>
                <ThreadUser user={user} />
              </li>
            ))}
          </ul>);
      default:
        return null;
    }
  };

  return (
    <div className="thread-search-title">
      <h3>검색</h3>
      <div className="thread-search-container">
        <div className='thread-search-tab-menus'>
          <div
            onClick={() => setCurrentTab("스레드")}
            className={currentTab === "스레드" ? "active_tab" : ""}
          >
            스레드 검색
          </div>
          <div
            onClick={() => setCurrentTab("유저")}
            className={currentTab === "유저" ? "active_tab" : ""}
          >
            유저 검색
          </div>
        </div>
        <input
          className="thread-search-bar"
          placeholder="검색어를 입력하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="thread-search-body">{renderSearchBody()}</div>
      </div>
    </div>
  )
}

export default Search;