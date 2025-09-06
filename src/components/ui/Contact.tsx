import type { PageProps } from "../../types/ui";
import { useState, useRef, type FormEvent } from "react";
import emailjs from '@emailjs/browser';

// Types for form data and validation
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

interface SubmissionState {
    isSubmitting: boolean;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
}

const Contact = ({ activeSection, backSection }: PageProps) => {
    // Form data state
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Form validation errors
    const [errors, setErrors] = useState<FormErrors>({});

    // Submission state
    const [submissionState, setSubmissionState] = useState<SubmissionState>({
        isSubmitting: false,
        isSuccess: false,
        isError: false,
        errorMessage: ''
    });

    // Form reference for EmailJS
    const formRef = useRef<HTMLFormElement>(null);

    // EmailJS configuration (you'll need to replace these with your actual values)
    const EMAILJS_CONFIG = {
        SERVICE_ID: 'service_fsmj4vc', // e.g., 'service_abc123'
        TEMPLATE_ID: 'template_ybu2k0e', // e.g., 'template_xyz789'
        PUBLIC_KEY: 'N7FHRJ9dt-dw7GkOJ' // e.g., 'user_mnop456'
    };

    // Initialize EmailJS (call this in your main app component or here)
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate form data
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        } else if (formData.subject.trim().length < 5) {
            newErrors.subject = 'Subject must be at least 5 characters long';
        }

        // Message validation
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }

        // Clear success/error states when user modifies form
        if (submissionState.isSuccess || submissionState.isError) {
            setSubmissionState(prev => ({
                ...prev,
                isSuccess: false,
                isError: false,
                errorMessage: ''
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        // Check if EmailJS is configured
        if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
            setSubmissionState({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                errorMessage: 'EmailJS is not configured. Please add your EmailJS credentials.'
            });
            return;
        }

        // Start submission
        setSubmissionState({
            isSubmitting: true,
            isSuccess: false,
            isError: false,
            errorMessage: ''
        });

        try {
            // Send email using EmailJS
            const result = await emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                formRef.current!,
                EMAILJS_CONFIG.PUBLIC_KEY
            );

            console.log('Email sent successfully:', result);

            // Success state
            setSubmissionState({
                isSubmitting: false,
                isSuccess: true,
                isError: false,
                errorMessage: ''
            });

            // Reset form data
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

            // Clear errors
            setErrors({});

        } catch (error) {
            console.error('Email sending failed:', error);
            
            setSubmissionState({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                errorMessage: 'Failed to send message. Please try again or contact me directly.'
            });
        }
    };

    // Get input class with error styling
    const getInputClass = (fieldName: keyof FormErrors): string => {
        const baseClass = 'form-control';
        return errors[fieldName] ? `${baseClass} error` : baseClass;
    };

    return (
        <>
            <section 
                className={`contact section${activeSection === 'contact' ? ' active' : ''} ${backSection === 'contact' ? ' back-section' : ''}`} 
                id="contact"
            >
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
                            <div className="icon">
                                <i className="fa fa-phone"></i>
                            </div>
                            <h4>Call us on</h4>
                            <p>
                                <a href="tel:+918103745458" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    +91 810 374 5458
                                </a>
                            </p>
                        </div>

                        <div className="contact-info-item padd-15">
                            <div className="icon">
                                <i className="fa fa-map-marker-alt"></i>
                            </div>
                            <h4>Office</h4>
                            <p>Indore</p>
                        </div>

                        <div className="contact-info-item padd-15">
                            <div className="icon">
                                <i className="fa fa-envelope"></i>
                            </div>
                            <h4>Email</h4>
                            <p>
                                <a href="mailto:mohsinraj406@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    mohsinraj406@gmail.com
                                </a>
                            </p>
                        </div>

                        <div className="contact-info-item padd-15">
                            <div className="icon">
                                <i className="fa fa-globe"></i>
                            </div>
                            <h4>Website</h4>
                            <p>
                                <a href="https://www.domain.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    www.domain.com
                                </a>
                            </p>
                        </div>
                    </div>

                    <h3 className="contact-title padd-15">Send me an email</h3>
                    <h4 className="contact-subtitle padd-15">
                        I'll contact you as soon as possible!
                    </h4>

                    {/* Success Message */}
                    {submissionState.isSuccess && (
                        <div className="row">
                            <div className="padd-15">
                                <div style={{
                                    background: '#d4edda',
                                    color: '#155724',
                                    padding: '15px',
                                    borderRadius: '5px',
                                    border: '1px solid #c3e6cb',
                                    marginBottom: '20px'
                                }}>
                                    <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {submissionState.isError && (
                        <div className="row">
                            <div className="padd-15">
                                <div style={{
                                    background: '#f8d7da',
                                    color: '#721c24',
                                    padding: '15px',
                                    borderRadius: '5px',
                                    border: '1px solid #f5c6cb',
                                    marginBottom: '20px'
                                }}>
                                    <strong>Error:</strong> {submissionState.errorMessage}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="row">
                        <div className="contact-form padd-15">
                            <form ref={formRef} onSubmit={handleSubmit} noValidate>
                                <div className="row">
                                    <div className="form-item col-6 padd-15">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                className={getInputClass('name')}
                                                placeholder="Name *"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                disabled={submissionState.isSubmitting}
                                                aria-invalid={!!errors.name}
                                                aria-describedby={errors.name ? 'name-error' : undefined}
                                            />
                                            {errors.name && (
                                                <span id="name-error" className="error-message" style={{
                                                    color: '#dc3545',
                                                    fontSize: '0.875rem',
                                                    marginTop: '5px',
                                                    display: 'block'
                                                }}>
                                                    {errors.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-item col-6 padd-15">
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                className={getInputClass('email')}
                                                placeholder="Email *"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                disabled={submissionState.isSubmitting}
                                                aria-invalid={!!errors.email}
                                                aria-describedby={errors.email ? 'email-error' : undefined}
                                            />
                                            {errors.email && (
                                                <span id="email-error" className="error-message" style={{
                                                    color: '#dc3545',
                                                    fontSize: '0.875rem',
                                                    marginTop: '5px',
                                                    display: 'block'
                                                }}>
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-item col-12 padd-15">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="subject"
                                                className={getInputClass('subject')}
                                                placeholder="Subject *"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                disabled={submissionState.isSubmitting}
                                                aria-invalid={!!errors.subject}
                                                aria-describedby={errors.subject ? 'subject-error' : undefined}
                                            />
                                            {errors.subject && (
                                                <span id="subject-error" className="error-message" style={{
                                                    color: '#dc3545',
                                                    fontSize: '0.875rem',
                                                    marginTop: '5px',
                                                    display: 'block'
                                                }}>
                                                    {errors.subject}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-item col-12 padd-15">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                id="message"
                                                className={getInputClass('message')}
                                                placeholder="Message *"
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                disabled={submissionState.isSubmitting}
                                                aria-invalid={!!errors.message}
                                                aria-describedby={errors.message ? 'message-error' : undefined}
                                            />
                                            {errors.message && (
                                                <span id="message-error" className="error-message" style={{
                                                    color: '#dc3545',
                                                    fontSize: '0.875rem',
                                                    marginTop: '5px',
                                                    display: 'block'
                                                }}>
                                                    {errors.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-item col-12 padd-15">
                                        <div className="form-group">
                                            <button 
                                                type="submit" 
                                                className="btn"
                                                disabled={submissionState.isSubmitting}
                                                style={{
                                                    opacity: submissionState.isSubmitting ? 0.7 : 1,
                                                    cursor: submissionState.isSubmitting ? 'not-allowed' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '10px'
                                                }}
                                            >
                                                {submissionState.isSubmitting && (
                                                    <span style={{
                                                        display: 'inline-block',
                                                        width: '16px',
                                                        height: '16px',
                                                        border: '2px solid transparent',
                                                        borderTop: '2px solid currentColor',
                                                        borderRadius: '50%',
                                                        animation: 'spin 1s linear infinite'
                                                    }} />
                                                )}
                                                {submissionState.isSubmitting ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Add spinner animation styles */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .form-control.error {
                    border-color: #dc3545;
                    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
                }
                
                .form-control:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                }
            `}</style>
        </>
    );
};

export default Contact;