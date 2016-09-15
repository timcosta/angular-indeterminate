module.exports = function(config) {
    config.set({
        basePath: '',
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/*.coffee',
            'tests/*.coffee'
        ],
        reporters: ['coverage','spec','junit'],
        preprocessors: {
            'src/*.coffee': ['coverage'],
            'tests/*.coffee': ['coffee']
        },
        coffeePreprocessor: {
            options: {
                sourceMap: true
            }
        },
        junitReporter: {
            outputDir: 'coverage',
            outputFile: 'junit.xml',
            useBrowserName: false
        },
        coverageReporter: {
            dir : 'coverage',
            instrumenters: {
                ibrik: require('ibrik')
            },
            instrumenter: {
                '**/*.coffee': 'ibrik'
            },
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
