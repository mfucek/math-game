import { ScoreProvider } from '@/components/ScoreProvider';
import type { Metadata } from 'next';
import { NextScript } from 'next/document';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	manifest: '/manifest.json',
	themeColor: '#ffffff',
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ScoreProvider>
					{children}
					<NextScript />
				</ScoreProvider>
			</body>
		</html>
	);
}
