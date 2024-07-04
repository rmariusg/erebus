# run-k6.sh
#!/bin/bash
set -a
source .env
set +a
k6 run "$@"
