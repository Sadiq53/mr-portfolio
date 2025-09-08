import type { PageProps } from "../../types/ui";
import { useState, useRef, useEffect, type FormEvent } from "react";
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

    // EmailJS configuration
    const EMAILJS_CONFIG = {
        SERVICE_ID: 'service_fsmj4vc',
        TEMPLATE_ID: 'template_ybu2k0e',
        PUBLIC_KEY: 'N7FHRJ9dt-dw7GkOJ'
    };

    // Initialize EmailJS only once
    useEffect(() => {
        try {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        } catch (error) {
            console.error('EmailJS initialization failed:', error);
        }
    }, []);

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate form data
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        const trimmedName = formData.name.trim();
        if (!trimmedName) {
            newErrors.name = 'Name is required';
        } else if (trimmedName.length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        } else if (trimmedName.length > 50) {
            newErrors.name = 'Name must be less than 50 characters';
        }

        // Email validation
        const trimmedEmail = formData.email.trim();
        if (!trimmedEmail) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(trimmedEmail)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (trimmedEmail.length > 100) {
            newErrors.email = 'Email must be less than 100 characters';
        }

        // Subject validation
        const trimmedSubject = formData.subject.trim();
        if (!trimmedSubject) {
            newErrors.subject = 'Subject is required';
        } else if (trimmedSubject.length < 5) {
            newErrors.subject = 'Subject must be at least 5 characters long';
        } else if (trimmedSubject.length > 100) {
            newErrors.subject = 'Subject must be less than 100 characters';
        }

        // Message validation
        const trimmedMessage = formData.message.trim();
        if (!trimmedMessage) {
            newErrors.message = 'Message is required';
        } else if (trimmedMessage.length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        } else if (trimmedMessage.length > 1000) {
            newErrors.message = 'Message must be less than 1000 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        
        // Prevent XSS by sanitizing input (basic sanitization)
        const sanitizedValue = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        setFormData(prev => ({
            ...prev,
            [name]: sanitizedValue
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
            // Focus on first error field
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField && formRef.current) {
                const field = formRef.current.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
                field?.focus();
            }
            return;
        }

        // Check if EmailJS is configured properly
        if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID || !EMAILJS_CONFIG.PUBLIC_KEY) {
            setSubmissionState({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                errorMessage: 'Email service is not properly configured. Please contact the administrator.'
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
            // Validate that form ref exists
            if (!formRef.current) {
                throw new Error('Form reference is not available');
            }

            // Send email using EmailJS with timeout
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), 10000)
            );

            const emailPromise = emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                formRef.current,
                EMAILJS_CONFIG.PUBLIC_KEY
            );

            const result = await Promise.race([emailPromise, timeoutPromise]);

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

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                setSubmissionState(prev => ({ ...prev, isSuccess: false }));
            }, 5000);

        } catch (error) {
            console.error('Email sending failed:', error);
            
            let errorMessage = 'Failed to send message. Please try again later.';
            
            // Handle different types of errors
            if (error instanceof Error) {
                if (error.message.includes('timeout')) {
                    errorMessage = 'Request timed out. Please check your connection and try again.';
                } else if (error.message.includes('network')) {
                    errorMessage = 'Network error. Please check your internet connection.';
                } else if (error.message.includes('service')) {
                    errorMessage = 'Email service is temporarily unavailable. Please try again later.';
                }
            }
            
            setSubmissionState({
                isSubmitting: false,
                isSuccess: false,
                isError: true,
                errorMessage
            });

            // Auto-hide error message after 8 seconds
            setTimeout(() => {
                setSubmissionState(prev => ({ ...prev, isError: false, errorMessage: '' }));
            }, 8000);
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
                className={`contact section${activeSection === 'contact' ? ' active' : ''}${backSection === 'contact' ? ' back-section' : ''}`} 
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
                                <i className="fa fa-phone" aria-hidden="true"></i>
                            </div>
                            <h4>Call us on</h4>
                            <p>
                                <a 
                                    href="tel:+918103745458" 
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    aria-label="Call us at +91 810 374 5458"
                                >
                                    +91 810 374 5458
                                </a>
                            </p>
                        </div>

                        <div className="contact-info-item padd-15">
                            <div className="icon">
                                <i className="fa fa-map-marker-alt" aria-hidden="true"></i>
                            </div>
                            <h4>Office</h4>
                            <p>Indore</p>
                        </div>

                        <div className="contact-info-item padd-15">
                            <div className="icon">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </div>
                            <h4>Email</h4>
                            <p>
                                <a 
                                    href="mailto:mohsinraj406@gmail.com" 
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    aria-label="Send email to mohsinraj406@gmail.com"
                                >
                                    mohsinraj406@gmail.com
                                </a>
                            </p>
                        </div>

                        <div className="contact-info-item padd-15">
                            <div className="icon">
                                <i className="fa fa-globe" aria-hidden="true"></i>
                            </div>
                            <h4>Website</h4>
                            <p>
                                <a 
                                    href="https://www.domain.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                    aria-label="Visit our website (opens in new tab)"
                                >
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
                                <div 
                                    role="alert"
                                    style={{
                                        background: '#d4edda',
                                        color: '#155724',
                                        padding: '15px',
                                        borderRadius: '5px',
                                        border: '1px solid #c3e6cb',
                                        marginBottom: '20px'
                                    }}
                                >
                                    <strong>Success!</strong> Your message has been sent successfully. I'll get back to you soon!
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {submissionState.isError && (
                        <div className="row">
                            <div className="padd-15">
                                <div 
                                    role="alert"
                                    style={{
                                        background: '#f8d7da',
                                        color: '#721c24',
                                        padding: '15px',
                                        borderRadius: '5px',
                                        border: '1px solid #f5c6cb',
                                        marginBottom: '20px'
                                    }}
                                >
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
                                                maxLength={50}
                                                autoComplete="name"
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
                                                maxLength={100}
                                                autoComplete="email"
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
                                                maxLength={100}
                                                autoComplete="off"
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
                                                maxLength={1000}
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
                                                aria-describedby="submit-help"
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
                                                    <span 
                                                        aria-label="Loading"
                                                        style={{
                                                            display: 'inline-block',
                                                            width: '16px',
                                                            height: '16px',
                                                            border: '2px solid transparent',
                                                            borderTop: '2px solid currentColor',
                                                            borderRadius: '50%',
                                                            animation: 'spin 1s linear infinite'
                                                        }} 
                                                    />
                                                )}
                                                {submissionState.isSubmitting ? 'Sending...' : 'Send Message'}
                                            </button>
                                            <small id="submit-help" style={{ display: 'block', marginTop: '5px', color: '#6c757d' }}>
                                                All fields marked with * are required
                                            </small>
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
                    border-color: #dc3545 !important;
                    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
                }
                
                .form-control:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                }
                
                .form-control:disabled {
                    background-color: #e9ecef;
                    opacity: 1;
                }
                
                .error-message {
                    font-size: 0.875rem;
                    color: #dc3545;
                    margin-top: 0.25rem;
                    display: block;
                }
                
                @media (max-width: 768px) {
                    .col-6 {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    );
};

export default Contact;