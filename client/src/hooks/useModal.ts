import React, { useCallback, useLayoutEffect, useState } from "react";
import { object } from "yup/lib/locale";
import { ModalStateInterface } from "../types/types";

export const useModal = () => {
	const [ModalState, setModalState] = useState<ModalStateInterface>({
		Component: null,
		ContainerColor: null,
		ModalProps: null,
	});

	const SetModal = useCallback(
		<T>(
			Component: ((props: T) => JSX.Element) | null,
			ModalProps: T | null,
			ContainerColor: string | null
		) => {
			setModalState({
				Component,
				ContainerColor,
				ModalProps,
			});
		},
		[]
	);

	useLayoutEffect(() => {
		if (ModalState.Component && ModalState.ContainerColor) {
			const OriginalOnScrollHandler = document.body.onscroll;
			document.body.onscroll = () => {};
			return () => {
				document.body.onscroll = OriginalOnScrollHandler;
			};
		}
	}, [ModalState]);

	return { SetModal, ModalState };
};
