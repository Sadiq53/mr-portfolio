import { useState, type FC } from 'react';
import './App.css';
import Home from './components/ui/Home';
import logo from './assets/images/PNG/logo.png'
import About from './components/ui/About';
import type { Section } from './types/ui';
import Services from './components/ui/Services';
import Portfolio from './components/ui/Portfolio';
import Contact from './components/ui/Contact';
import Instagram from './components/icons/InstagramIcon';
// import FacebookIcon from './components/icons/FacebookIcon';
import LinkedInIcon from './components/icons/LinkedInIcon';
import WhatsappIcon from './components/icons/WhatsappIcon';

const App: FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [backSection, setBackSection] = useState<Section | null>(null);

  const handleSectionChange = (section: Section) => {
    if (section !== activeSection) {
      setBackSection(activeSection);
      setActiveSection(section);
    }
  };

  return (
    <div className="main-container">
      <div className="aside" id='aside'>
        <div className="logo">
          {/* <a href="#"><span>M</span>ohsin<span>R</span>aj</a> */}
          <a href="#"><img src={logo} alt="" /></a>
        </div>
        <div
          id="nav-toggler"
          className="nav-toggler"
          onClick={() => {
            document.getElementById('nav-toggler')?.classList.toggle('open');
            document.getElementById('aside')?.classList.toggle('open');
          }}
        >
          <span></span>
        </div>
        <ul className="nav">
          <li>
            <a
              href="#home"
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => handleSectionChange('home')}
            >
              <i className="fa fa-home"></i>Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => handleSectionChange('about')}
            >
              <i className="fa fa-user"></i>About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={activeSection === 'services' ? 'active' : ''}
              onClick={() => handleSectionChange('services')}
            >
              <i className="fa fa-list"></i>Services
            </a>
          </li>
          <li>
            <a
              href="#portfolio"
              className={activeSection === 'portfolio' ? 'active' : ''}
              onClick={() => handleSectionChange('portfolio')}
            >
              <i className="fa fa-briefcase"></i>Portfolio
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => handleSectionChange('contact')}
            >
              <i className="fa fa-comments"></i>Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <Home activeSection={activeSection} backSection={backSection} />

        <About activeSection={activeSection} backSection={backSection} setActiveSection={handleSectionChange} />

        <Services activeSection={activeSection} backSection={backSection} />

        <Portfolio activeSection={activeSection} backSection={backSection} />

        <Contact activeSection={activeSection} backSection={backSection} />

      </div>

      <div className="style-switcher">
        <a target='_blank' href='https://www.instagram.com/builttodesignn?igsh=M2xvZjFzZW9wcHRp' className="s-icon">
          <Instagram />
        </a>
        {/* <div className="s-icon">
          <FacebookIcon size={20} />
        </div> */}
        <a
          href="https://wa.me/918103745458?text=Hello%20I%20saw%20your%20portfolio"
          target="_blank"
          className="s-icon"
        >
          <WhatsappIcon />
        </a>

        <a href='https://www.linkedin.com/in/mohsin-raj-2b8aa8303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' target='_blank' className="s-icon">
          <LinkedInIcon size={20} />
        </a>
      </div>
    </div>
  );
};

export default App;