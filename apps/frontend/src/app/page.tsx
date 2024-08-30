import HeaderHome from '../components/header-home';
import { IconBrandGithub } from '@tabler/icons-react';
import { Brain, FileText, FlaskRound, Workflow } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<HeaderHome />
			<main className="flex h-full flex-col items-center justify-center bg-dark1 overflow-x-hidden">
				<section className="grid place-items-center w-full max-w-[90vw] h-screen">
					<div className="flex flex-col items-center gap-2">
						<div className="relative w-full">
							<h1 className="flex flex-col items-center w-full text-4xl sm:text-5xl lg:text-7xl">
								<span className="text-transparent bg-clip-text bg-gradient-to-b from-accent to-accent1">
									Effortless AI-driven
								</span>
								<span className="text-transparent -mt-4 h-fit bg-clip-text bg-gradient-to-b from-light to-light3 leading-normal">
									database management
								</span>
							</h1>
							<span className="absolute bottom-0 -right-5 text-md text-light3">Beta</span>
						</div>

						<p className="font-semibold text-light2 text-center w-[600px] max-w-[70vw] text-sm sm:text-lg leading-none">
							Connect your database, visualize data, and manage it seamlessly using AI-generated queries.
							No expertise required—just simple, intuitive control over your database in one powerful app
						</p>
						<div className="flex items-center gap-5 mt-10">
							<Link
								href={'/sign-up'}
								className="p-2 border border-accent bg-accent font-semibold text-dark rounded-lg text-sm  hover:bg-accent1 duration-200">
								Start your project
							</Link>
							<Link
								href={'https://github.com/oscarprdev/db-ai-management'}
								target="blank"
								className="flex items-center gap-2 py-3 px-2 border border-dark4 text-light2 rounded-lg text-sm hover:text-light1 hover:bg-dark3 duration-200">
								<IconBrandGithub size={18} />
								Open source
							</Link>
						</div>
					</div>
				</section>
				<section className="h-screen w-screen grid grid-rows-2 gap-4 px-20 py-10 ">
					<div className="grid grid-cols-5 gap-4 ">
						<div className="group relative col-span-3 border border-dark3 rounded-xl bg-gradient-to-t from-dark1 to-dark2 overflow-hidden hover:border-dark4 duration-200">
							<div className="grid grid-cols-3 gap-2 w-full p-8">
								<div className="col-span-1 flex flex-col gap-2">
									<div className="size-12 grid place-items-center border border-dark5 shadow-2xl rounded-xl">
										<Workflow size={20} className="text-light4" />
									</div>
									<h4>Database flow visualization</h4>
									<p className="text-sm text-light3">
										Instantly see your tables and relationships in an intuitive, interactive
										flowchart.
									</p>
								</div>
							</div>
							<picture className="absolute blur-[5px] grayscale-[80%] w-[600px] top-6 left-[18em] border border-dark5 grid rounded-2xl overflow-hidden group-hover:animate-blur-out shadow-xl">
								<Image
									alt="data visualization"
									src={
										'https://pub-ce52771eb1a24f618e755dedadf1cd10.r2.dev/Captura%20de%20pantalla%202024-08-30%20a%20las%2014.16.22.png'
									}
									width={1000}
									height={800}
									className="rounded-2xl"
								/>
							</picture>
						</div>
						<div className="group relative col-span-2 border border-dark3 rounded-xl bg-gradient-to-t from-dark1 to-dark2 overflow-hidden hover:border-dark4 duration-200">
							<div className="grid grid-cols-2 gap-2 w-full p-8">
								<div className="col-span-1 flex flex-col gap-2">
									<div className="size-12 grid place-items-center border border-dark5 shadow-2xl rounded-xl">
										<FileText size={20} className="text-light4" />
									</div>
									<h4>Detailed view</h4>
									<p className="text-sm text-light3 w-2/3">
										Browse your tables values and export them in JSON file.
									</p>
								</div>
							</div>
							<picture className="absolute blur-[5px] grayscale-[80%] w-[500px] top-6 left-[13em] border border-dark5 grid rounded-3xl overflow-hidden group-hover:animate-blur-out shadow-xl">
								<Image
									alt="data visualization"
									src={
										'https://pub-ce52771eb1a24f618e755dedadf1cd10.r2.dev/Captura%20de%20pantalla%202024-08-30%20a%20las%2013.03.57.png'
									}
									width={1000}
									height={800}
									className="rounded-3xl"
								/>
							</picture>
						</div>
					</div>
					<div className="grid grid-cols-5 gap-4">
						<div className="group relative col-span-2 border border-dark3 rounded-xl bg-gradient-to-t from-dark1 to-dark2 overflow-hidden hover:border-dark4 duration-200">
							<div className="grid grid-cols-2 gap-2 w-full p-8">
								<div className="col-span-1 flex flex-col gap-2">
									<div className="size-12 grid place-items-center border border-dark5 shadow-2xl rounded-xl">
										<FlaskRound size={20} className="text-light4" />
									</div>
									<h4>Manage your queries</h4>
									<p className="text-sm text-light3 w-2/3">
										Review and reapply AI-generated queries with ease.
									</p>
								</div>
							</div>
							<picture className="absolute blur-[5px] grayscale-[80%] w-[500px] top-4 left-[13em] border border-dark5 grid rounded-3xl overflow-hidden group-hover:animate-blur-out shadow-xl">
								<Image
									alt="data visualization"
									src={
										'https://pub-ce52771eb1a24f618e755dedadf1cd10.r2.dev/Captura%20de%20pantalla%202024-08-30%20a%20las%2013.03.36.png'
									}
									width={1000}
									height={800}
									className="rounded-3xl"
								/>
							</picture>
						</div>
						<div className="group relative col-span-3 border border-dark3 rounded-xl bg-gradient-to-t from-dark1 to-dark2 overflow-hidden hover:border-dark4 duration-200">
							<div className="grid grid-cols-2 gap-2 w-full p-8">
								<div className="col-span-1 flex flex-col gap-2">
									<div className="size-12 grid place-items-center border border-dark5 shadow-2xl rounded-xl">
										<Brain size={20} className="text-light4" />
									</div>
									<h4>Query generator</h4>
									<p className="text-sm text-light3 w-2/3">
										Generate, edit and apply queries to your database directly from just a simple
										prompt.
									</p>
								</div>
							</div>
							<picture className="absolute blur-[5px] grayscale-[80%] w-[600px] top-4 left-[20em] border border-dark5 grid rounded-3xl overflow-hidden group-hover:animate-blur-out shadow-xl">
								<Image
									alt="data visualization"
									src={
										'https://pub-ce52771eb1a24f618e755dedadf1cd10.r2.dev/Captura%20de%20pantalla%202024-08-30%20a%20las%2014.20.52.png'
									}
									width={1000}
									height={800}
									className="rounded-3xl -translate-y-32"
								/>
							</picture>
						</div>
					</div>
				</section>
				<section className="h-screen w-screen flex flex-col gap-20 px-20 py-10 ">
					<div className="flex flex-col items-center gap-10">
						<h1 className="flex flex-col items-center w-full text-2xl sm:text-3xl lg:text-4xl">
							<span className="text-transparent bg-clip-text bg-gradient-to-b from-light to-light2">
								Contribute to Our Open Source Journey
							</span>
						</h1>
						<p className="text-light3 text-center max-w-[500px]">
							This project is in Beta, and your feedback is invaluable. Share your thoughts on GitHub—open
							issues and PRs are greatly appreciated!.
						</p>
						<Link
							href={'https://github.com/oscarprdev/db-ai-management'}
							target="blank"
							className="flex items-center gap-2 py-3 px-2 border border-dark4 text-light2 rounded-lg text-sm hover:text-light1 hover:bg-dark3 duration-200">
							<IconBrandGithub size={18} />
							Project repositoy
						</Link>
					</div>
					<div className="w-full flex flex-col">
						<h1 className="flex flex-col items-center w-full text-xl sm:text-1xl lg:text-2xl">
							<span className="text-transparent bg-clip-text bg-gradient-to-b from-light to-light2">
								Project tech stack
							</span>
						</h1>
					</div>
				</section>
			</main>
		</>
	);
}
