import { Thing } from '@/components/Thing';

export const metadata = {
	title: 'Next PWA',
	description: 'Next PWA example using next-pwa and app directory'
};

export default function Home() {
	return (
		<main className="">
			<Thing />
		</main>
	);
}
