pipeline {
    agent {
        docker { image 'node:20.11.1-alpine3.19' }
    }
    stages {

        stage('Test v1') {

            steps {
                sh 'node --version'
                sh 'ls -lsa'
                withChecks('injected name') {
                    sh 'echo Hello World!'
                    sh 'echo Hello World v2!'
                    sh 'echo Hello World v3!'
                }
                
                withChecks('Second check') {
                    sh 'echo Hello World! v4'
                }
            }
        }
    }
}