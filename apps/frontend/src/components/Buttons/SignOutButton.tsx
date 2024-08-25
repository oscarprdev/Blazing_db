import { Button } from '../ui/button';
import { signOut } from '@/src/auth';

function SignOutButton() {
	return (
		<form
			action={async () => {
				'use server';
				await signOut();
			}}>
			<Button variant={'secondary'} type="submit">
				Sign Out
			</Button>
		</form>
	);
}

export default SignOutButton;
