pipeline {
    agent {
        docker { image 'node:20.11.1-alpine3.19' }
    }
    stages {

        stage("Mobile client") {
            dir('client') {

            }
        }

        stage ("Service\\API") {
            dir('services/api') {
                sh 'pwd'
                sh 'ls -lsa'
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