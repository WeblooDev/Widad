# Football API Integration Setup

This document explains how to set up the API-SPORTS integration for fetching real-time match data.

## API Provider
- **Provider**: API-SPORTS
- **Endpoint**: https://v3.football.api-sports.io/
- **Documentation**: https://www.api-football.com/documentation-v3

## Setup Instructions

### 1. Get Your API Key
1. Sign up at [API-SPORTS](https://www.api-football.com/)
2. Get your API key from the dashboard
3. Note: Free tier includes 100 requests per day

### 2. Configure Environment Variables
Add your API key to your `.env` file:

```bash
FOOTBALL_API_KEY=your_api_key_here
```

### 3. Team ID
- **Wydad AC Team ID**: `968`
- This is used to fetch matches for Wydad Athletic Club

### 4. Team Logos
Team logos are fetched using the API-SPORTS media URL:
```
https://media.api-sports.io/football/teams/{team_id}.png
```

Example: `https://media.api-sports.io/football/teams/968.png` for Wydad AC

## API Usage

### Endpoint: `/api/football-matches`

**Query Parameters:**
- `team` (optional): Team ID (default: 968 for Wydad AC)
- `season` (optional): Season year (default: current year)

**Note:** The free plan doesn't support the `next` parameter. Instead, the API fetches fixtures within a 90-day date range from today.

**Example Request:**
```javascript
fetch('/api/football-matches?team=968&season=2025')
```

**Response Format:**
```json
{
  "matches": [
    {
      "fixture": {
        "id": 12345,
        "date": "2025-10-22T20:00:00+00:00",
        "venue": {
          "name": "Stade Mohammed V",
          "city": "Casablanca"
        },
        "status": {
          "short": "NS",
          "long": "Not Started"
        }
      },
      "league": {
        "name": "Botola Pro",
        "round": "Regular Season - 8"
      },
      "teams": {
        "home": {
          "id": 968,
          "name": "Wydad AC",
          "logo": "https://media.api-sports.io/football/teams/968.png"
        },
        "away": {
          "id": 123,
          "name": "Raja Casablanca",
          "logo": "https://..."
        }
      },
      "goals": {
        "home": null,
        "away": null
      }
    }
  ],
  "count": 5
}
```

## Match Status Codes

- `NS` - Not Started
- `LIVE` - Live
- `1H` - First Half
- `HT` - Halftime
- `2H` - Second Half
- `FT` - Full Time
- `AET` - After Extra Time
- `PEN` - Penalty Shootout
- `PST` - Postponed
- `CANC` - Cancelled
- `ABD` - Abandoned

## Component Integration

The `WydadMatches` component automatically:
1. Fetches the next 5 matches for Wydad AC
2. Displays the first 3 matches on the homepage
3. Shows live scores for ongoing matches
4. Falls back to mock data if the API fails
5. Handles loading and error states

## Features

- ✅ Real-time match data
- ✅ Live score updates
- ✅ Upcoming matches
- ✅ Venue information
- ✅ Competition detection (League vs Cup)
- ✅ Automatic fallback to mock data
- ✅ Loading states
- ✅ Error handling

## Rate Limits

**Free Tier:**
- 100 requests per day
- 10 requests per minute

**Recommendation:**
- Cache match data on the server
- Implement request throttling
- Consider upgrading for production use

## Troubleshooting

### API Key Not Working
- Verify the key is correctly set in `.env`
- Check if you've exceeded rate limits
- Ensure the key is active in your API-SPORTS dashboard

### No Matches Returned
- Verify Wydad AC team ID (968) is correct
- Check if there are scheduled matches
- The component will fall back to mock data

### CORS Errors
- The API route handles CORS by making server-side requests
- Client-side requests will fail due to CORS restrictions
- Always use the `/api/football-matches` endpoint

## Future Enhancements

Potential improvements:
- Add caching with Redis or similar
- Implement webhook for live score updates
- Add player statistics integration
- Show team standings
- Display match highlights/videos
- Add match predictions
