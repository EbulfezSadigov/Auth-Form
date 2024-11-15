import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const avatarUrl = "https://github.com/shadcn.png";
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const navigate = useNavigate();

  const fallbackLetter = email.charAt(0).toUpperCase();

  useEffect(() => {
    if (!email) navigate("/register");
  }, [email, navigate]);

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-44">
      <CardHeader className="flex flex-row items-center gap-4 p-6">
        <Avatar className="w-16 h-16">
          <AvatarImage src={avatarUrl} alt="User avatar" />
          <AvatarFallback>{fallbackLetter}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold" id="user-profile-heading">User Profile</h2>
          <p className="text-sm text-muted-foreground">Your account information</p>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-muted-foreground">Email</span>
          <span className="text-lg" aria-labelledby="user-profile-heading">{email}</span>
        </div>
        <div className="flex flex-col space-y-1 mt-4">
          <span className="text-sm font-medium text-muted-foreground">Password</span>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              readOnly
              className="text-lg border-none bg-gray-100 p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-2 flex items-center"
              aria-label="Toggle password visibility"
            >
              {isPasswordVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.193.639-.408 1.257-.646 1.854M15 19.558A9.956 9.956 0 0112 20c-4.478 0-8.268-2.943-9.542-7a10.035 10.035 0 011.114-2.95M12 5v.01" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9.97 9.97 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.06 10.06 0 012.114-3.012M6.144 6.144C4.646 7.443 3.457 9.121 2.632 11M18 12a3 3 0 11-6 0 3 3 0 016 0zm0 0c.936 1.465 1.8 3.071 2.632 4.675M19.881 20.93l-2.62-2.62" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}