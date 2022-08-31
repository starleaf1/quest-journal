export const isOnPCMixin = {
  install: (Vue) => {
    Vue.mixin({
      computed: {
        isOnPC: () => Vue.$vuetify.breakpoints.mdAndUp,
      },
    });
  },
};
