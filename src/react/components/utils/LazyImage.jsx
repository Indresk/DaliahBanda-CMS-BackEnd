import { useEffect, useRef, useState } from 'react';

export default function LazyImage({ src, alt = '', className = '' }) {
	const containerRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const element = containerRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(element);
				}
			},
			{
				rootMargin: '200px',
				threshold: 0.1,
			},
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={containerRef}
			style={{
				width: '100%',
				overflow: 'hidden',
				borderRadius: '0.25rem',
				backgroundColor: '#838383',
			}}
			className={className}>
			{!isVisible ? (
				<div
					style={{
						height: '100%',
						width: '100%',
						backgroundColor: '#e5e7eb',
						animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
					}}
				/>
			) : (
				<img
					src={src}
					alt={alt}
					loading='lazy'
					decoding='async'
					onLoad={() => setIsLoaded(true)}
					style={{
						height: '100%',
						width: '100%',
						objectFit: 'cover',
						transition: 'opacity 300ms',
						opacity: isLoaded ? 1 : 0,
					}}
				/>
			)}
		</div>
	);
}
