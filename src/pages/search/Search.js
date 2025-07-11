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
      id: 1,
      user: "emily_james",
      hashtag: "#travel",
      createdAt: "2025-07-10",
      content: "Just came back from Iceland 🇮🇸 The landscapes are unreal!",
      likes: 124,
      replies: 8
    },
    {
      id: 2,
      user: "noah_chen",
      hashtag: "#coding",
      createdAt: "2025-07-08",
      content: "Finally cracked the algorithm challenge I've been stuck on for days!",
      likes: 89,
      replies: 12
    },
    {
      id: 3,
      user: "sofia_ruz",
      hashtag: "#art",
      createdAt: "2025-07-09",
      content: "New sketchbook drop 🎨✨ Would love some feedback!",
      likes: 203,
      replies: 34
    },
    {
      id: 4,
      user: "liam_dev",
      hashtag: "#startup",
      createdAt: "2025-07-11",
      content: "We just hit 10k users on our app 🎉 Thanks for the support!",
      likes: 310,
      replies: 47
    },
    {
      id: 5,
      user: "amelia.grace",
      hashtag: "#fitness",
      createdAt: "2025-07-07",
      content: "Early morning runs are my favorite 🏃‍♀️ #discipline",
      likes: 76,
      replies: 5
    }
  ];
  const searchUserList = [
    {
      id: "emily_james",
      name: "Emily James"
    },
    {
      id: "noah_chen",
      name: "Noah Chen"
    },
    {
      id: "sofia_ruz",
      name: "Sofia Ruz"
    },
    {
      id: "liam_dev",
      name: "Liam Davenport"
    },
    {
      id: "amelia.grace",
      name: "Amelia Grace"
    }
  ];

  useEffect(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, [currentTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);
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
              <li key={thread.id}>
                <Thread thread={thread} />
              </li>
            ))}
          </ul>);
      case '유저':
        return (
          <ul>
            {searchUserList.map((user) => (
              <li key={user.id}>
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