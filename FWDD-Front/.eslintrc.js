module.exports = {
  root: true,
  env: {
    node: true,
  },
  rules:{
    'vue/multi-word-component-names': 'off',
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
}
