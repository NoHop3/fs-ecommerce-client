import Intro from "./Intro";
import About from "./About";
import {Team} from "./Team"

export default function Main({ theme }: { theme: string }) {
  return (
    <div className="home__wrapper">
      <Intro />
      <About />
      <Team theme={theme} />
    </div>
  );
}
