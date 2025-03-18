import { ReactNode } from "react";
import { useParamId } from "../lib/hooks";
import { ActiveIDContext } from "./ActiveIDContext";

export default function ActiveIDContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const paramId = useParamId();
	return (
		<ActiveIDContext.Provider
			value={{
				paramId,
			}}
		>
			{children}
		</ActiveIDContext.Provider>
	);
}
