module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:vue/vue3-essential', 'standard', 'plugin:prettier/recommended'],
    overrides: [],
    globals: {
        uni: true
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['vue', 'prettier'],
    rules: {
        // "off"或者0    //关闭规则关闭
        // "warn"或者1    //在打开的规则作为警告（不影响退出代码）
        // "error"或者2    //把规则作为一个错误（退出代码触发时为1）
        // 未定义前不能使用
        'no-use-before-define': 2,
        // 禁止修改const声明的变量
        'no-const-assign': 2,
        // 禁止在块语句中使用声明（变量或函数）
        'no-inner-declarations': [2, 'functions'],
        // 禁止混用tab和空格
        'no-mixed-spaces-and-tabs': [2, false],
        // 不能有未定义的变量
        'no-undef': 0,
        'no-useless-return': 'off',
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto' }]
    }
}
