const storeSymbol = Symbol('store');

const plugin = (logic: any) => {
  return {
    ctxCreated(ctx: { [key: string]: any }) {
      if (!logic[storeSymbol]) {
        logic[storeSymbol] = {};
      }
      ctx.store = {
        set(key: string, val: any) {
          logic[storeSymbol][key] = val;
        },
        get(key: string) {
          return logic[storeSymbol][key];
        },
        remove(key: string) {
          delete logic[storeSymbol][key];
        },
      };
    },
  };
};

export default plugin;
