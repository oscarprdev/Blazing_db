/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pub-ce52771eb1a24f618e755dedadf1cd10.r2.dev',
				port: '',
				pathname: '**',
			},
		],
	},
};

export default nextConfig;
