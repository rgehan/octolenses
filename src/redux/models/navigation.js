export const navigation = {
  state: { page: 'dashboard' },
  reducers: {
    navigateTo(_, page) {
      return { page };
    },
  },
};
