import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const team = searchParams.get('team') || '968' // Wydad AC team ID
  const season = searchParams.get('season') || new Date().getFullYear().toString()

  const apiKey = process.env.FOOTBALL_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    // Get current date and date 90 days from now for upcoming matches
    const today = new Date()
    const futureDate = new Date()
    futureDate.setDate(today.getDate() + 90)
    
    const fromDate = today.toISOString().split('T')[0]
    const toDate = futureDate.toISOString().split('T')[0]

    // Fetch upcoming matches using date range (free plan compatible)
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${team}&season=${season}&from=${fromDate}&to=${toDate}`,
      {
        method: 'GET',
        headers: {
          'x-apisports-key': apiKey,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    console.log(data)

    return NextResponse.json({
      matches: data.response || [],
      count: data.results || 0,
    })
  } catch (error) {
    console.error('Error fetching football matches:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch matches',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
