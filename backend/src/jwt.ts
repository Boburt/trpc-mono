import { jwt } from "@elysiajs/jwt";

const jwtModule = jwt({
  name: "jwt",
  secret: process.env.JWT_SECRET!,
});

export default jwtModule;
