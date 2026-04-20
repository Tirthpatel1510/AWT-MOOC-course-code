import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PageCard from "../shared/components/PageCard";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10">
      <PageCard title="Login" subtitle="Use student or librarian role to continue">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <select
              {...register("role", { required: "Role is required" })}
              className="border border-slate-300 rounded-md p-2 w-full"
            >
              <option value="student">student</option>
              <option value="librarian">librarian</option>
            </select>
            {errors.role ? <p className="text-red-600 text-sm mt-1">{errors.role.message}</p> : null}
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          New user? <Link to="/register" className="text-blue-600 underline">Create Account</Link>
        </p>
      </PageCard>
    </div>
  );
}

export default Login;
