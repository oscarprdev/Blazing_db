import { AuthFormMode } from '@/src/components/Forms/AuthForm/types';
import AuthContainer from '@/src/containers/AuthContainer';

function SignUpPage() {
	return (
		<AuthContainer
			title="Get started"
			subtitle="Create new account"
			text="Have an account?"
			actionFallback="/sign-in"
			actionText="Sing in now"
			mode={AuthFormMode.signup}
		/>
	);
}

export default SignUpPage;
