import { useState } from "react";

function ProfileFollow({ onClose }) {
    const [followTab, setFollowTab] = useState('팔로워');

    const followerList = [
        { id: 1, name: "김하늘", bio: "하루하루 성장 중인 프론트엔드 개발자" },
        { id: 2, name: "이재훈", bio: "디자인과 코드를 사랑하는 사람" },
        { id: 3, name: "박소연", bio: "독서와 산책을 좋아하는 UI 디자이너" },
        { id: 4, name: "정민우", bio: "노션 정리광, 생산성 도구 매니아" },
    ];

    const followingList = [
        { id: 5, name: "최유진", bio: "React와 Typescript 좋아합니다" },
        { id: 6, name: "한지호", bio: "스타트업에서 백엔드 개발 중" },
        { id: 7, name: "오세린", bio: "고양이 집사 + 프론트 개발자" },
    ];

    const handleFollowClose = (e) => {
        if (e.target.classList.contains("profile_follow_container")) {
            onClose();
        }
    }

    const renderFollowBody = () => {
        switch (followTab) {
            case '팔로워':
                return (
                    <ul>
                        {followerList.map((user) => (
                            <li key={user.id}>
                                <p><strong>{user.name}</strong></p>
                                <p>{user.bio}</p>
                            </li>
                        ))}
                    </ul>
                );
            case '팔로잉':
                return (
                    <ul>
                        {followingList.map((user) => (
                            <li key={user.id}>
                                <p><strong>{user.name}</strong></p>
                                <p>{user.bio}</p>
                            </li>
                        ))}
                    </ul>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile_follow_container" onClick={handleFollowClose}>
            <div className="profile_follow_tab_menu">
                <div
                    onClick={() => setFollowTab("팔로워")}
                    className={followTab === "팔로워" ? "active_follow_tab" : ""}
                >팔로워</div>
                <div
                    onClick={() => setFollowTab("팔로잉")}
                    className={followTab === "팔로잉" ? "active_follow_tab" : ""}
                >팔로잉</div>
            </div>
            <div className="profile_follow_body">{renderFollowBody()}</div>
        </div>
    )
}

export default ProfileFollow;