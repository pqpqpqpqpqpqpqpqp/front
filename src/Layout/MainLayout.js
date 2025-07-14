import { useState } from "react";
import NaviBar from "./NaviBar";
import AppRouter from "../routers/AppRouter";
import ThreadWrite from "../components/ThreadWrite";

function MainLayout() {
    const [writeOpen, setWriteOpen] = useState(false);

    return (
        <div className="app_container">
            <NaviBar onWriteOpen={() => setWriteOpen(true)} />
            <div className="app_context">
                <AppRouter />
                {writeOpen && (<ThreadWrite onClose={() => setWriteOpen(false)} />)}
            </div>
        </div>
    );
}

export default MainLayout;