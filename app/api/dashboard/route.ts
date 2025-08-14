import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the base URL from the request
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    const [aaveResponse, banksResponse] = await Promise.all([
      fetch(`${baseUrl}/api/aave`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      fetch(`${baseUrl}/api/banks`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ]);

    if (!aaveResponse.ok || !banksResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const aaveData = await aaveResponse.json();
    const banksData = await banksResponse.json();

    // Combine all entries
    const allEntries = [
      ...banksData.data,
      aaveData.data
    ];

    // Sort by deposit value in descending order (highest first)
    const sortedEntries = allEntries.sort((a, b) => b.depositsValue - a.depositsValue);

    // Assign dynamic ranks based on actual deposit values
    const rankedEntries = sortedEntries.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));

    // Find Aave's rank
    const aaveEntry = rankedEntries.find(entry => entry.isAave);
    const aaveRank = aaveEntry ? aaveEntry.rank : null;

    // Remove position change indicator as requested

    return NextResponse.json({
      success: true,
      data: rankedEntries,
      metadata: {
        totalEntries: rankedEntries.length,
        aaveRank: aaveRank,
        aaveDeposits: aaveEntry?.depositsValue,
        source: banksData.source,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch dashboard data'
    }, { status: 500 });
  }
}
