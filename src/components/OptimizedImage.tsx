import { useState } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
}

const OptimizedImage = ({ src, alt, width, height, className, priority = false }: OptimizedImageProps) => {
    const [isError, setIsError] = useState(false);
    const fallbackImage = '/images/placeholder.jpg';

    const handleError = () => {
        if (!isError) {
            setIsError(true);
        }
    };

    const imageProps = {
        src: isError ? fallbackImage : src,
        alt,
        width,
        height,
        className,
        loading: priority ? 'eager' as const : 'lazy' as const,
        decoding: 'async' as const,
        onError: handleError,
        style: { objectFit: 'cover' } as const,
    };

    return (
        <img {...imageProps} />
    );
};

export default OptimizedImage; 