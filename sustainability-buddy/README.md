# Sustainability Buddy 🌱

A personalized AI-powered sustainability coaching web application built with React, Vite, and Tailwind CSS.

## Features

- 🤖 **Agentic AI Coach** - Personalized sustainability advice powered by GPT-4.1-mini via Duke's LiteLLM gateway
- 📊 **Action Tracker** - Track your sustainability actions and see your impact
- 💬 **Interactive Chat** - Have conversations with your AI sustainability coach
- 📅 **Local Events** - Discover sustainability events near you
- 📈 **Impact Dashboard** - Visualize your CO₂, water, and waste savings
- 🎯 **Personalized Suggestions** - AI-generated recommendations based on your routine and preferences

## Tech Stack

- **Frontend:** React 19, Vite 7
- **Styling:** Tailwind CSS 3
- **Routing:** React Router DOM 7
- **Icons:** Lucide React
- **AI:** GPT-4.1-mini via Duke's LiteLLM Enterprise Gateway

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- LiteLLM API credentials from Duke

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sustainability-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_LITELLM_API_KEY=your_api_key_here
   VITE_LITELLM_GATEWAY_URL=https://litellm.oit.duke.edu/v1
   VITE_LITELLM_MODEL=GPT 4.1 Mini
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

This project is configured for easy deployment to Netlify. See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for detailed deployment instructions.

### Quick Deploy to Netlify

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

The `netlify.toml` file is already configured with the correct build settings.

## Project Structure

```
sustainability-buddy/
├── public/              # Static assets (images, redirects)
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions (AI, user profile)
│   └── main.jsx         # Entry point
├── netlify.toml         # Netlify configuration
└── package.json         # Dependencies
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_LITELLM_API_KEY` | LiteLLM API key | Yes |
| `VITE_LITELLM_GATEWAY_URL` | LiteLLM gateway URL | Yes |
| `VITE_LITELLM_MODEL` | AI model name | No (defaults to "GPT 4.1 Mini") |

## License

This project is part of the Duke AI Hackathon 2025.

## Support

For issues or questions, please open an issue in the repository.
