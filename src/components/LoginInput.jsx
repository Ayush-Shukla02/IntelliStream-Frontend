import React, { useState } from "react";
import { motion } from "framer-motion";

const LoginInput = ({
	placeholder,
	icon,
	inputState,
	inputStateFunc,
	type,
}) => {
	const [isFocus, setIsFocus] = useState(false);
	return (
		<motion.div
			className={`flex items-center justify-center gap-4  backdrop-blur-md rounded-md w-full px-4 py-2 ${
				isFocus ? "shadow-md shadow-orange-700" : "shadow-none"
			}`}
			style={{background:"rgba(256,256,256,.2)"}}
		>
			{icon}
			<input
				type={type}
				placeholder={placeholder}
				className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
				style={{color :"white"}}
				value={inputState}
				onChange={(e) => inputStateFunc(e.target.value)}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
			/>
		</motion.div>
	);
};

export default LoginInput;
