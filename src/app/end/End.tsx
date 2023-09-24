'use client';
import { useScore } from '@/components/ScoreProvider';
import Link from 'next/link';

export const EndComp = () => {
	const { score, setScore } = useScore();
	return (
		<>
			<div className="absolute w-full h-full flex flex-col items-center justify-center">
				<h1 className="text-9xl font-bold mb-10">Game Over</h1>
				<h2 className="text-4xl mb-10">Score: {score}</h2>
				<Link href="/">
					<button
						className="font-semibold text-4xl bg-blue-600 rounded-full h-20 px-8"
						onClick={() => {
							setScore(0);
						}}>
						Play Again
					</button>
				</Link>
			</div>
		</>
	);
};
