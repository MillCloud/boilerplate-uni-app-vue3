const { eslint } = require('@modyqyw/fabric');

module.exports = {
  ...eslint.vue3TypescriptPrettier,
  rules: {
    ...eslint.vue3TypescriptPrettier.rules,
    'vue-scoped-css/enforce-style-type': 'off',
  },
};
