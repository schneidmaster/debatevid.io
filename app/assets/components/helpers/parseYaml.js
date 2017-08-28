export default (str) => {
  // Parse a YAML array (to avoid the weight of a full parser library).
  return str.replace('---\n', '').split('\n').filter(e => e !== '').map(e => e.substr(2)).map(e => e.replace(/'/g, ''));
};
