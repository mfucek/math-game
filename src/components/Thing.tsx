'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

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

	return (
		<>
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
							}}
						/>
					))}
				</div>
			</div>
		</>
	);
};
