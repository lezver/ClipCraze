"use client";

import toast from "react-hot-toast";
import { FormEvent, useEffect, useState } from "react";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";
import clsx from "clsx";

const inputs: string[] = ["name", "nickname", "email"] as const;

interface FormProps {
	onClose?: () => void;
	isOpen?: boolean;
}

interface FormInputs {
	name: string;
	nickname: string;
	email: string;
}

const Form = ({ onClose, isOpen }: FormProps) => {
	const [formData, setFormData] = useState<FormInputs>({
		name: "",
		nickname: "",
		email: "",
	});

	const [emailError, setEmailError] = useState<boolean>(false);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const t = useTranslations("Form");

	useEffect(() => {
		if (isOpen) {
			setFormData({ name: "", nickname: "", email: "" });
			setEmailError(false);
		}
	}, [isOpen]);

	const isValidEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
	};

	const handleInputChange = (input: string, value: string) => {
		setFormData((prev) => ({ ...prev, [input]: value }));

		if (input === "email") {
			setEmailError(!isValidEmail(value));
		}
	};

	const submitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formData.email.trim()) return;

		if (emailError) return;

		setIsSubmitting(true);

		try {
			await fetch("/api/telegram", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			toast.success(t("info"));

			onClose?.();
		} catch (error) {
			console.error("Submission error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={submitForm} className="flex flex-col flex-auto">
			<h2 className="text-white mb-9 text-2xl uppercase text-center font-bold">
				{t("title")}
			</h2>

			<div className="flex flex-col gap-y-[18px] mb-[38px]">
				{inputs.map((input, index) => (
					<label
						key={index}
						className={clsx(
							"bg-white rounded-[14px] px-5 py-[15px] flex transition",
							input === "email" &&
								!formData.email.trim() &&
								"relative before:content-['*'] before:text-wild-watermelon before:absolute before:left-14",
							input === "email" &&
								emailError &&
								"outline-wild-watermelon outline-4"
						)}
					>
						<input
							type={input === "email" ? "email" : "text"}
							placeholder={t(`${input}`)}
							className="outline-none text-jaguar placeholder:opacity-100 placeholder:text-justify text-sm flex-auto"
							value={formData[input as keyof typeof formData]}
							onChange={(e) => {
								handleInputChange(input, e.target.value);
							}}
						/>
					</label>
				))}
			</div>

			<div className="p-[2px] flex bg-lg1 rounded-[14px] mt-auto">
				<Button
					className="flex-auto bg-white text-jaguar text-sm font-semibold py-[15px] rounded-[12px] disabled:opacity-10 disabled:cursor-default"
					text={isSubmitting ? t("submitting") : t("button")}
					typeButton={"submit"}
					disabled={isSubmitting}
				/>
			</div>
		</form>
	);
};

export default Form;
