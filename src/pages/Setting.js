import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiUserCircle, HiOutlineTrash, HiOutlineLockClosed } from "react-icons/hi";
import 'css/setting.css';
import { useAuth } from "context/AuthContext";
import { toast } from "react-toastify";

function Setting() {
    const { userIdx, logout } = useAuth();
    const navigate = useNavigate();
    const [selected, setSelected] = useState("account");
    const [showDeleteInfo, setShowDeleteInfo] = useState(false);

    const [form, setForm] = useState({
        userName: "",
        emailPhone: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAccountUpdate = async () => {
        if (!userIdx) return;

        try {
            const response = await fetch("http://localhost:8080/api/user/update/account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userIdx,
                    ...form,
                }),
            });

            const data = await response.json();
            if (response.ok && data.code === 200) {
                toast.success("계정 정보가 성공적으로 수정되었습니다.");
                setForm({ userName: "", emailPhone: "", password: "" });
            } else {
                toast.error("계정 정보 수정 실패: " + (data.message || "오류 발생"));
            }
        } catch (error) {
            toast.error("요청 중 오류 발생: " + error.message);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("정말 계정을 삭제하시겠습니까?");
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:8080/api/user/delete?userIdx=${userIdx}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                toast.success("계정 삭제 요청이 완료되었습니다. 7일 이내 로그인 시 삭제가 취소됩니다.");
                logout();
                navigate('/');
            } else {
                alert("삭제 요청 중 문제가 발생했습니다: " + (data.message || "알 수 없는 오류"));
            }
        } catch (error) {
            alert("오류 발생: " + error.message);
        }
    };

    return (
        <div className="setting_title">
            <h3>설정</h3>
            <div className="setting_container">
                <ul className="setting_list">
                    <li
                        className={selected === "account" ? "setting_selected" : ""}
                        onClick={() => setSelected("account")}
                    >
                        <HiUserCircle /> 계정 정보 설정
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
                        <>
                            <li className="setting_detail_account_item">
                                이름
                                <input
                                    type="text"
                                    name="userName"
                                    value={form.userName}
                                    onChange={handleChange}
                                    placeholder="변경할 이름"
                                />
                            </li>
                            <li className="setting_detail_account_item">
                                이메일 또는 전화번호
                                <input
                                    type="text"
                                    name="emailPhone"
                                    value={form.emailPhone}
                                    onChange={handleChange}
                                    placeholder="변경할 이메일 또는 전화번호"
                                />
                            </li>
                            <li className="setting_detail_account_item">
                                비밀번호
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="새 비밀번호"
                                />
                            </li>
                            <li className="setting_detail_account_item">
                                <div
                                    className="setting_detail_account_save"
                                    onClick={handleAccountUpdate}
                                >
                                    저장하기
                                </div>
                            </li>
                        </>
                    )}

                    {selected === "delete" && (
                        <>
                            <div
                                className="setting_delete_toggle"
                                onClick={() => setShowDeleteInfo(!showDeleteInfo)}
                            >
                                <HiOutlineLockClosed /> 계정 삭제 안내 {showDeleteInfo ? "▲" : "▼"}
                            </div>

                            {showDeleteInfo && (
                                <>
                                    <div className="setting_delete_description">
                                        {`계정 삭제 요청을 하면 7일간의 유예 기간이 적용됩니다.
                                        - 유예 기간 동안 로그인할 경우 삭제가 자동 취소됩니다.
                                        - 삭제 요청 후에는 계정 정보에 접근할 수 없습니다.
                                        - 7일이 경과하면 계정과 관련된 모든 데이터가 완전히 삭제됩니다.
                                        신중하게 결정해주세요.`}
                                    </div>
                                    <div
                                        className="setting_account_delete"
                                        onClick={handleDeleteAccount}
                                    >
                                        계정 삭제 요청
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Setting;