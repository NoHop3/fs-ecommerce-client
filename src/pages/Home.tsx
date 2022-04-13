import Main from "../components/sections/home/Main";

export default function Home({ theme }: { theme: string }) {
  return (
    <main>
      <Main theme={theme} />
    </main>
  );
}
