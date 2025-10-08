import clsx from "clsx";

const TitleH2 = ({ text, newClass }: { text: string; newClass?: string }) => (
	<h2 className={clsx("text-2xl font-bold", newClass)}>{text}</h2>
);

export default TitleH2;
