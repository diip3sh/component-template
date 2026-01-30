import { animate, inView, stagger } from "motion";
import { useEffect, useRef } from "react";

function App() {
	const heroRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (heroRef.current) {
			inView(heroRef.current, () => {
				animate(
					heroRef.current?.querySelectorAll(".animate-in"),
					{ opacity: [0, 1], transform: ["translateY(20px)", "none"] },
					{ duration: 0.6, delay: stagger(0.1) },
				);
			});
		}
	}, []);

	return (
		<div className="min-h-screen bg-neutral-950 text-white">
			<nav className="fixed top-0 left-0 right-0 p-6 flex items-center justify-between z-50">
				<div className="text-gray-400 text-sm font-mono">
					component-template
				</div>
				<div className="flex gap-4">
					<a
						href="https://tailwindcss.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
					>
						Tailwind
					</a>
					<a
						href="https://biomejs.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-lime-400 transition-colors text-sm"
					>
						Biome
					</a>
					<a
						href="https://motion.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
					>
						Motion
					</a>
				</div>
			</nav>

			<main
				ref={heroRef}
				className="flex flex-col items-center justify-center min-h-screen px-6"
			>
				<div className="max-w-2xl text-center space-y-8">
					<div className="animate-in opacity-0">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-400 mb-6">
							<span className="w-2 h-2 rounded-full bg-green-500"></span>
							Ready to build
						</div>
					</div>

					<h1 className="animate-in opacity-0 text-5xl md:text-6xl font-bold tracking-tight">
						Component
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
							{" "}
							Template
						</span>
					</h1>

					<p className="animate-in opacity-0 text-lg text-gray-400 max-w-lg mx-auto">
						A minimal, production-ready starting point for React components.
						Built with Tailwind CSS, Biome, and Motion.
					</p>

					<div className="animate-in opacity-0 flex flex-wrap justify-center gap-3 pt-4">
						<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
							<span className="text-cyan-400">◆</span>
							<span className="text-sm">Tailwind CSS v4</span>
						</div>
						<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
							<span className="text-lime-400">◆</span>
							<span className="text-sm">Biome Linter</span>
						</div>
						<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800">
							<span className="text-pink-400">◆</span>
							<span className="text-sm">Motion</span>
						</div>
					</div>

					<div className="animate-in opacity-0 pt-8">
						<p className="text-gray-500 text-sm mb-4">Quick commands:</p>
						<div className="flex flex-wrap justify-center gap-2">
							<code className="px-3 py-1.5 rounded bg-gray-900 border border-gray-800 text-sm font-mono text-gray-300">
								bun dev
							</code>
							<code className="px-3 py-1.5 rounded bg-gray-900 border border-gray-800 text-sm font-mono text-gray-300">
								bun run build
							</code>
							<code className="px-3 py-1.5 rounded bg-gray-900 border border-gray-800 text-sm font-mono text-gray-300">
								bun run lint
							</code>
							<code className="px-3 py-1.5 rounded bg-gray-900 border border-gray-800 text-sm font-mono text-gray-300">
								bun run format
							</code>
						</div>
					</div>
				</div>
			</main>

			<footer className="fixed bottom-6 left-0 right-0 text-center">
				<p className="text-gray-600 text-xs">
					Clone and start building → Delete this page
				</p>
			</footer>
		</div>
	);
}

export default App;
