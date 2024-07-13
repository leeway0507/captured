module.exports = {
  extends: ['next/core-web-vitals','airbnb',"airbnb-typescript","prettier"],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './frontend/tsconfig.json', // Add this line
  },
  rules: {
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'import/extensions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-sequences': 'off',
    'react/require-default-props': 'off',
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
  
  },
  ignorePatterns: ["next.config.mjs"], 
  
};
