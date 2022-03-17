export default function About() {
  return (
    <section className='about'>
      <div className='about--title'>
        <h2>What is it that we do to differentiate?</h2>
      </div>
      <div className='about__info'>
        <div className='about__info--item'>
          <div className='item__container'>
            <h3 className='item__container--subtitle'>Be on track</h3>
            <p className='item__container--desc'>
              We try to be updated on the latest trends around the globe.
            </p>
          </div>
        </div>
        <div className='about__info--item'>
          <div className='item__container'>
            <h3 className='item__container--subtitle'>Be in tact</h3>
            <p className='item__container--desc'>
              Being updated is not enough. We strive to be alongside
              competitors.
            </p>
          </div>
        </div>
        <div className='about__info--item'>
          <div className='item__container'>
            <h3 className='item__container--subtitle'>Be exact</h3>
            <p className='item__container--desc'>
              We rely on our customers as much they rely on us. We keep our customer service as professional as it can get.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
