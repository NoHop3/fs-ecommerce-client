import { useSelector } from "react-redux";
import { RootState } from "../../typescript/redux/store";

export default function Logo() {
  const { lamp } = useSelector((state: RootState) => state.themeState);
  return (
    <div className='logo__container'>
      <img
        className='logo--png'
        src={
          lamp
            ? "/images/stgdev__logo__dark.png"
            : "/images/stgdev__logo__light.png"
        }
        alt='Logo'
      />
    </div>
  );
}
