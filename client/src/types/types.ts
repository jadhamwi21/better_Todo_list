export interface SignupFormDataInterface {
	username: string;
	password: string;
	confirmpassword: string;
}
export interface SigninFormDataInterface {
	username: string;
	password: string;
}

export interface AuthContextInterface {
	signup: (username: string, password: string) => Promise<any>;
	signin: (username: string, password: string) => Promise<any>;
	signout: () => void;
}

export interface ModalStateInterface {
	Component: ((props: any) => JSX.Element) | null;
	ContainerColor: string | null;
	ModalProps: any;
}

export interface ModalContextInterface {
	SetModal: <T>(
		Component: ((props: T) => JSX.Element) | null,
		mMdalProps: T | null,
		ContainerColor: string | null
	) => void;
}

export interface IUser {
	checking: boolean;
	isAuth: boolean;
}

export type SetIsAuthPayload = boolean;

export type SetCheckingPayload = boolean;

export interface UsePeriodicActionProps {
	action: Function;
	// number refers to minutes
	callEvery: number;
}

export type IntervalRefType = null | number;

export interface UseRefreshTokenRotationProps {
	rotateEvery: number;
}
export type TodoStatus = "completed" | "in progress";

export interface Todo {
	name: string;
	status: TodoStatus;
}
export type List = Todo[];

export type Lists = { [listName: string]: List };

export interface ListStateInterface {
	SelectedList: string;
	ListsWithTodos: Lists;
}
export type SelectListPayloadType = string;

export type AddListPayloadType = string;

export type AddTodoPayloadType = { listName: string; todoName: string };

export type DeleteTodoPayloadType = { listName: string; todoName: string };

export type ChangeTodoStatusPayloadType = {
	todoName: string;
	todoStatus: TodoStatus;
	listName: string;
};

export type DeleteListPayloadType = string;
