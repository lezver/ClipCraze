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

interface FormErrors {
	nameEmpty: boolean;
	nicknameEmpty: boolean;
	emailEmpty: boolean;
	emailInvalid: string | boolean;
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
	const [errors, setErrors] = useState<FormErrors>({
		emailEmpty: false,
		nameEmpty: false,
		nicknameEmpty: false,
		emailInvalid: false,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const t = useTranslations("Form");

	useEffect(() => {
		if (isOpen) {
			setFormData({ name: "", nickname: "", email: "" });
			setErrors({
				nameEmpty: false,
				nicknameEmpty: false,
				emailEmpty: false,
				emailInvalid: false,
			});
		}
	}, [isOpen]);

	const isValidEmail = (email: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
	};

	const handleInputChange = (input: string, value: string) => {
		setFormData((prev) => ({ ...prev, [input]: value }));

		setErrors((prev) => ({
			...prev,
			[`${input}Empty`]: !value.trim(),
			...(input === "email" && value.trim()
				? { emailInvalid: !isValidEmail(value) }
				: {}),
		}));
	};

	const submitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newErrors: FormErrors = {
			nameEmpty: !formData.name.trim(),
			nicknameEmpty: !formData.nickname.trim(),
			emailEmpty: !formData.email.trim(),
			emailInvalid: formData.email.trim() && !isValidEmail(formData.email),
		};

		setErrors(newErrors);

		if (Object.values(newErrors).some((error) => error)) {
			return;
		}

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
							errors[`${input}Empty` as keyof typeof errors] &&
								"outline-wild-watermelon outline-4",
							input === "email" &&
								errors.emailEmpty &&
								"relative before:content-['*'] before:text-wild-watermelon before:absolute before:left-14",
							input === "email" &&
								errors.emailInvalid &&
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
					className="flex-auto bg-white text-jaguar text-sm font-semibold py-[15px] rounded-[12px]"
					text={isSubmitting ? t("submitting") : t("button")}
					typeButton={"submit"}
				/>
			</div>
		</form>
	);
};

export default Form;
