export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__link'> Copyright &copy; 2022, Stefan Georgiev</p>
      <ul className='social-list'>
        <li className='social-list__item'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='social-list__link'
            href={"https://www.linkedin.com/in/stefang23/"}>
            <i className='fab fa-linkedin'></i>
          </a>
        </li>
        <li className='social-list__item'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='social-list__link'
            href='https://www.instagram.com/stefan_g23/'>
            <i className='fab fa-instagram'></i>
          </a>
        </li>
        <li className='social-list__item'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='social-list__link'
            href='https://www.facebook.com/stefan.georgievxD/'>
            <i className='fab fa-facebook'></i>
          </a>
        </li>
        <li className='social-list__item'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='social-list__link'
            href='https://github.com/NoHop3'>
            <i className='fab fa-github'></i>
          </a>
        </li>
      </ul>
    </footer>
  );
}
