import { action } from 'typesafe-actions';
import { InputActionTypes } from './types';

export const setSearchFilter = (filter: string) => action(
	InputActionTypes.SetSearchFilter,
	filter,
);
