import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
  createPersistedState({
    reducer: (state) => ({
      auth: state.auth,
    }),
  })(store);
};
