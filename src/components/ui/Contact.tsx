import type { PageProps } from "../../types/ui"

const Contact = ({activeSection, backSection}: PageProps) => {
    return (
        <>
            <section className={`contact section${activeSection === 'contact' ? ' active' : ''} ${backSection === 'contact' ? ' back-section' : ''}`} id="contact">
                <div className="container">
                    <div className="row">
                    <div className="section-title padd-15">
                        <h2>Contact</h2>
                    </div>
                    </div>

                    <h3 className="contact-title padd-15">Any Question? Contact us!</h3>
                    <h4 className="contact-subtitle padd-15">I'm at your service</h4>

                    <div className="row">
                    <div className="contact-info-item padd-15">
                        <div className="icon"><i className="fa fa-phone"></i></div>
                        <h4>Call us on</h4>
                        <p>+91 810 374 5458</p>
                    </div>

                    <div className="contact-info-item padd-15">
                        <div className="icon"><i className="fa fa-map-marker-alt"></i></div>
                        <h4>Office</h4>
                        <p>Indore</p>
                    </div>

                    <div className="contact-info-item padd-15">
                        <div className="icon"><i className="fa fa-envelope"></i></div>
                        <h4>Email</h4>
                        <p>mohsinraj406@gmail.com</p>
                    </div>

                    <div className="contact-info-item padd-15">
                        <div className="icon"><i className="fa fa-globe"></i></div>
                        <h4>Website</h4>
                        <p>www.domain.com</p>
                    </div>
                    </div>
                    <h3 className="contact-title padd-15">Send me an email</h3>
                    <h4 className="contact-subtitle padd-15">
                    I'll contact you as soon as possible!
                    </h4>

                    <div className="row">
                    <div className="contact-form padd-15">
                        <div className="row">
                        <div className="form-item col-6 padd-15">
                            <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                            />
                            </div>
                        </div>

                        <div className="form-item col-6 padd-15">
                            <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                            />
                            </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="form-item col-12 padd-15">
                            <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Subject"
                            />
                            </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="form-item col-12 padd-15">
                            <div className="form-group">
                            <textarea
                                name="message"
                                id="message"
                                className="form-control"
                                placeholder="Message"
                            ></textarea>
                            </div>
                        </div>
                        </div>

                        <div className="row">
                        <div className="form-item col-12 padd-15">
                            <div className="form-group">
                            <button type="submit" className="btn">Send Message</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact