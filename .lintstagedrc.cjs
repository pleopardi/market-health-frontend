module.exports = {
  '*.{*js,ts*}': ['eslint --fix', 'prettier --write'],
  '*.{css,json,md}': ['prettier --write'],
};
