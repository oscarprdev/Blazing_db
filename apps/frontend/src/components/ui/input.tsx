import { cn } from '@/src/lib/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-10 w-full rounded-md border border-dark4 bg-dark2 px-3 py-2 text-sm ring-offset-dark3 hover:bg-dark1 duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-light5 placeholder:text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-dark5 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = 'Input';

export { Input };