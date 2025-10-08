import Hero from "@/components/home/Hero";
import Materials from "@/components/home/Materials";
import Tariffs from "@/components/home/Tariffs";
import { notFound } from "next/navigation";

export default function Home() {
	// notFound();

	return (
		<>
			<Hero />
			<Tariffs />
			<Materials />
		</>
	);
}
