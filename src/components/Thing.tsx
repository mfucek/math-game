'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useScore } from './ScoreProvider';

const ThingClick = ({
	val,
	correct,
	onClick
}: {
	val: number;
	correct: number;
	onClick: () => void;
}) => {
	const [bg, setBg] = useState(false);
	return (
		<div
			className={classNames(
				'w-full h-40 bg-gray-900 text-center text-2xl font-bold flex items-center justify-center rounded-2xl',
				bg && (val == correct ? 'bg-green-500' : 'bg-red-500')
			)}
			onClick={() => {
				setBg(true);
				setTimeout(() => {
					onClick();
					setBg(false);
				}, 500);
			}}>
			{val}
		</div>
	);
};

const baseTime = 100;
let currentTime = baseTime;
let lastTick = 0;

let startTime = Date.now();

const Timer = ({ time: _ }: { time: number }) => {
	const [time, setTime] = useState(baseTime);

	const router = useRouter();

	useEffect(() => {
		const interval = setInterval(() => {
			const deltaTime = lastTick == 0 ? 0 : (Date.now() - lastTick) / 1000;
			lastTick = Date.now();

			const rate = (Date.now() - startTime) ** (1 / 2) * 0.05;

			currentTime -= deltaTime * rate;
			setTime(currentTime);

			if (currentTime <= 0) {
				clearInterval(interval);
				router.push('/end');
			}
		}, 16);
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div className="absolute w-full p-10">
				<div className="w-full h-10 bg-gray-900 rounded-2xl overflow-hidden">
					<div
						className="h-full bg-gray-500 rounded-2xl"
						style={{ width: time + '%' }}
					/>
				</div>
			</div>
		</>
	);
};

export const Thing = () => {
	const [first, setFirst] = useState(0);
	const [second, setSecond] = useState(0);

	const [ans, setAns] = useState([0, 0, 0]);

	useEffect(() => {
		const [f, s] = makeNew();
		setFirst(f);
		setSecond(s);
		setAns(
			[
				Math.floor(Math.random() * 10),
				Math.abs(f - s),
				Math.floor(Math.random() * 10)
			].sort(() => (Math.random() > 0.5 ? 1 : -1))
		);
	}, []);

	const makeNew = (): [number, number] => {
		let f = Math.floor(Math.random() * 10);
		let s = Math.floor(Math.random() * 10);
		console.log(f, s);

		if (f === s) {
			return makeNew();
		}

		return [f, s];
	};

	const { score, setScore } = useScore();

	return (
		<>
			<Timer time={25} />
			<div className="flex flex-col items-center justify-center h-screen">
				<div className="w-full text-center text-6xl font-bold mb-10">
					{first} - {second} = ?
				</div>
				<div className="w-full p-4 gap-4 flex max-w-3xl mx-auto">
					{ans.map((a, i) => (
						<ThingClick
							val={a}
							correct={Math.abs(first - second)}
							onClick={() => {
								const [f, s] = makeNew();
								setFirst(f);
								setSecond(s);
								setAns(
									[
										Math.floor(Math.random() * 10),
										Math.abs(f - s),
										Math.floor(Math.random() * 10)
									].sort(() => (Math.random() > 0.5 ? 1 : -1))
								);
								if (a === Math.abs(first - second)) {
									currentTime += 10;
									if (currentTime > baseTime) {
										currentTime = baseTime;
									}
									setScore(score + 1);
								}
							}}
						/>
					))}
				</div>
			</div>
		</>
	);
};
