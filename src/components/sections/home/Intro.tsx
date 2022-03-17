import useTemplate from "../../../hooks/useImports";

export default function Intro() {
  const { isLaptop } = useTemplate();
  return (
    <section className='intro'>
      <div className='player__wrapper'>
        <video
          className='player__wrapper--video'
          src='/videos/abstSpin04.mp4'
          height={isLaptop ? "100%" : "100%"}
          width={isLaptop ? "100%" : "100%"}
          autoPlay={true}
          loop={true}
          muted={true}
          controls={false}></video>
      </div>
      <div className='intro__title'>
        <h1>Ready to explore the vast world of E-Commerce?</h1>
      </div>
    </section>
  );
}
