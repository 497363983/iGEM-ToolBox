const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
// console.log(requireAll(req))
requireAll(req);