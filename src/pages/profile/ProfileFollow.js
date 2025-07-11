import { useState } from "react";
import ThreadUser from "components/ThreadUser";
import 'css/profile_follow.css'

function ProfileFollow({ onClose }) {
    const [followTab, setFollowTab] = useState('팔로워');

    const followerList = [
        { id: 'jake123', name: 'Jake Thompson' },
        { id: 'mia_dev', name: 'Mia Andersen' },
        { id: 'liam2025', name: 'Liam Rodriguez' },
        { id: 'zoe.d', name: 'Zoe Dupont' },
        { id: 'niko_w', name: 'Nikolai Wexler' }
    ];

    const followingList = [
        { id: 'ava_c', name: 'Ava Chung' },
        { id: 'noahK', name: 'Noah Klein' },
        { id: 'emily.smith', name: 'Emily Smithson' },
        { id: 'raj.patel', name: 'Raj Patel' },
        { id: 'lucas_v', name: 'Lucas Van Dijk' }
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
                                <ThreadUser user={user} />
                            </li>
                        ))}
                    </ul>
                );
            case '팔로잉':
                return (
                    <ul>
                        {followingList.map((user) => (
                            <li key={user.id}>
                                <ThreadUser user={user} />
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
            <div className="profile_follow_card">
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
        </div>
    )
}

export default ProfileFollow;