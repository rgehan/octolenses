export const navigation = {
  state: { page: 'discover' },
  reducers: {
    navigateTo(_, page) {
      return { page };
    },
  },
};
