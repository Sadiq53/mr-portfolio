import type { PageProps } from "../../types/ui"

const Services = ({ activeSection, backSection }: PageProps) => {
    return (
        <>
            <section className={`service section${activeSection === 'services' ? ' active' : ''} ${backSection === 'services' ? ' back-section' : ''}`} id="services">
                <div className="container">
                    <div className="row">
                        <div className="section-title padd-15">
                            <h2>Services</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="service-item padd-15">
                            <div className="service-item-inner">
                            <div className="icon">
                                <i className="fa fa-mobile-alt"></i>
                            </div>
                            <h4>Web Design</h4>
                            <p>
                                I offer custom website designs, responsive design to ensure
                                compatibility across devices, and UI/UX design to enhance
                                user experience
                            </p>
                            </div>
                        </div>

                        <div className="service-item padd-15">
                            <div className="service-item-inner">
                            <div className="icon">
                                <i className="fa fa-laptop-code"></i>
                            </div>
                            <h4>Graphic Design</h4>
                            <p>
                                I design logos, icons, illustrations, and other visual
                                assets that enhance the website's branding and aesthetic
                                appeal
                            </p>
                            </div>
                        </div>

                        <div className="service-item padd-15">
                            <div className="service-item-inner">
                            <div className="icon">
                                <i className="fa fa-palette"></i>
                            </div>
                            <h4>Digital Marketing</h4>
                            <p>
                                I build websites that enhances visual aesthetics, user
                                experience, SEO, responsive design and mainly conversion
                                optimization
                            </p>
                            </div>
                        </div>

                        <div className="service-item padd-15">
                            <div className="service-item-inner">
                            <div className="icon">
                                <i className="fa fa-code"></i>
                            </div>
                            <h4>UI/UX Solutions</h4>
                            <p>
                                I offer custom research and design to increase your customer
                                satisfaction and obtain higher conversion rates
                            </p>
                            </div>
                        </div>

                        <div className="service-item padd-15">
                            <div className="service-item-inner">
                            <div className="icon">
                                <i className="fa fa-search"></i>
                            </div>
                            <h4>Brand Consultancy</h4>
                            <p>
                                I build brands through cultural insights & strategic vision.
                                Custom crafted business solution
                            </p>
                            </div>
                        </div>

                        <div className="service-item padd-15">
                            <div className="service-item-inner">
                            <div className="icon">
                                <i className="fa fa-bullhorn"></i>
                            </div>
                            <h4>Photography</h4>
                            <p>
                                I make high-quality photos of any category at a professional
                                level.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Services