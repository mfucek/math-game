'use client';

import { createContext, useContext, useState } from 'react';

type ScoreContextType = {
	score: number;
	setScore: (score: number) => void;
};

const scoreContext = createContext({
	score: 0,
	setScore: (score: number) => {}
});

export const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
	const [score, setScore] = useState(0);
	return (
		<scoreContext.Provider value={{ score, setScore }}>
			{children}
		</scoreContext.Provider>
	);
};

export const useScore = () => useContext(scoreContext);
