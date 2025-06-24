import type { PageProps } from "../../types/ui"

const Portfolio = ({activeSection, backSection}: PageProps) => {
    return (
        <>
            <section className={`portfolio section${activeSection === 'portfolio' ? ' active' : ''} ${backSection === 'portfolio' ? ' back-section' : ''}`} id="portfolio">
                <div className="container">
                    <div className="row">
                    <div className="section-title padd-15">
                        <h2>Portfolio</h2>
                    </div>
                    </div>

                    <div className="row">
                    <div className="portfolio-heading padd-15">
                        <h2>My Last Projects:</h2>
                    </div>
                    </div>

                    <div className="row">
                    <div className="portfolio-item padd-15">
                        <div className="portfolio-item-inner shadow-dark">
                        <div className="portfolio-img">
                            <img
                            src="https://i.postimg.cc/NGkQB1Y0/portfolio-1.jpg"
                            alt="portfolio image"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="portfolio-item padd-15">
                        <div className="portfolio-item-inner shadow-dark">
                        <div className="portfolio-img">
                            <img
                            src="https://i.postimg.cc/ydg49Z3w/portfolio-2.jpg"
                            alt="portfolio image"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="portfolio-item padd-15">
                        <div className="portfolio-item-inner shadow-dark">
                        <div className="portfolio-img">
                            <img
                            src="https://i.postimg.cc/RVPdrbDL/portfolio-3.jpg"
                            alt="portfolio image"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="portfolio-item padd-15">
                        <div className="portfolio-item-inner shadow-dark">
                        <div className="portfolio-img">
                            <img
                            src="https://i.postimg.cc/25dBY15N/portfolio-4.jpg"
                            alt="portfolio image"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="portfolio-item padd-15">
                        <div className="portfolio-item-inner shadow-dark">
                        <div className="portfolio-img">
                            <img
                            src="https://i.postimg.cc/RZBHD1ML/portfolio-5.jpg"
                            alt="portfolio image"
                            />
                        </div>
                        </div>
                    </div>

                    <div className="portfolio-item padd-15">
                        <div className="portfolio-item-inner shadow-dark">
                        <div className="portfolio-img">
                            <img
                            src="https://i.postimg.cc/3wP7t1hK/portfolio-6.jpg"
                            alt="portfolio image"
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Portfolio