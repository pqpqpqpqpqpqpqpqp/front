import NaviBar from "./NaviBar";
import AppRouter from "../routers/AppRouter";
import ThreadWrite from "../components/ThreadWrite";
import { useWrite } from "context/WriteContext";

function MainLayout() {
    const { initialContent, writeOpen, closeWrite } = useWrite();

    return (
        <div className="app_container">
            <NaviBar />
            <div className="app_context">
                <AppRouter />
                {writeOpen && <ThreadWrite onClose={closeWrite} initialContent={initialContent} />}
            </div>
        </div>
    );
}

export default MainLayout;