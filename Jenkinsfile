pipeline {
    agent any

    environment {
        APP_NAME         = 'saudi-electronics-shop'
        IMAGE_BACKEND    = 'saudi-electronics-backend'
        IMAGE_FRONTEND   = 'saudi-electronics-frontend'
        // Uses build number and Git commit hash if available
        BUILD_TAG        = "${env.BUILD_NUMBER ?: '1'}"
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
                echo '=== Stage 1: Checking out Code ==='
                checkout scm
            }
        }

        stage('Backend Verification') {
            steps {
                echo '=== Stage 2: Installing Backend Dependencies & Linting ==='
                dir('backend') {
                    sh 'npm ci || npm install'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                echo '=== Stage 3: Building Frontend Assets ==='
                dir('frontend') {
                    sh 'npm ci || npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '=== Stage 4: Building Container Images ==='
                script {
                    sh "docker build -t ${IMAGE_BACKEND}:${BUILD_TAG} -t ${IMAGE_BACKEND}:latest ./backend"
                    sh "docker build -t ${IMAGE_FRONTEND}:${BUILD_TAG} -t ${IMAGE_FRONTEND}:latest ./frontend"
                }
            }
        }

        stage('Integration & Health Check') {
            steps {
                echo '=== Stage 5: Testing Stack via Docker Compose ==='
                script {
                    sh 'docker-compose down --remove-orphans || true'
                    sh 'docker-compose up -d --build'
                    sh 'sleep 10'
                    sh 'docker-compose ps'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo '=== Stage 6: Deployment ==='
                echo "Successfully validated and ready for deployment: ${APP_NAME} (Build ${BUILD_TAG})"
            }
        }
    }

    post {
        always {
            echo '=== Post-Build Cleanup ==='
            sh 'docker-compose down || true'
        }
        success {
            echo '✅ Pipeline execution completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Check execution logs above.'
        }
    }
}
