
//// FUNCTIONS ////

/// EXAMPLE WRAPPER WITH CHECKS CLOSURE ///
def runWithChecks(String checkName, Closure body) {
    echo "Starting check: ${checkName}"
    sh "pwd"
    withChecks(name: checkName) {
        def code = body()
        echo code
        if (code == 0) {
            echo "Check ${checkName} passed"
            publishChecks name: checkName, summary: 'Successfully passed', title: checkName    
        } else {
            echo "Check ${checkName} failed"
            publishChecks name: checkName, summary: 'Failed to pass', title: checkName, conclusion: 'FAILURE'    
        }
    }
}

/// PUBLISHING ///

def publishSuccess(String checkName, String summary = 'Successfully passed') {
    publishChecks name: checkName, summary: summary, title: checkName    
}

def publishFailure(String checkName, String summary = 'Failed to pass') {
    publishChecks name: checkName, summary: summary, title: checkName, conclusion: 'FAILURE'    
}

/// CUSTOM CHECKS ///

def runLinterChecks(String checkName) {
    echo "Check started: `${checkName}`"
    
    def code

    withChecks(name: checkName) {
        def eslintResultsFilename = 'eslint-results.xml'

        /// Remove previous eslint output results ///
        sh "rm -f ${eslintResultsFilename}"
        
        /// LINT ///
        code = sh script:"yarn lint > ${eslintResultsFilename}", returnStatus: true 
        echo "Execution code: ${code}"
        
        if (code == 0) {
            echo "Check ${checkName} passed"
            
            /// PUBLISH ///
            publishSuccess(checkName)
        } else {
            echo "Check ${checkName} failed"

            /// READ ESLINT RESULTS ///
            def workspace = pwd()
            def summary = readFile "${workspace}/${eslintResultsFilename}"

            /// PUBLISH ///
            publishFailure(checkName, "See:\n```xml\n${summary}```")
        }
    }

    return code
}

//// MAIN PIPELINE ////

pipeline {
    agent {
        docker { image 'node:20.11.1-alpine3.19' }
    }
    stages {

        stage("Initialization") {
            steps {
                sh 'yarn install'
                echo "Environment initialized"
            }
        }

        stage("Run linters") {
            parallel {
                stage("Mobile Client / Lint") {
                    steps {
                        dir('client') {
                            runLinterChecks("Mobile Client / Lint")
                        }
                    }
                }

                stage ("Services / API / Lint") {
                    steps {
                        dir('services/api') {
                            sh 'pwd'
                            sh 'ls -lsa'

                            runLinterChecks("Services / API / Lint")
                        }
                    }
                }
            }
        }

    }
}