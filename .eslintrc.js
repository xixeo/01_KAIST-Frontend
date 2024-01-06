module.exports = {
    "root": true,
    "env": {
        "browser": true,    
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "$": "true",
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        parser: 'babel-eslint'
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        
    }
};
