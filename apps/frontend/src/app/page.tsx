import CreateProjectModal from '../components/Modals/CreateProjectModal/CreateProjectModal';

export default function Home() {
	return (
		<main className="flex h-screen flex-col items-center justify-center p-24 bg-background">
			<CreateProjectModal />
		</main>
	);
}
