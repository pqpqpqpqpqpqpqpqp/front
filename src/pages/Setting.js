import { HiOutlineUser, HiExternalLink } from "react-icons/hi";
import 'css/setting.css'

function Setting() {
    return (
        <div className="setting-title">
            <h3>설정</h3>
            <div className="setting-container">
                <ul className="setting-list">
                    <li><HiOutlineUser />계정</li>
                </ul>
                <ul className="setting-detail">
                    <li>개인 정보 설정 <HiExternalLink /></li>
                    <li>기타 계정 설정 <HiExternalLink /></li>
                    <li>계정 삭제 <HiExternalLink /></li>
                </ul>
            </div>
        </div>
    )
}

export default Setting;