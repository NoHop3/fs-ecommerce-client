import { useSelector } from "react-redux";
import { RootState } from "../../typescript/redux/store";
import Main from "../sections/home/Main";

export default function Home() {
    const { isLoggedIn } = useSelector((state: RootState) => state.authState);
    console.log(isLoggedIn);
  return (
      <Main />
  );
}
