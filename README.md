```
protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./prot
os/auth.proto
```

이걸로 해야 auth.ts 파일이 생성됨.
