import AuthForm from "@frontend_next/components/auth/form";

const token = params.get("token");
const error = params.get("error");
const { user } = Astro.locals;
export const prerender = false;

export default function Login() {
  return (
    <div>
      <AuthForm client:load userData={user} token={token} error={error} />
    </div>
  );
}
