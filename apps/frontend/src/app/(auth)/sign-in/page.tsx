import { AuthFormMode } from '@/src/components/Forms/AuthForm/types';
import AuthContainer from '@/src/containers/AuthContainer';

function SignInPage() {
	return (
		<AuthContainer
			title="Welcome back"
			subtitle="Sign in to your account"
			text={`Don't have an account?`}
			actionFallback="/sign-up"
			actionText="Sing up now"
			mode={AuthFormMode.login}
		/>
	);
}

export default SignInPage;
