'use server';

import handler from '../features/fetch-tables/fetch-tables';

export default async function Home() {
	await handler();
	return <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>;
}
