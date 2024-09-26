# e-commerce-store-client

Client for e-commerce shop, built using typescript, webpack and react. It is integrated with server application - e-commerce-store-api.

- Responsive design.
- Product thumbnails with hover effects and dynamic loading states.
- Integrated notifications using react toastify.
- API error handling.
- Custom build process with Webpack.
- User login using http-only cookies.
- User account registration.

Demo is currently being hosted below.
https://e-commerce-store-client.vercel.app

**Other features are in progress.**

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/skjyrte/todo-app-client.git
   ```

2. Navigate into the project directory:

   ```bash
   cd e-commerce-store-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables (explained below).

5. Prepare husky

   ```bash
   npm run husky
   ```

6. Running the app:

   5.1) If you want to run dev server:

   ```bash
   npm run dev
   ```

   5.2) If you want to build the app for production:

   ```bash
   npm run build
   ```

## Environment Variables

The app requires some environment variables to function. You can define them in the root directory. A sample `.env.dev` file is provided inside repository, compatible with "dev" mode of api app. For production builds`.env.prod`shall be created.

```bash
REACT_APP_API_URL = http://localhost:4000
```
