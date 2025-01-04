import HeaderHome from '../components/header-home';
import { ArrowUpRight, BotMessageSquare, PlugZap, Table2 } from 'lucide-react';

export default function Home() {
	return (
		<>
			<HeaderHome />
			<main className="flex h-full flex-col items-center justify-center bg-dark overflow-x-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(54,54,54,0.3),rgba(54,54,54,0))]">
				<div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-10 blur-[100px] bg-emerald-500"></div>
				<section className="grid place-items-center w-full max-w-[90vw] h-screen">
					<div className="flex flex-col items-center gap-2 mt-10">
						<div className="relative w-full">
							<h1 className="flex flex-col items-center w-full text-8xl font-extrabold">
								<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent2 to-accent">
									Effortless AI-driven
								</span>
								<span className="text-transparent -mt-4 h-fit bg-clip-text bg-gradient-to-r from-accent via-accent2 to-accent leading-normal">
									database management
								</span>
							</h1>
							<span className="absolute bottom-0 -right-5 text-md text-light2">Beta</span>
						</div>

						{/* <p className="font-semibold text-light2 text-center w-[600px] max-w-[70vw] text-sm sm:text-lg leading-none">
							Connect your database, visualize data, and manage it seamlessly using AI-generated queries.
							No expertise required—just simple, intuitive control over your database in one powerful app
						</p> */}
						<div className="grid gap-2 md:grid-cols-3 mt-5">
							<div className="relative flex flex-col items-start gap-2 p-4 md:p-6 cursor-default bg-white/5 backdrop-blur transition rounded-lg ">
								<span className="p-3 bg-white/3 rounded-lg backdrop-blur">
									<PlugZap className="text-accent2" />
								</span>
								<h3 className="text-zinc-50 text-md font-medium leading-none mt-2">Connect</h3>
								<p className="grow opacity-60 text-sm max-w-[35ch]">
									Use your existent postgreSQL database and connect it to your blazing db project
								</p>
							</div>
							<div className="relative flex flex-col items-start gap-2 p-4 md:p-6 cursor-default bg-white/5 backdrop-blur transition rounded-lg ">
								<span className="p-3 bg-white/3 rounded-lg backdrop-blur">
									<Table2 className="text-accent2" />
								</span>
								<h3 className="text-zinc-50 text-md font-medium leading-none mt-2">Visualize</h3>
								<p className="grow opacity-60 text-sm max-w-[35ch]">
									Explore your data with a visual representation of your database tables
								</p>
							</div>
							<div className="relative flex flex-col items-start gap-2 p-4 md:p-6 cursor-default bg-white/5 backdrop-blur transition rounded-lg ">
								<span className="p-3 bg-white/3 rounded-lg backdrop-blur">
									<BotMessageSquare className="text-accent2" />
								</span>
								<h3 className="text-zinc-50 text-md font-medium leading-none mt-2">AI management</h3>
								<p className="grow opacity-60 text-sm max-w-[35ch]">
									Create, select, edit and delete data with AI-generated queries
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
