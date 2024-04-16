
# what-is-the-weather CLI app

## Overview
what-is-the-weather is a Command-Line Interface (CLI) application that allows users to retrieve weather information for a specified city. This app leverages the OpenWeather API to fetch real-time weather data based on the user's input.

## Installation
You can install what-is-the-weather globally via npm by running the following command:

```bash
npm install -g what-is-the-weather
```

## Usage
After installation, you can use the app directly from the command line. Here are some examples of how to use it:

### Basic Usage
To retrieve the weather for a specific city, simply provide the city name as a command-line argument:

```bash
what-is-the-weather -c "New York"
```

### Providing API Key
You can also provide your OpenWeather API key to ensure accurate weather data retrieval:

```bash
what-is-the-weather -k "your-api-key" -c "London"
```

### Help
For more information and available options, you can use the help command:

```bash
what-is-the-weather --help
```

## Note
Ensure you have a valid API key from OpenWeather. You can obtain one by signing up at [OpenWeather](https://home.openweathermap.org/users/sign_up).

