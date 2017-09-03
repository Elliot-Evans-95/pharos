'use strict';

module.exports = {
    *clear(task) {
        yield task.clear(['dist', 'build']);
    },
    *minify(task) {
        yield task.source(['src/list.js', 'src/run.js'])
            .babel({ presets:['es2015'] })
            .uglify({
                compress: {
                    drop_console: true,
                    join_vars: true
                }
            })
            .target('dist')
    },
    *build(task) {
        yield task.parallel(['clear', 'minify',]);
    }
};
