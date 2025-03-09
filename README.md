# PokéExplorer - React Web Application

PokéExplorer is a React-based web application that allows users to browse, search, and save their favorite Pokémon. This project was built as part of the SBA 320H React Web Application Project.

![PokéExplorer Screenshot](screenshot.png)

## Live Demo

[View the live application on Netlify](#) (Link will be updated after deployment)

## Features

- **Browse Pokémon**: View a paginated list of Pokémon from the Pokémon universe
- **Search Functionality**: Search for specific Pokémon by name
- **Detailed Information**: View comprehensive details about each Pokémon including stats, types, abilities, and more
- **Favorites System**: Add and remove Pokémon from your favorites list
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## Technologies Used

- **React**: Frontend JavaScript library for building the user interface
- **Redux Toolkit**: State management for predictable state updates and global store
- **React Router**: Navigation and routing between different pages
- **Axios**: Promise-based HTTP client for making API requests
- **PokeAPI**: External API providing comprehensive Pokémon data
- **CSS3**: Styling with flexbox and grid for responsive design
- **Netlify**: Hosting platform for the deployed application

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pokeexplorer.git
   cd pokeexplorer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   └── store.js          # Redux store configuration
├── components/
│   ├── layout/           # Layout components (Header, Footer, etc.)
│   └── pokemon/          # Pokemon-related components
├── features/
│   └── pokemon/          # Pokemon slice for Redux
├── pages/                # Page components
├── App.js                # Main application component
└── index.js              # Application entry point
```

## API Integration

This project uses the [PokeAPI](https://pokeapi.co/), a free and open RESTful API that provides Pokémon data. The API does not require authentication, making it easy to use for educational projects.

## Deployment

This application is deployed on Netlify. To deploy your own version:

1. Create a production build:
   ```
   npm run build
   ```

2. Deploy to Netlify:
   - Sign up for a Netlify account
   - Connect your GitHub repository or upload the build folder
   - Configure your deployment settings
   - Deploy!

## Future Enhancements

- Filter Pokémon by type, generation, or other attributes
- Compare stats between different Pokémon
- User authentication to save favorites across devices
- Team builder functionality to create balanced Pokémon teams
- Dark mode theme option

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [PokeAPI](https://pokeapi.co/) for providing the Pokémon data
- [Per Scholas](https://perscholas.org/) for the project requirements and guidance
