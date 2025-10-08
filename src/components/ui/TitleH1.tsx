import clsx from "clsx";

const TitleH1 = ({ text, className }: { text: string; className?: string }) => (
	<h1
		className={clsx(
			"uppercase font-extrabold text-[54px]/16 lg:text-8xl/30 md:max-w-2/3 2xl:max-w-full",
			className
		)}
	>
		{text}
	</h1>
);

export default TitleH1;
