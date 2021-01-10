import logic from './logic';
import context from './context';

export default `
(async function run() {
  // Context
  ${context.replace(/export\s+default/, '')}

  // Logic
  ${logic
    .split('\n')
    .filter(line => !line.match(/import nodeFns/) && !line.match(/import Context/))
    .join('\n')
    .replace(/export\s+default/, '')
    .replace(
      `import EventEmitter from 'eventemitter3';`,
      `const EventEmitter = (await import('https://jspm.dev/eventemitter3')).default;`
    )
  }

  // DSL
  // define dsl here

  // nodeFns map
  // define nodeFns here

  // instantiation and invoke
  const logic = new Logic({ dsl });
  logic.invoke('$TRIGGER$');
})();
`;
