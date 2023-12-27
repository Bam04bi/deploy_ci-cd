pipeline {
    agent any
    tools {
        nodejs '20.9.0'
    }
    stages {
        stage('Tests') {
            steps {
                script {
                    echo 'Building..'
                    sh 'npm install'
                    echo 'Testing..'
                    sh 'npm test'
                }
            }
        }
        stage('Build and push Docker image') {
            steps {
                script {
                    def registryCredentials = credentials('demo-docker')
                    def dockerImage = docker.build("ghm/node-demo:main")
                    docker.withRegistry('', registryCredentials) {
                        dockerImage.push('main')
                    }
                }
            }
        }
        stage('Deploy to remote Docker host') {
            environment {
                DOCKER_HOST_CREDENTIALS = credentials('demo-docker')
            }
            steps {
                script {
                    sh 'docker pull ghm/node-demo:main'
                    sh 'docker stop node-demo || true'
                    sh 'docker rm node-demo || true'
                    sh 'docker rmi ghm/node-demo:current || true'
                    sh 'docker tag ghm/node-demo:main ghm/node-demo:current'
                    sh 'docker run -d --name node-demo -p 80:3000 ghm/node-demo:current'
                }
            }
        }
    }
}
