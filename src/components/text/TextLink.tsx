export interface TextLinkProps {
    caption: string;
    href: string;
    className?: string;
}

export function TextLink({ caption, href, className }: TextLinkProps) {
    return (
        <a href={href} className={className}>
            {caption}
        </a>
    );
}
