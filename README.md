# Drinking Games Website

A simple, interactive static website built with React that showcases popular drinking games. Perfect for deployment on Netlify!

## Features

- � Interactive game cards with flip animations
- 📱 Fully responsive design
- 🎨 Beautiful gradient background with glassmorphism effects
- ⚡ Fast loading and optimized for static hosting
- 🚀 Ready for Netlify deployment
- 🎉 8 popular drinking games included

## Tech Stack

- **React 18** - Frontend framework
- **HTML5** - Structure
- **CSS3** - Styling with modern effects
- **JavaScript (ES6+)** - Functionality

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd drinking-games-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Please drink responsibly!** This website is for entertainment purposes and promotes responsible drinking.

## Building for Production

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## Deploying to Netlify

### Option 1: Drag and Drop
1. Run `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `build` folder to deploy

### Option 2: Git Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy!

### Option 3: Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod --dir=build`

## Project Structure

```
drinking-games-website/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── GameCard.js
│   │   └── GameCard.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Customization

### Adding New Drinking Games
Edit the `games` array in `src/App.js`:

```javascript
{
  id: 9,
  title: "Your Game Title",
  description: "Game description and drinking rules",
  players: "X-Y players",
  difficulty: "Easy" // Easy, Medium, or Hard
}
```

### Styling
- Main styles: `src/App.css`
- Header styles: `src/components/Header.css`
- Game card styles: `src/components/GameCard.css`
- Global styles: `src/index.css`

## Performance Features

- Code splitting with React.lazy() (can be added)
- Optimized images and assets
- Minimal bundle size
- Fast loading animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

---

Made with ❤️ for epic parties! Please drink responsibly and know your limits.
