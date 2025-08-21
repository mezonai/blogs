# Setup

## Docker

### Prerequisites
- Docker
- Docker Compose

### Run

```bash
cd backend
docker compose up -d
docker rm $(docker ps -aq -f name=mc-init) # remove mc-init container because it only used once to allow 
```

### Explanation

```bash
# MinIO CE (Community Edition) only provides basic object storage (CRUD).
# It does not include bucket policy management (public/private) or IAM features in the console.
# That's why we must use `mc` (MinIO Client) here: it acts as the admin tool
# to create buckets and set policies, while the MinIO server container itself
# only handles storage.

# mc: minio client
# local: alias for minio
# http://minio:9000: host:port of minio in docker container
mc alias set local http://minio:9000 minioadmin minioadmin

# mc mb = make bucket.
# local/mezonblogs = bucket mezonblogs in alias local.
# || true: if bucket does exist, ignore error and continue.
mc mb local/mezonblogs || true &&

# set policy for bucket mezonblogs into download (public read).
# https://docs.min.io/enterprise/aistor-object-store/reference/cli/mc-anonymous/mc-anonymous-set/#policy
mc anonymous set download local/mezonblogs || true &&
```

## Backend strapi admin panel

```bash
cd backend
yarn
yarn build
cd apps/blog
yarn
yarn build
yarn develop
```

## Frontend

```bash
cd frontend
yarn
yarn dev
```