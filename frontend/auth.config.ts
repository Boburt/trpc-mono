import Credentials from "@auth/core/providers/credentials";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        login: { label: "Login" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (credentials.login === "admin" && credentials.password === "admin") {
          return {
            id: 1,
            name: "Admin",
            email: "",
          };
        }
      },
    }),
  ],
};
