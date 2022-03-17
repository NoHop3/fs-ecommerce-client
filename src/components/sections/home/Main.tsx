import Intro from "./Intro";
import About from "./About";
import {Team} from "./Team"

export default function Main({ theme }: { theme: string }) {
  return (
    <main>
      <Intro />
      <About />
      <Team theme={theme} />
    </main>
  );
}
