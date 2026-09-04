import { useEffect } from "react";
import getCurrentUser from "./features/getCurrentUser";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";

const App = () => {
    const dispatch = useDispatch();
    const { theme } = useSelector((state: any) => state.user);

    // Keep the .dark class on <html> in sync with Redux state
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await getCurrentUser();
            dispatch(setUserData(data));
        };
        fetchUser();
    }, []);

    return <Home />;
};

export default App;
