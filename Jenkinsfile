pipeline {
    agent any
    tools {
        nodejs '20.9.0'
    }
    stages {
        stage('Tests') {
            steps {
                 script {
//                    docker.image('node:10-stretch').inside { c ->
                        echo 'Building..'
                        sh 'npm install'
                        echo 'Testing..'
                        sh 'npm test'
//                         sh "docker logs ${c.id}"
//                    }
//                 }
            }
        }
        stage('Build and push docker image') {
            steps {
                script {
                    def dockerImage = docker.build("ghm/node-demo:main")
                    docker.withRegistry('', 'demo-docker') {
                        dockerImage.push('main')
                    }
                }
            }
        }
        stage('Deploy to remote docker host') {
            environment {
                DOCKER_HOST_CREDENTIALS = credentials('demo-docker')
            }
            steps {
                script {
//                     sh 'docker login -u $DOCKER_HOST_CREDENTIALS_USR -p $DOCKER_HOST_CREDENTIALS_PSW 127.0.0.1:2375'
                    sh 'docker pull ghm/node-demo:main'
                    sh 'docker stop node-demo'
                    sh 'docker rm node-demo'
                    sh 'docker rmi ghm/node-demo:current'
                    sh 'docker tag ghm/node-demo:main ghm/node-demo:current'
                    sh 'docker run -d --name node-demo -p 80:3000 ghm/node-demo:current'
                }
            }
        }
    }
}
}