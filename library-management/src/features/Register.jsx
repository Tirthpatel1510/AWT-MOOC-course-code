import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import PageCard from "../shared/components/PageCard";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },
  });
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError("");

    try {
      const result = await authService.register(data);
      if (!result?.ok) {
        setServerError("Registration failed. Please try again.");
        return;
      }
      navigate("/");
    } catch {
      setServerError("Something went wrong while creating account.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10">
      <PageCard title="Register" subtitle="Create account as student or librarian">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="border border-slate-300 rounded-md p-2 w-full"
            />
            {errors.name ? <p className="text-red-600 text-sm mt-1">{errors.name.message}</p> : null}
          </div>

          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Email"
              className="border border-slate-300 rounded-md p-2 w-full"
            />
            {errors.email ? <p className="text-red-600 text-sm mt-1">{errors.email.message}</p> : null}
          </div>

          <div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              placeholder="Password"
              className="border border-slate-300 rounded-md p-2 w-full"
            />
            {errors.password ? (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            ) : null}
          </div>

          <div>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className="border border-slate-300 rounded-md p-2 w-full"
            />
            {errors.confirmPassword ? (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
            ) : null}
          </div>

          <div>
            <select
              {...register("role", { required: "Role is required" })}
              className="border border-slate-300 rounded-md p-2 w-full"
            >
              <option value="student">student</option>
              <option value="librarian">librarian</option>
            </select>
            {errors.role ? <p className="text-red-600 text-sm mt-1">{errors.role.message}</p> : null}
          </div>

          {serverError ? <p className="text-red-600 text-sm">{serverError}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link to="/" className="text-blue-600 underline">Login</Link>
        </p>
      </PageCard>
    </div>
  );
}

export default Register;
