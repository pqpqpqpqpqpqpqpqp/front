import { useState, useEffect, useCallback } from 'react';
import Thread from 'components/Thread';
import ThreadUser from 'components/ThreadUser';
import 'css/search.css';

function Search() {
  const [currentTab, setCurrentTab] = useState('스레드');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchThreadList, setSearchThreadList] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchQuery('');
    setDebouncedQuery('');
    setSearchThreadList([]);
    setSearchUserList([]);
  }, [currentTab]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 700);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchResults = useCallback(async (query) => {
    setLoading(true);
    let url = '';
    if (currentTab === '스레드') {
      url = `http://localhost:8080/api/search/nomal?inputStr=${encodeURIComponent(query)}`;
    } else if (currentTab === '유저') {
      url = `http://localhost:8080/api/user/search?inputStr=${encodeURIComponent(query)}`;
    }

    try {
      const res = await fetch(url, { method: 'POST' });
      const data = await res.json();

      if (currentTab === '스레드') {
        setSearchThreadList(data.data || []);
      } else {
        setSearchUserList(Array.isArray(data.data) ? data.data : []);
      }
    } catch (error) {
      console.error('검색 실패:', error);
      if (currentTab === '스레드') {
        setSearchThreadList([]);
      } else {
        setSearchUserList([]);
      }
    } finally {
      setLoading(false);
    }
  }, [currentTab]);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchThreadList([]);
      setSearchUserList([]);
      return;
    }
    fetchResults(debouncedQuery);
  }, [debouncedQuery, fetchResults]);

  const renderSearchBody = () => {
    if (loading) {
      return <p>로딩 중...</p>;
    }

    if (currentTab === '스레드') {
      if (searchThreadList.length === 0) {
        return <p>검색 결과가 없습니다.</p>;
      }
      return (
        <ul>
          {searchThreadList.map(thread => (
            <li key={thread.threadIdx}>
              <Thread thread={thread} />
            </li>
          ))}
        </ul>
      );
    }

    if (currentTab === '유저') {
      if (searchUserList.length === 0) {
        return <p>검색 결과가 없습니다.</p>;
      }
      return (
        <ul>
          {searchUserList.map(user => (
            <li key={user.userIdx}>
              <ThreadUser user={user} />
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <div className="thread-search-title">
      <h3>검색</h3>
      <div className="thread-search-container">
        <div className="thread-search-tab-menus">
          <div
            onClick={() => setCurrentTab('스레드')}
            className={currentTab === '스레드' ? 'active_tab' : ''}
          >
            스레드 검색
          </div>
          <div
            onClick={() => setCurrentTab('유저')}
            className={currentTab === '유저' ? 'active_tab' : ''}
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
  );
}

export default Search;
