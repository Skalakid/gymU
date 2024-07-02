
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

def publishSuccess(String checkName, String summary = 'Successfully passed') {
    publishChecks name: checkName, summary: summary, title: checkName    
}

def publishFailure(String checkName, String summary = 'Failed to pass') {
    publishChecks name: checkName, summary: summary, title: checkName, conclusion: 'FAILURE'    
}

def runLinterChecks(String checkName) {
    echo "Starting check: ${checkName}"
    
    def code

    withChecks(name: checkName) {
        def eslintResultsFilename = 'eslint-results.xml'
        code = sh script:'yarn lint > ${eslintResultsFilename}', returnStatus: true 
        sh "ls -lsa"
        if (code == 0) {
            echo "Check ${checkName} passed"
            publishSuccess name: checkName
        } else {
            echo "Check ${checkName} failed"

            def workspace = pwd()
            def summary = readFile "${workspace}/${eslintResultsFilename}"


            publishFailure(checkName, "See:\n```xml\n${summary}```")
        }
    }

    return code
}

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
                stage("Mobile client") {
                    steps {
                        dir('client') {
                            runLinterChecks("Mobile Client / Lint")
                        }
                    }
                }

                stage ("Service / API") {
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