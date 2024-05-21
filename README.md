# WPLT20 API

The WPLT20 API provides data about the Women's Premier League T20 cricket tournament. It scrapes the official page of the tournament using Cheerio, providing users with easy access to the latest information about matches, teams, players, and more.

## Documentation

For detailed documentation and usage examples, please visit the [WPLT20 API Documentation Page](https://wplt20.deno.dev).

## Technologies Used

- Deno
- Cheerio
- JavaScript (ES6)
- itty-router

## Installation

To use the WPLT20 API, you'll need to have Deno installed. You can install the latest version of Deno by visiting the [official Deno website](https://deno.land/#installation).

## Usage

```bash
# Clone the repository
git clone https://github.com/LakhindarPal/wplt20-api.git

# Navigate to the project directory
cd wplt20-api

# Run the API
deno task start
```

Once the server is running, open port 8000 in your localhost. And you can access the API endpoints as documented [here](http://localhost:8000/).

## Note

The structure of the data returned by this API is not consistent due to variations in the official website.
This API does not cover all paths of the official website and may not provide access to all available data.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
