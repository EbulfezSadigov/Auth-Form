import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuthStore } from "../../store/useAuthStore";

interface Errors {
    email: string;
    password: string;
}

export default function Register() {
    const email = useAuthStore((state) => state.email);
    const password = useAuthStore((state) => state.password);
    const setEmail = useAuthStore((state) => state.setEmail);
    const setPassword = useAuthStore((state) => state.setPassword);
    const setOtp = useAuthStore((state) => state.setOtp);
    const [errors, setErrors] = useState<Errors>({ email: "", password: "" });
    const navigate = useNavigate();

    const validateInputs = (): boolean => {
        let emailError = "";
        let passwordError = "";

        if (!email) {
            emailError = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            emailError = "Please enter a valid email address.";
        }

        if (!password) {
            passwordError = "Password is required.";
        } else if (password.length < 8) {
            passwordError = "Password must be at least 8 characters.";
        }

        setErrors({ email: emailError, password: passwordError });
        return !emailError && !passwordError;
    };

    const generateOTP = (): string => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (validateInputs()) {
            const otp = generateOTP();
            setOtp(otp);

            navigate("/verify");
        }
    };

    return (
        <section className="mt-44">
            <div className="max-w-md w-full mx-auto space-y-6 border rounded-lg p-5 pb-14">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your email and password to login</p>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="m@example.com"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <Button className="w-full" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </section>
    );
}
