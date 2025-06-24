import type { PageProps } from "../../types/ui"

const About = ({ activeSection, backSection, setActiveSection }: PageProps) => {
    return (
        <>
            <section className={`about section${activeSection === 'about' ? ' active' : ''}${backSection === 'about' ? ' back-section' : ''}`} id="about">
            <div className="container">
                <div className="row">
                <div className="section-title padd-15">
                    <h2>About me</h2>
                </div>
                </div>

                <div className="row">
                <div className="about-content padd-15">
                    <div className="row">
                    <div className="about-text padd-15">
                        <h3>I'm Mohsin Raj and <span>Creative Visual Designer</span></h3>
                        <p>
                            As a motion graphics designer, graphic designer, and video editor, I specialize in crafting visually compelling content that captures attention and tells powerful stories. From dynamic animations and brand visuals to cinematic video edits, I transform ideas into impactful digital experiences. I stay inspired by the latest visual trends and constantly refine my craft through experimentation and creative exploration. My mission is to deliver work that not only looks great, but also communicates clearly and connects emotionally with audiences.
                        </p>
                    </div>

                    </div>

                    <div className="row">
                    <div className="personal-info padd-15">
                        <div className="row">
                        <div className="info-item padd-15">
                            <p>Birthday: <span>29 Nov 2006</span></p>
                        </div>

                        <div className="info-item padd-15">
                            <p>Age: <span>18</span></p>
                        </div>

                        <div className="info-item padd-15">
                            <p>Website: <span>www.domain.com</span></p>
                        </div>

                        <div className="info-item padd-15">
                            <p>Email: <span>mohsinraj406@gmail.com</span></p>
                        </div>

                        <div className="info-item padd-15">
                            <p>Degree: <span>Higer Education</span></p>
                        </div>

                        <div className="info-item padd-15">
                            <p>Phone: <span>+91 810 374 5458</span></p>
                        </div>

                        <div className="info-item padd-15">
                            <p>City: <span>Indore</span></p>
                        </div>

                        <div className="info-item padd-15">
                            <p>Freelance: <span>Available</span></p>
                        </div>
                        </div>

                        <div className="row">
                        <div className="buttons padd-15">
                            <a
                                href="#contact"
                                className="btn hire-me"
                                data-section-index="1"
                                onClick={() => setActiveSection && setActiveSection('contact')}
                            >
                                Hire me!
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="skills padd-15">
                        <div className="row">
                            <div className="skill-item padd-15">
                                <h5>After Effects</h5>
                                <div className="progress">
                                    <div className="progress-in" style={{ width: '56%' }}></div>
                                    <div className="skill-percent">56%</div>
                                </div>
                            </div>

                            <div className="skill-item padd-15">
                                <h5>Figma</h5>
                                <div className="progress">
                                    <div className="progress-in" style={{ width: '86%' }}></div>
                                    <div className="skill-percent">86%</div>
                                </div>
                            </div>

                        <div className="skill-item padd-15">
                            <h5>Blender</h5>
                            <div className="progress">
                            <div className="progress-in" style={{ width: '66%' }}></div>
                            <div className="skill-percent">66%</div>
                            </div>
                        </div>

                        <div className="skill-item padd-15">
                            <h5>Canva</h5>
                            <div className="progress">
                            <div className="progress-in" style={{ width: '96%' }}></div>
                            <div className="skill-percent">96%</div>
                            </div>
                        </div>

                        <div className="skill-item padd-15">
                            <h5>Capcut</h5>
                            <div className="progress">
                            <div className="progress-in" style={{ width: '76%' }}></div>
                            <div className="skill-percent">76%</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="row">
                    <div className="education padd-15">
                        <h3 className="title">Education</h3>
                        <div className="row">
                        <div className="timeline-box padd-15">
                            <div className="timeline shadow-dark">
                            <div className="timeline-item">
                                <div className="circle-dot"></div>
                                <h3 className="timeline-date">
                                <i className="fa fa-calendar"></i> 2013 - 2015
                                </h3>
                                <h4 className="timeline-title">
                                Master in Computer Science
                                </h4>
                                <p className="timeline-text">
                                I learnt a wide range of topics that are essential
                                to understanding both the theory and practical
                                aspects of computing. This involves programming
                                fundamentals, computer architecture, operating
                                systems, databases, software engineering, problem
                                solving, collaboration and communication soft
                                skills.
                                </p>
                            </div>

                            <div className="timeline-item">
                                <div className="circle-dot"></div>
                                <h3 className="timeline-date">
                                <i className="fa fa-calendar"></i> 2011 - 2014
                                </h3>
                                <h4 className="timeline-title">Master Degree</h4>
                                <p className="timeline-text">
                                I chose my master degree in technology. There I
                                deepened my knowledge, enhanced my skills in the
                                area and learnt how to increase my career
                                prospects in a competitive job market.
                                </p>
                            </div>

                            <div className="timeline-item">
                                <div className="circle-dot"></div>
                                <h3 className="timeline-date">
                                <i className="fa fa-calendar"></i> 2007 - 2010
                                </h3>
                                <h4 className="timeline-title">Bachelor Degree</h4>
                                <p className="timeline-text">
                                There I learnt foundational courses and computer
                                sciences fundamentals. In the institution, I chose
                                my specialization in web-development that involves
                                front-end and back-end technologies, user
                                interface designs and content management systems.
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="experience padd-15">
                        <h3 className="title">Experience</h3>
                        <div className="row">
                        <div className="timeline-box padd-15">
                            <div className="timeline shadow-dark">
                            <div className="timeline-item">
                                <div className="circle-dot"></div>
                                <h3 className="timeline-date">
                                <i className="fa fa-calendar"></i> 2020 - Today
                                </h3>
                                <h4 className="timeline-title">
                                Senior Front-end Designer
                                </h4>
                                <p className="timeline-text">
                                I can design complex software systems. My
                                decisions impact scalability, maintainability, and
                                overall system architecture. Also, I mentor less
                                experienced team members, helping them grow and
                                learn.
                                </p>
                            </div>

                            <div className="timeline-item">
                                <div className="circle-dot"></div>
                                <h3 className="timeline-date">
                                <i className="fa fa-calendar"></i> 2017 - 2019
                                </h3>
                                <h4 className="timeline-title">
                                Junior Front-end Designer
                                </h4>
                                <p className="timeline-text">
                                I learnt to code in an existing codebase, dive
                                into the project and understanding its structure.
                                Also I worked closely with senior software
                                engineers that guided me, answered my questions
                                and helped me grow.
                                </p>
                            </div>

                            <div className="timeline-item">
                                <div className="circle-dot"></div>
                                <h3 className="timeline-date">
                                <i className="fa fa-calendar"></i> 2014 - 2016
                                </h3>
                                <h4 className="timeline-title">Graphic Designer</h4>
                                <p className="timeline-text">
                                I can create logos, color schemes and typography
                                for a brand's identity. Also I develop graphics
                                for websites, social media and digital ads with
                                applications that enhance user experience.
                                </p>
                            </div>
                            </div>
                        </div>
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

export default About