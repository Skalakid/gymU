pipeline {
    agent {
        docker { image 'node:20.11.1-alpine3.19' }
    }
    stages {

        stage("Initialization") {
            steps {
                sh 'yarn install'
            }
        }

        stage("Mobile client") {
            steps {
                dir('client') {
                    sh 'pwd'
                    sh 'ls -lsa'

                    withChecks(name: "Lint", includeStage: true) {
                        sh 'yarn lint -f checkstyle'
                        echo 'Mobile linting finished'
                    }
                }

            }
        }

        stage ("Service\\API") {
            steps {
                dir('services/api') {
                    sh 'pwd'
                    sh 'ls -lsa'

                    withChecks(name: "Lint", includeStage: true) {
                        sh 'yarn lint -f checkstyle'
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