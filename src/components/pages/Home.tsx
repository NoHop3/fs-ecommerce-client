import Main from "../sections/home/Main";

export default function Home({ theme }: { theme: string }) {
  return (
    <main>
      <Main theme={theme} />
    </main>
  );
}
