import Header from '@/src/components/Header/Header';
import CreateProjectModal from '@/src/components/Modals/CreateProjectModal/CreateProjectModal';

function DashboardPage() {
	return (
		<>
			<Header />
			<main className="flex h-screen flex-col items-center justify-center p-24 bg-background">
				<CreateProjectModal />
			</main>
		</>
	);
}

export default DashboardPage;
