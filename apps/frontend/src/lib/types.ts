export type Either<E, A> = Error<E> | Success<A>;

export interface Error<E> {
	readonly _tag: 'Error';
	readonly error: E;
}

export const errorResponse = <E, A = never>(e: E): Either<E, A> => ({
	_tag: 'Error',
	error: e,
});

export interface Success<A> {
	readonly _tag: 'Success';
	readonly success: A;
}

export const successResponse = <A, E = never>(a: A): Either<E, A> => ({
	_tag: 'Success',
	success: a,
});

export const isError = <E, A>(a: Either<E, A>): a is Error<E> => a._tag === 'Error';
