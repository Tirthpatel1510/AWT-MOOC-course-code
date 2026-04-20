export const authService = {
  register: async (payload) => ({
    ok: true,
    message: "Registration successful",
    data: payload,
  }),
};
