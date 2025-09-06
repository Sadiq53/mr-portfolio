import type { PageProps } from "../../types/ui"
import hero from '../../assets/images/jpg/hero-img.jpg'

const Home = ({ activeSection, backSection }: PageProps) => {
    return (
        <>
            <section className={`home section${activeSection === 'home' ? ' active' : ''} ${backSection === 'home' ? ' back-section' : ''}`} id="home">
                <div className="container">
                    <div className="row">
                        <div className="home-info padd-15">
                            <h3 className="hello">
                                Hello, my name is <span className="name">Mohsin Raj</span>
                            </h3>
                            <h3 className="profession">
                                I'm a <span className="typing">Creative Visual Artist</span>
                            </h3>
                            <p>
                                I'm a passionate Motion Graphics Designer, Graphic Designer, and Video Editor with years of experience turning ideas into impactful visuals. From dynamic animations to sleek brand visuals and cinematic edits, I bring stories to life with creativity and precision. Whether it's a logo reveal, a marketing video, or a full visual identity — I craft visuals that speak louder than words.
                            </p>
                            <a href="#" className="btn">Download CV</a>
                        </div>
                        <div className="home-img padd-15">
                            <img
                                src={hero}
                                alt="hero image"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home