/**
 * Script to convert a CSV file with source and destination URLs to a JSON file with redirects.
 * 
 * Usage: node script.js <input.csv> <output.json> [sourceColumn] [destinationColumn]
 * 
 * If sourceColumn and destinationColumn are not provided, they default to 'from' and 'to'.
 */
const fs = require('fs');
const csv = require('csv-parser');
const { URL } = require('url');

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node script.js <input.csv> <output.json> [sourceColumn] [destinationColumn]');
  process.exit(1);
}

const inputFile = args[0]; // Input CSV file
const outputFile = args[1]; // Output JSON file

// Configure the column names for source and destination
const sourceColumn = args[2] || 'from';
const destinationColumn = args[3] || 'to';

// Array to store the redirect objects
const redirects = [];

// Read the CSV file
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    let source = row[sourceColumn];
    let destination = row[destinationColumn];

    if (source && destination) {
      // Convert absolute URLs to relative paths
      try {
        source = new URL(source).pathname || '/';
      } catch (e) {
        // If not a valid URL, assume it's already a relative path
        if (!source.startsWith('/')) {
          source = '/' + source;
        }
      }

      try {
        destination = new URL(destination).pathname || '/';
      } catch (e) {
        // If not a valid URL, assume it's already a relative path
        if (!destination.startsWith('/')) {
          destination = '/' + destination;
        }
      }

      redirects.push({
        source,
        destination,
        permanent: true,
      });
    }
  })
  .on('end', () => {
    // Write the redirects array to the output JSON file
    fs.writeFileSync(outputFile, JSON.stringify(redirects, null, 2));
    console.log('Redirects processed and saved to', outputFile);
  });