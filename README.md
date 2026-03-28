# shopping_list

Shopping list app built with Next.js.

## Prerequisites

- Node.js 22+
- npm 10+
- Docker (optional, for containerized run)

## Run locally

1. Install dependencies:

	```bash
	npm ci
	```

2. Start the development server:

	```bash
	npm run dev
	```

3. Open http://localhost:3000

## Build and run production locally

1. Build the app:

	```bash
	npm run build
	```

2. Start the production server:

	```bash
	npm run start
	```

3. Open http://localhost:3000

## Run with Docker

1. Build the Docker image:

	```bash
	docker build -t shopping-list-app .
	```

2. Run the container:

	```bash
	docker run --rm -p 3000:3000 shopping-list-app
	```

	Or build and run with Podman in one command:

	```bash
	podman build -t shopping-list-app . && podman run --rm -p 3000:3000 shopping-list-app
	```

3. Open http://localhost:3000

## Helpful scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run start` - run production build
- `npm run lint` - run ESLint
