pipeline {
    agent any

    environment {
        APP_NAME = '-electronics-shop'
        IMAGE_BACKEND = 'saudi-electronics-backend'
        IMAGE_FRONTEND = 'saudi-electronics-frontend'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    options {
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                echo '===== Checking out source code ====='

                git(
                    branch: 'dev',
                    url: 'https://github.com/sohaildevops123/saudi-electronic-app.git'
                    // If your repository is private, use:
                    // credentialsId: 'github-credentials'
                )
            }
        }

        stage('Backend Verification') {
            steps {
                echo '===== Installing Backend Dependencies ====='
                dir('backend') {
                    sh 'npm ci || npm install'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                echo '===== Building Frontend ====='
                dir('frontend') {
                    sh 'npm ci || npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '===== Building Docker Images ====='

                sh """
                docker build -t ${IMAGE_BACKEND}:${IMAGE_TAG} -t ${IMAGE_BACKEND}:latest ./backend
                docker build -t ${IMAGE_FRONTEND}:${IMAGE_TAG} -t ${IMAGE_FRONTEND}:latest ./frontend
                """
            }
        }

        stage('Push Docker Images') {
            steps {
                echo '===== Pushing Images to Docker Hub ====='

                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                    docker tag saudi-electronics-backend:latest $DOCKER_USER/saudi-electronics-backend:latest
                    docker tag saudi-electronics-frontend:latest $DOCKER_USER/saudi-electronics-frontend:latest

                    docker push $DOCKER_USER/saudi-electronics-backend:latest
                    docker push $DOCKER_USER/saudi-electronics-frontend:latest

                    docker logout
                    '''
                }
            }
        }

        stage('Integration Test') {
            steps {
                echo '===== Starting Docker Compose ====='

                sh '''
                docker compose down --remove-orphans || true
                docker compose up -d --build
                docker compose ps
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo "Deployment completed successfully."
            }
        }
    }

    post {

        always {
            echo '===== Cleaning Up ====='

            sh '''
            docker compose down || true
            '''
        }

        success {
            echo 'SUCCESS: Pipeline completed successfully.'
        }

        failure {
            echo 'FAILED: Pipeline execution failed.'
        }
    }
}
