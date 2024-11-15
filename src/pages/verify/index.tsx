import { useState, useRef, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

interface ToastProps {
    message: string;
    isSuccess: boolean;
}

function Toast({ message, isSuccess }: ToastProps) {
    return (
        <div
            className={`fixed top-4 right-4 p-3 rounded-md shadow-md transition-all duration-500 ease-in-out transform ${
                isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            } animate-toast`}
        >
            {message}
        </div>
    );
}

export default function Verify() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [toast, setToast] = useState<{ message: string; isSuccess: boolean } | null>(null);
    const navigate = useNavigate();
    const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

    const storedOtp = useAuthStore((state) => state.otp);

    useEffect(() => {
        if(!storedOtp) navigate("/register")
    }, [storedOtp])
    

    const handleChange = (index: number, value: string) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 5) {
                inputRefs[index + 1].current?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString === storedOtp) {
            setToast({ message: 'OTP verified successfully!', isSuccess: true });
            setTimeout(() => {
                setToast(null);
                navigate('/');
            }, 1500);
        } else {
            setToast({ message: 'Invalid OTP. Please try again.', isSuccess: false });
            setTimeout(() => setToast(null), 2000);
        }
    };

    return (
        <section className="mt-44">
            <div className='fixed top-6 left-6 px-6 py-2 border rounded-lg'>
                Your otp code - <strong>{storedOtp}</strong>
            </div>
            <div className="max-w-md w-full mx-auto space-y-6 border p-10 rounded-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Enter OTP</h1>
                    <p className="text-muted-foreground">
                        We've sent a 6-digit code to your email
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-between">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                ref={inputRefs[index]}
                                value={digit}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl"
                            />
                        ))}
                    </div>
                    <Button className="w-full" type="submit" disabled={otp.some(digit => digit === '')}>
                        Verify OTP
                    </Button>
                </form>
                {toast && <Toast message={toast.message} isSuccess={toast.isSuccess} />}
            </div>
        </section>
    );
}