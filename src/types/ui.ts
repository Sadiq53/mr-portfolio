export type Section = 'home' | 'about' | 'services' | 'portfolio' | 'contact';

export interface PageProps {
    activeSection: Section;
    backSection?: Section | null;
    setActiveSection?: (section: Section) => void;
}

export interface IconProps {
    size?: number,
    color?: string
}