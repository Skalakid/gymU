pipeline {
    agent {
        docker { image 'node:20.11.1-alpine3.19' }
    }
    stages {
        def comment = pullRequest.comment('This PR is highly illogical..')
        stage('Test v1') {
            steps {
                sh 'node --version'
                sh 'ls -lsa'
            }
        }
    }
}