import ContainerAuthPage from '@/src/components/container-auth-page';
import { FormAuthMode } from '@/src/lib/types';

function SignInPage() {
	return (
		<ContainerAuthPage
			title="Welcome back"
			subtitle="Sign in to your account"
			text={`Don't have an account?`}
			actionFallback="/sign-up"
			actionText="Sing up now"
			mode={FormAuthMode.login}
		/>
	);
}

export default SignInPage;
