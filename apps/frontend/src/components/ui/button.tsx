import { cn } from '@/src/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
	'inline-flex items-center rounded-md text-dark justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light2 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 duration-300',
	{
		variants: {
			variant: {
				default: 'bg-white hover:bg-light1',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				accent: 'bg-accent hover:bg-accent1 hover:border-accent2 font-semibold text-light border border-accent1',
				icon: 'bg-transparent hover:bg-transparent hover:text-light',
				ghost: 'bg-transparent hover:bg-dark2 hover:text-light text-light1',
			},
			size: {
				default: 'px-6 py-2',
				sm: 'h-7 px-2',
				md: 'h-9 px-4',
				lg: 'h-11 px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
