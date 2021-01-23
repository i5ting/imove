import logic from './logic';
import context from './context';

const makeCode = (mockNode: any, mockInput: any) => `
(async function run() {
  // Context
  ${context.replace(/export\s+default/, '')}

  // Logic
  ${logic
    .split('\n')
    .filter(
      (line) => !line.match(/import nodeFns/) && !line.match(/import Context/),
    )
    .join('\n')
    .replace(/export\s+default/, '')
    .replace(
      `import EventEmitter from 'eventemitter3';`,
      `const EventEmitter = (await import('https://jspm.dev/eventemitter3')).default;`,
    )}

  // DSL
  // define dsl here

  // nodeFns map
  // define nodeFns here

  // imove plugin
  const mockPlugin = () => {
    const mockNode = ${JSON.stringify(mockNode)};
    const mockInput = ${JSON.stringify(mockInput)};
    const toMockTargets = [
      ['pipe', 'getPipe'],
      ['config', 'getConfig'],
      ['payload', 'getPayload'],
      ['context', 'getContext'],
    ];
    return {
      enterNode(ctx) {
        // hijack
        if(ctx.curNode.id === mockNode.id) {
          toMockTargets.forEach(item => {
            const [type, method] = item;
            item[2] = ctx[method];
            ctx[method] = () => mockInput[type];
          });
        }
      },
      leaveNode(ctx) {
        // restore
        if(ctx.curNode.id === mockNode.id) {
          toMockTargets.forEach(item => {
            const [type, method, originMethod] = item;
            ctx[method] = originMethod;
          });
        }
      }
    };
  };

  // instantiation and invoke
  const logic = new Logic({ dsl });
  logic.use(mockPlugin);
  logic.invoke('$TRIGGER$', {}, (pipe) => {
    const ctx = logic._getUnsafeCtx();
    const context = ctx.getContext();
    window.dispatchEvent(new CustomEvent('iMoveOnlineExecEnds', {detail: {pipe, context}}));
  });
})().catch(err => {
  console.error(err.message);
  window.dispatchEvent(new CustomEvent('iMoveOnlineExecEnds', {detail: {error: {message: err.message}}}));
});
`;

export default makeCode;
