# CSV to Next.js Redirects Converter

A Node.js script that converts a CSV file containing redirect URLs into a JSON file formatted for use with Next.js. The script handles absolute URLs by converting them into relative paths suitable for Next.js routing.

## Features

- **CSV to JSON Conversion**: Converts CSV files with redirect mappings into a JSON format compatible with Next.js.
- **Absolute to Relative URL Conversion**: Automatically converts absolute URLs to relative paths.
- **Configurable Columns**: Allows customization of source and destination column names.
- **Error Handling**: Gracefully handles invalid URLs and ensures all paths are correctly formatted.

## Requirements

- [Node.js](https://nodejs.org/) (version 10 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## Installation

1. **Clone the repository** (or download the script):

   ```bash
   git clone https://github.com/yourusername/csv-to-nextjs-redirects.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd csv-to-nextjs-redirects
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## Usage
The script converts a CSV file of redirects into a JSON file for Next.js. It can be run from the command line with the following syntax:

`node script.js <input.csv> <output.json> [sourceColumn] [destinationColumn]`

### Example

#### Prepare your CSV file (redirects.csv):

```
from,to
https://www.example.com/homepage,https://www.example.com/
https://www.example.com/old-about,https://www.example.com/about
https://www.example.com/old-contact,https://www.example.com/contact
https://www.example.com/old-products,https://www.example.com/products
https://www.example.com/old-services,https://www.example.com/services
```

#### Run the script:

```bash
node script.js redirects.csv redirects.json from to
```

## Output (redirects.json):

```json
[
  {
    "source": "/old-page",
    "destination": "/new-page",
    "permanent": true
  },
  {
    "source": "/legacy-contact",
    "destination": "/contact",
    "permanent": true
  },
  {
    "source": "/outdated-about",
    "destination": "/about",
    "permanent": true
  }
]
```

## License

This project is licensed under the MIT License.
