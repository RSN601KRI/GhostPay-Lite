# 💳 GhostPay-Lite: Microservice-based Payment Token API

GhostPay-Lite is a lightweight, secure, and scalable **payment token microservice API** that issues single-use virtual cards and processes charges. Designed with a **microservices architecture**, it features **JWT-based authentication**, **rate limiting**, **observability**, and **zero-downtime deployments**.


## 📌 Features

- 🔐 Single-use virtual card issuance
- 💸 Secure card charge processing
- 🛡️ JWT-based RBAC (Admin, Merchant, User)
- 🔁 Live key rotation with Vault / AWS Secrets Manager
- 📊 Observability with Prometheus, Grafana, OpenTelemetry
- ⚙️ CI/CD with blue-green or canary deployment
- 🚀 High availability on Kubernetes (≥2 replicas in 2 AZs)


## ⚙️ Tech Stack

| Layer                | Tech Used                                         |
|---------------------|--------------------------------------------------|
| API Spec            | OpenAPI (Swagger YAML)                           |
| Services            | Node.js / Python / Go / Java (choose one)        |
| Containerization    | Docker                                           |
| Orchestration       | Kubernetes (KinD, Minikube, or Cloud Provider)   |
| CI/CD               | GitHub Actions / Jenkins                         |
| Rate Limiting       | Redis / Kong / Envoy                             |
| Authentication      | JWT (asymmetric keys), Vault or AWS SM           |
| Storage             | PostgreSQL (cards & charges), MongoDB/DynamoDB (analytics) |
| Monitoring          | Prometheus, Grafana, OpenTelemetry               |
| Secrets Management  | HashiCorp Vault / AWS Secrets Manager            |
| Load Testing        | k6 or Locust                                      |


## 📁 Project Structure

```

ghostpay-lite/
├── api-spec/                # OpenAPI spec (YAML)
├── services/                # Microservices
│   ├── auth/
│   ├── cards/
│   ├── charges/
│   └── analytics/
├── infra/
│   ├── k8s/                 # Helm charts or manifests
│   └── terraform/           # (Optional) Cloud infra automation
├── ci-cd/
│   └── github-actions.yaml  # CI/CD workflows
├── secrets/
│   └── vault-policies.hcl   # Vault config
├── monitoring/
│   ├── prometheus/
│   └── grafana/
├── load-test/
│   └── k6-script.js         # Load testing scripts
├── docs/
│   └── architecture.md
└── README.md

````

## 🚀 Getting Started

### Prerequisites

- Docker
- Kubernetes (Minikube/KinD or EKS/GKE)
- Vault / AWS Secrets Manager
- Helm
- Node.js / Python / Go SDKs (based on your service language)
- k6 / Locust (for load testing)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/ghostpay-lite.git
cd ghostpay-lite
````

### 2. Spin Up Services (Locally)

```bash
# Start Kubernetes cluster (using KinD or Minikube)
minikube start

# Deploy services using Helm
helm install ghostpay ./infra/k8s

# Forward ports if needed
kubectl port-forward svc/cards-service 8000:80
```

## 🧪 API Overview

### 🔹 POST `/cards`

Issues a new single-use virtual card.

**Request**:

```json
{
  "user_id": "1234",
  "amount": 200,
  "currency": "USD"
}
```

**Response**:

```json
{
  "card_id": "abc123",
  "status": "active",
  "expires_at": "2025-06-30T12:00:00Z"
}
```

### 🔹 GET `/cards/{id}`

Returns the card status.

### 🔹 POST `/charges`

Charges a virtual card.

## 🔐 Authentication

* JWT with asymmetric RSA keys
* Keys stored in Vault / AWS Secrets Manager
* Role-Based Access Control:

  * `admin`: full access
  * `merchant`: can issue/charge
  * `user`: limited access to own data

## 📈 Observability & Monitoring

* View Grafana Dashboards at `http://<grafana-host>:3000`
* Metrics exposed on `/metrics` from each service
* Alerts configured for:

  * Error rate > 1%
  * CPU usage > 80%
* Traces captured with OpenTelemetry

## 💣 Load Testing

Simulate traffic with k6:

```
k6 run load-test/k6-script.js
```

Report includes:

* 95th percentile latency
* Throughput
* 429 errors under rate limiting

## 🛠 CI/CD & Deployment

* Blue/Green deployment enabled via GitHub Actions
* Auto-rollback on failed health checks
* Canary deployments supported

## 📬 Contributions

Pull requests welcome. Please open issues for feature requests or bugs.
