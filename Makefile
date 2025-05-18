dup:
	docker compose up -d --remove-orphans

kill:
	docker compose rm -f -s

install:
	docker compose run node npm install

dev:
	docker compose run -p 4500:4500 node npm run dev

lint:
	docker compose run node npm run lint

lintfix:
	docker compose run node npm run lint --fix

installdevenv:dup install dev
