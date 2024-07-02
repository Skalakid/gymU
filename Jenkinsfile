
def runWithChecks(String checkName, Closure body) {
    echo "Starting check: ${checkName}"
    withChecks(name: checkName) {
        def code = body()
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

        stage("Mobile client") {
            steps {
                dir('client') {
                    sh 'pwd'
                    sh 'ls -lsa'

                    runWithChecks("Mobile Client / Lint") {
                        sh 'yarn lint'
                    }
                }

            }
        }

        stage ("Service / API") {
            steps {
                dir('services/api') {
                    sh 'pwd'
                    sh 'ls -lsa'

                    runWithChecks("Services / API / Lint") {
                        sh 'yarn lint'
                    }
                }
            }
        }

        // stage('Test v1') {
        //     steps {
        //         sh 'pwd'

        //         sh 'node --version'
        //         sh 'ls -lsa'
        //         withChecks('injected name') {
        //             sh 'echo Hello World!'
        //         }
                
        //         withChecks('Second check') {
        //             sh 'echo Hello World! v4'
        //         }

                
        //         withChecks('Third check') {
        //             sh 'echo Hello World! v4'
        //         }
        //     }
        // }
    }
}