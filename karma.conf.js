module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'index.js',
            'spec.js'
        ],
        reporters: ['coverage','spec','junit'],
        preprocessors: {
            '*.js': ['coverage', 'babel'],
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        },
        junitReporter: {
            outputDir: 'coverage',
            outputFile: 'junit.xml',
            useBrowserName: false
        },
        coverageReporter: {
            dir : 'coverage',
            reporters: [
                { type: 'cobertura', subdir: '.'},
                { type: 'html', subdir: '.' }
            ],
            watermarks: {
                statements: [ 60, 100 ],
                functions: [ 60, 100 ],
                branches: [ 60, 100 ],
                lines: [ 60, 100 ]
            }
        }
    });
};
