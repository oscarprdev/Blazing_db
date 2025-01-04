import QueryProvider from '../lib/providers/tanstack-query';
import '@/src/app/globals.css';
import { cn } from '@/src/lib/utils';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
	title: 'BlazingDb',
	description: 'Database management powered by AI',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={cn('font-sans antialiased bg-dark', GeistSans.variable, GeistMono.variable)}>
				<QueryProvider>{children}</QueryProvider>
				<Toaster
					toastOptions={{
						classNames: {
							error: 'text-destructive',
							success: 'text-light1',
						},
						style: {
							background: '#181818',
							borderColor: '#363636',
						},
						className: 'class',
					}}
				/>
			</body>
		</html>
	);
}
