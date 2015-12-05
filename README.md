# Refill My MetroCard 🚇

A simple React app that tells you how much to top up your MetroCard.

## Development

Install the required packages..

```
npm install -g gulp
npm install .
```

Watch files and serve on localhost:8000

```
gulp watch
```

## Deployment

To deploy to S3.

Create a `aws.json` with the following details

```
{
  "key": "A...",
  "secret": "q...",
  "bucket": "www.refillmymetrocard.com",
  "region": "us-east-1"
}
```

Then run

```
gulp bundle --env production
gulp deploy
```