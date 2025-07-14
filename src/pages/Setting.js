import { useState } from "react";
import { HiUserCircle, HiOutlineCog, HiOutlineUser, HiOutlineTrash } from "react-icons/hi";
import 'css/setting.css';

function Setting() {
    const [selected, setSelected] = useState("account");

    return (
        <div className="setting_title">
            <h3>설정</h3>
            <div className="setting_container">
                <ul className="setting_list">
                    <li
                        className={selected === "account" ? "setting_selected" : ""}
                        onClick={() => setSelected("account")}
                    >
                        <HiUserCircle /> 계정
                    </li>
                    <li
                        className={selected === "privacy" ? "setting_selected" : ""}
                        onClick={() => setSelected("privacy")}
                    >
                        <HiOutlineCog /> 개인 정보 설정
                    </li>
                    <li
                        className={selected === "other" ? "setting_selected" : ""}
                        onClick={() => setSelected("other")}
                    >
                        <HiOutlineUser /> 기타 계정 설정
                    </li>
                    <li
                        className={selected === "delete" ? "setting_selected" : ""}
                        onClick={() => setSelected("delete")}
                    >
                        <HiOutlineTrash /> 계정 삭제
                    </li>
                </ul>

                <ul className="setting_detail">
                    {selected === "account" && (
                        <li>계정 기본 설정</li>
                    )}
                    {selected === "privacy" && (
                        <>
                            <li>개인 정보 수정</li>
                            <li>비밀번호 변경</li>
                        </>
                    )}
                    {selected === "other" && (
                        <>
                            <li>기타 계정 설정 옵션 1</li>
                            <li>기타 계정 설정 옵션 2</li>
                        </>
                    )}
                    {selected === "delete" && (
                        <>
                            <li>계정 삭제 안내</li>
                            <li>계정 삭제 진행</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Setting;