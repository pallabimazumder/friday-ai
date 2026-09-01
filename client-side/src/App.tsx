import { useEffect } from "react";
import getCurrentUser from "./features/getCurrentUser";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUser = async () => {
      const data = await getCurrentUser();
      dispatch(setUserData(data));
    };
    currentUser();
  }, []);

  return (
    <>
      <Home />
    </>
  )
}

export default App;
