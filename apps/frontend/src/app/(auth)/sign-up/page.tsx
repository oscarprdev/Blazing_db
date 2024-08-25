import ContainerAuthPage from '@/src/components/container-auth-page';
import { FormAuthMode } from '@/src/lib/types';

function SignUpPage() {
	return (
		<ContainerAuthPage
			title="Get started"
			subtitle="Create new account"
			text="Have an account?"
			actionFallback="/sign-in"
			actionText="Sing in now"
			mode={FormAuthMode.signup}
		/>
	);
}

export default SignUpPage;
