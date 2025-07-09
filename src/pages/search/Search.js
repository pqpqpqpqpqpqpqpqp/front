import { useState, useEffect } from 'react';
import SearchThread from './SearchThread';
import SearchUser from './SearchUser';
import 'css/search.css';

function Search() {
  const [currentTab, setCurrentTab] = useState('스레드');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, [currentTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery.trim() === "") return;
    fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  const fetchResults = (query) => {
    // 여기에 API 호출 또는 검색 로직
    console.log("🔍 검색 실행:", query);
  };

  const renderSearchContext = () => {
    switch (currentTab) {
      case '스레드':
        return <SearchThread />;
      case '유저':
        return <SearchUser />;
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
      </div>
      <div className="thread-search_context">{renderSearchContext()}</div>
    </div>
  )
}

export default Search;