
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

def runCheck(String checkName, String scriptBody, String resultFile) {
    echo "Check started: `${checkName}`"
    
    def code

    withChecks(name: checkName) {
        
        /// Remove previous eslint output results ///
        sh "rm -f ${resultFile}"
        
        /// LINT ///
        code = sh script:"${scriptBody} > ${resultFile}", returnStatus: true 
        echo "Execution code: ${code}"
        
        if (code == 0) {
            echo "Check ${checkName} passed"
            
            /// PUBLISH ///
            publishSuccess(checkName)
        } else {
            echo "Check ${checkName} failed"

            /// READ ESLINT RESULTS ///
            def workspace = pwd()
            def summary = readFile "${workspace}/${resultFile}"

            /// PUBLISH ///
            publishFailure(checkName, "See:\n```xml\n${summary}```")
        }
    }

    return code
}


def runLinterChecks(String checkName) {
    runCheck(checkName, "yarn lint", "eslint-results.xml")
}

def runTscChecks(String checkName) {
    runCheck(checkName, "yarn tsc --noEmit", "tsc-noEmit-result.txt")
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
                
                dir ('services/proto') {
                    sh 'mkdir -p generated'
                    // we don't have currently any python ci
                    // so we can leave it as it currently is
                    sh 'mkdir generated/python'
                    sh 'yarn build:node'
                }

                sh 'yarn proto'
                echo "Environment initialized"
                sh 'yarn proto'
            }
        }

        stage("Run linters") {
            parallel {
                stage("Mobile Client / Lint") {
                    stages {
                        stage("Lint") {
                            steps {
                                dir('client') {
                                    runLinterChecks("Mobile Client / Lint")
                                }
                            }
                        }
                        stage("TSC Syntax Check") {
                            steps {
                                dir('client') {
                                    runTscChecks("Mobile Client / TSC Syntax Check")
                                }
                            }
                        }
                    }
                }

                stage ("Services / API") {
                    stages {
                        stage("Prepare") {
                            steps {
                                dir('services/api') {
                                    sh "yarn prisma:generate"
                                }
                            }
                        }

                        stage("Lint") {
                            steps {
                                dir('services/api') {
                                    runLinterChecks("Services / API / Lint")
                                }
                            }
                        }

                        stage("TSC Syntax Check") {
                            steps {
                                dir('services/api') {
                                    runTscChecks("Services / API / TSC Syntax Check")
                                }
                            }
                        }
                    }
                }
            }
        }

    }
}