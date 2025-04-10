# SEO Scan Pro

SEO Scan Pro is a comprehensive web application that analyzes websites for SEO best practices, providing detailed insights and recommendations to improve search engine rankings.

## Features

- **URL Analysis**: Enter any website URL to analyze its SEO implementation
- **Comprehensive SEO Assessment**: Checks for over 20 critical SEO elements including:
  - Meta tags (title, description, canonical)
  - OpenGraph and Twitter social tags
  - Technical tags (viewport, robots)
  - Structured data (JSON-LD)
- **Visual Previews**: See how your site appears in Google search results and social media shares
- **Score Analysis**: Get an overall SEO score with detailed breakdown
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui components
- **Backend**: Node.js, Express
- **Packages**:
  - React Query for data fetching
  - Cheerio for HTML parsing
  - Zod for schema validation
  - Wouter for routing

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Protospi/seo-scan-pro.git
   cd seo-scan-pro
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5005](http://localhost:5005) in your browser

## Build and Deployment

To build the application for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express API
- `/shared` - Shared types and schemas
- `/public` - Static assets

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or suggestions, please open an issue on GitHub. 