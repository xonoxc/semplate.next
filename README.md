# Semplate.next

A modern SaaS template built with the latest tools and frameworks:


- **[Next.js 14](https://nextjs.org/)** for a robust and scalable React framework.
- **[Clerk](https://clerk.dev/)** for seamless user authentication and management.
- **[Drizzle ORM](https://orm.drizzle.team/)** for type-safe and performant database operations.
- **[NeonDB](https://neon.tech/)** as the database backend for your application.
- Webhook integration for handling external events in real time.

## Features

- **Authentication:** Secure and flexible user authentication powered by Clerk.
- **Database:** NeonDB with Drizzle ORM for structured and type-safe data handling.
- **Next.js 14:** Featuring server actions and other cutting-edge features for server and client integration.
- **Webhooks:** Easily configurable webhook support to listen to and process external events.
- **Scalability:** Designed with scalability and maintainability in mind, making it an excellent starting point for SaaS products.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v18 or later)
- pnpm or npm or bun (bun is recommended)
- NeonDB account
- Clerk account

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/xonoxc/semplate.next.git
cd semplate.next
```

### 2. Install Dependencies

Install all required dependencies using `pnpm` or `npm` or `bun`:

```bash
# Using pnpm
pnpm install

# OR using npm
npm install


# OR using bun
bun install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```env
# NeonDB Configuration
DATABASE_URL=postgresql://<username>:<password>@<host>/<database>

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_frontend_api>
CLERK_SECRET_KEY=<your_clerk_api_key>

# Webhooks
WEBHOOK_SECRET=<your_webhook_secret>
```

> Replace `<username>`, `<password>`, `<host>`, `<database>`, and other placeholders with your actual configuration.

### 4. Set Up Database

Run migrations using Drizzle ORM:

```bash
pnpm drizzle:sync
```

> Ensure that the `DATABASE_URL` in `.env` is correctly configured.

### 5. Run the Development Server

Start the development server:

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your application.

## Project Structure

```plaintext

src/
├── app/               # Next.js application code (contain api and frontend)
├── components/        # UI components
├── db/                # db configuration 
├── hooks/             # hooks 
├── lib/               # Reusable libraries 
├── types/             # type definitions
└── middleware.ts      # application middleware

```

## Deployment

The application is optimized for deployment on platforms like Vercel.

### Steps:

1. Ensure environment variables are configured in your hosting platform.
2. Build the project:

   ```bash
   pnpm build

   # or with bun
   bun build
   ```

3. Deploy to Vercel or spin up a vps (Vercel is recommended) .

## Webhook Integration

To add a new webhook:

1. Define a webhook handler in `src/app/api/webhooks/`.
2. Add the necessary secret keys and event configurations in a `.env`.

## Contributing

Contributions are welcome!.

follow the procedure for contributing:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).
