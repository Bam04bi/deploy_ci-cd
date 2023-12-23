pipeline {
    agent any

     environment {
        // Use the tool directive to specify the NodeJS installation by its name
        NODEJS_HOME = tool '20.9.0'
        // Add the NodeJS bin directory to the PATH
        PATH = "${NODEJS_HOME}/bin:${PATH}"
    }



    stages {
        stage('Build and Deploy NPM') {
            steps {
                script {
                    // Use the NODEJS_HOME environment variable to access Node.js and npm
                    def npmCommand = "${NODEJS_HOME}/bin/npm"
                    def nodeCommand = "${NODEJS_HOME}/bin/node"

                    sh "${nodeCommand} --version"
                    sh "${npmCommand} install"
                    sh "${npmCommand} run deploy"
                }
            }
        }

        stage('Deploy to test') {
            steps {
                script {
                    // Run this stage in a Docker container with your deployment tools
                    docker.image('your-actual-deployment-image').inside {
                        echo 'Deploying to test'
                        // Add deployment commands (e.g., Ansible)
                    }
                }
            }
        }

        stage('API tests') {
            steps {
                // Your API testing steps without Docker
                echo 'Executing API tests'
            }
        }

        stage('Performance tests') {
            steps {
                // Your performance testing steps without Docker
                echo 'Executing Performance tests'
            }
        }
    }
}
