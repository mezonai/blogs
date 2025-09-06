## Deploy on nginx reverse proxy server

1. config /etc/hosts

```
10.10.60.146 test-mezon.ai www.test-mezon.ai
```

2. ssl config

```bash
sudo mkdir -p /etc/nginx/ssl_cert

openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout /etc/nginx/ssl_cert/test-mezon.ai.key \
  -out /etc/nginx/ssl_cert/test-mezon.ai.pem \
  -subj "/C=VN/ST=Test/L=Test/O=Test/OU=Dev/CN=test-mezon.ai"
```

3. nginx config
```nginx
server {
  server_name test-mezon.ai;
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  #add_header alt-svc 'h3=":443"; ma=86400';

  ssl_certificate /etc/nginx/ssl_cert/test-mezon.ai.pem;
  ssl_certificate_key /etc/nginx/ssl_cert/test-mezon.ai.key;

  location /blogs {
      rewrite ^/blogs$ /blogs/ last;  # Use 'last' instead of 'permanent' to avoid 301 loops
  }

  location /blogs/ {
      proxy_pass http://127.0.0.1:1338;
      proxy_http_version 1.1;

      # websocket / upgrade headers
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $http_connection;

      proxy_read_timeout 86400;

      # forwarded headers
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;

      # bypass cache for upgrades
      proxy_cache_bypass $http_upgrade;
  }

  gzip on;
  gzip_disable "msie6";

  gzip_vary on;
  gzip_proxied any;
  gzip_comp_level 6;
  gzip_buffers 16 8k;
  gzip_http_version 1.1;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

4. restart nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```