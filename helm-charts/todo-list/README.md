# Todo List Application with Kubernetes and Helm

This is a todo list application deployed using Kubernetes and Helm. Follow these steps to set up and run the application.

## Prerequisites

- Node.js and npm
- Docker
- Minikube
- Helm
- kubectl

## Installation Steps

### 1. Install Node Modules
```bash
# Install dependencies
npm install
```

### 2. Start Minikube
```bash
# Start minikube
minikube start

# Enable ingress addon
minikube addons enable ingress

# Configure shell to use minikube's docker daemon
eval $(minikube docker-env)
```

### 3. Build Docker Image
```bash
# Build the docker image
docker build -t todo-list:latest .

# Verify image is built
docker images | grep todo-list
```

### 4. Deploy with Helm

Make sure you're in the project root directory.

```bash
# Clean up any previous installations if needed
helm uninstall todo-app
kubectl delete configmap --all
kubectl delete pod --all

# Install the Helm chart
helm install todo-app . -f env/dev.yaml

# Verify deployment
kubectl get pods
kubectl get svc
kubectl get configmap
```

### 5. Access the Application

```bash
# Method 1: Using minikube service
minikube service todo-app-todo-list

# Method 2: Port forwarding
kubectl port-forward svc/todo-app-todo-list 3000:80
# Then open http://localhost:3000 in your browser
```

## Verify Installation

```bash
# Check pod status
kubectl get pods

# Check service
kubectl get svc

# Check ConfigMap
kubectl get configmap

# Check logs
kubectl logs -l app.kubernetes.io/instance=todo-app
```

## Configuration

The application configuration is managed through environment variables in `env/dev.yaml`:

```yaml
environmentVars:
  URL_V1: "http://localhost:8080"
  URL_V2: "http://localhost:8081"
```

## Cleanup

```bash
# Uninstall Helm release
helm uninstall todo-app

# Stop minikube
minikube stop

# Delete minikube cluster if needed
minikube delete
```

## Troubleshooting

1. If pods are not starting:
```bash
kubectl describe pod <pod-name>
```

2. If ConfigMap is not found:
```bash
kubectl get configmap
kubectl describe configmap
```

3. If service is not accessible:
```bash
kubectl get svc
kubectl describe svc todo-app-todo-list
```

## Directory Structure
```
todo-list/
├── src/
├── public/
├── helm-charts/
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── config.yaml
│   │   └── _helpers.tpl
│   ├── Chart.yaml
│   └── values.yaml
├── env/
│   └── dev.yaml
├── Dockerfile
└── package.json
```

## Additional Commands

```bash
# Get minikube IP
minikube ip

# SSH into minikube
minikube ssh

# View dashboard
minikube dashboard
```

## Notes
- Make sure Docker daemon is running
- Ensure minikube has enough resources allocated
- Use `minikube docker-env` before building images
- Check logs if application is not accessible

For more information, check the [Kubernetes Documentation](https://kubernetes.io/docs/home/) and [Helm Documentation](https://helm.sh/docs/).
