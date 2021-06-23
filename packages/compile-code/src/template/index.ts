export default `import Logic from './logic';
const dsl = require('./dsl.json');
// import plugins here

const logic = new Logic({ dsl });

// use plugins here

export default logic;
`;
