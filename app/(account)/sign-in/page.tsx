"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define Yup schema
const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: yup.string().required("Password is required"),
});

type SignInFormData = yup.InferType<typeof signInSchema>;

const SignInPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  // Handle sign-in submission
  const handleSignIn = async (data: SignInFormData) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log(result);
      if (result?.error) {
        toast.error(result.error);
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.log("error msg" + error);
      toast.error("invalid email or password");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 pt-6">
            <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isSignIn ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {isSignIn
                ? "Enter your credentials to access your account"
                : "Join the MangaMatch community today"}
            </p>
          </div>
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit(handleSignIn)}>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    {...register("email")}
                    type="email"
                    className="w-full pl-10 pr-4 py-2 bg-muted text-foreground rounded-md border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-2 bg-muted text-foreground rounded-md border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Don't have an account yet?
                <Link
                  href={"/sign-up"}
                  className="text-accent hover:text-primary transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
