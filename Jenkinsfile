
def runWithChecks(String checkName, Closure body) {
    echo "Starting check: ${checkName}"
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

def publishSuccess(String checkName, String summary) {

}

def runLinterChecks(String checkName) {
    echo "Starting check: ${checkName}"
    withChecks(name: checkName) {
        def code = sh script:'yarn lint -f checkstyle > eslint-results.xml', returnStatus: true 
        echo "${code}"
        if (code == 0) {
            echo "Check ${checkName} passed"
            publishChecks name: checkName, summary: 'Successfully passed', title: checkName    
        } else {
            echo "Check ${checkName} failed"
            publishChecks name: checkName, summary: 'Failed to pass', title: checkName, conclusion: 'FAILURE'    
        }
    }
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