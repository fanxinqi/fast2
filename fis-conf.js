'use strict';

/**
 * Created by fanxinqi on 2017/10/26.
 */
fis.set('project.ignore', ['output/**', 'dist/**', 'node_modules/**', '.git/**', '.svn/**', 'public/**']);
fis.match('*.js', {
    rExt: '.js',
    parser: fis.plugin('babel-latest', {
        plugins: ["transform-async-to-generator"]
    })
});