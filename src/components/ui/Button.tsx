import clsx from "clsx";

interface ButtonProps {
	text?: string;
	discount?: boolean;
	className?: string;
	onClick?: () => void;
	typeButton?: "button" | "submit" | "reset";
	children?: React.ReactNode;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	text,
	discount = false,
	className,
	onClick,
	typeButton = "button",
	children,
	disabled = false,
}) => (
	<button
		onClick={onClick}
		className={clsx(
			"custom-transition-hover hover:cursor-pointer",
			discount &&
				"relative before:content-['-50%'] before:text-white  before:absolute before:size-15 lg:before:size-[74px] before:rounded-full before:bg-wild-watermelon before:right-0 before:flex before:items-center before:justify-center before:text-xl before:lg:text-2xl",
			className
		)}
		type={typeButton}
		disabled={disabled}
	>
		{text}
		{children}
	</button>
);

export default Button;
