import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering - don't cache this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Import the handler functions directly to avoid internal API calls
async function getAaveData() {
  try {
    // Fetch Aave protocol data from DeFiLlama API
    // Disable caching due to large response size (>2MB)
    const aaveResponse = await fetch('https://api.llama.fi/protocol/aave-v3', {
      cache: 'no-store'
    });
    
    if (!aaveResponse.ok) {
      throw new Error('Failed to fetch Aave data');
    }
    
    const aaveData = await aaveResponse.json();
    
    // Calculate total TVL including borrowed amounts
    const latestTvl = aaveData.currentChainTvls;
    let totalTvl = 0;
    const totalBorrowed = latestTvl.borrowed || 0;
    
    // Sum all chain TVLs excluding borrowed entries
    Object.entries(latestTvl).forEach(([chain, value]: [string, any]) => {
      if (!chain.includes('-borrowed') && chain !== 'borrowed') {
        totalTvl += value;
      }
    });
    
    // Include total borrowed amounts in the final calculation
    const finalValue = totalTvl + totalBorrowed;
    const tvlInBillions = finalValue / 1000000000;
    
    return {
      name: 'Aave',
      logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
      deposits: `$${tvlInBillions.toFixed(3)} B`,
      depositsValue: tvlInBillions,
      isAave: true
    };
  } catch (error) {
    // Fallback data
    return {
      name: 'Aave',
      logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
      deposits: '$67.921 B',
      depositsValue: 67.921,
      isAave: true
    };
  }
}

async function getBanksData() {
  // Based on the Federal Reserve data from search results
  const knownBankData = [
    { name: 'JPMORGAN CHASE BK NA/JPMORGAN CHASE & CO', rank: 1, assets: 3643099 },
    { name: 'BANK OF AMER NA/BANK OF AMER CORP', rank: 2, assets: 2615296 },
    { name: 'CITIBANK NA/CITIGROUP', rank: 3, assets: 1760921 },
    { name: 'WELLS FARGO BK NA/WELLS FARGO & CO', rank: 4, assets: 1711028 },
    { name: 'U S BK NA/U S BC', rank: 5, assets: 659191 },
    { name: 'GOLDMAN SACHS BK USA/GOLDMAN SACHS GROUP THE', rank: 6, assets: 598460 },
    { name: 'PNC BK NA/PNC FNCL SVC GROUP', rank: 7, assets: 549324 },
    { name: 'TRUIST BK/TRUIST FC', rank: 8, assets: 527488 },
    { name: 'CAPITAL ONE NA/CAPITAL ONE FC', rank: 9, assets: 490573 },
    { name: 'STATE STREET B&TC/STATE STREET CORP', rank: 10, assets: 368219 },
    { name: 'TD BK NA/TD GRP US HOLDS LLC', rank: 11, assets: 366507 },
    { name: 'BANK OF NY MELLON/BANK OF NY MELLON CORP', rank: 12, assets: 356262 },
    { name: 'BMO BK NA/BMO FNCL CORP', rank: 13, assets: 257049 },
    { name: 'MORGAN STANLEY BK NA/MORGAN STANLEY', rank: 14, assets: 234481 },
    { name: 'FIRST-CITIZENS B&TC/FIRST CITIZENS BSHRS', rank: 15, assets: 228632 },
    { name: 'MORGAN STANLEY PRIV BK NA/MORGAN STANLEY', rank: 16, assets: 223785 },
    { name: 'CITIZENS BK NA/CITIZENS FNCL GRP', rank: 17, assets: 220014 },
    { name: 'FIFTH THIRD BK NA/FIFTH THIRD BC', rank: 18, assets: 211921 },
    { name: 'MANUFACTURERS & TRADERS TC/M&T BK CORP', rank: 19, assets: 209801 },
    { name: 'HUNTINGTON NB/HUNTINGTON BSHRS', rank: 20, assets: 208159 },
    { name: 'AMERICAN EXPRESS NB/AMERICAN EXPRESS CO', rank: 21, assets: 203448 },
    { name: 'KEYBANK NA/KEYCORP', rank: 22, assets: 185776 },
    { name: 'ALLY BK/ALLY FNCL', rank: 23, assets: 182323 },
    { name: 'HSBC BK USA NA/HSBC N AMER HOLDS', rank: 24, assets: 166237 },
    { name: 'NORTHERN TC/NORTHERN TR CORP', rank: 25, assets: 164498 },
    { name: 'REGIONS BK/REGIONS FC', rank: 26, assets: 158421 },
    { name: 'DISCOVER BK/DISCOVER FS', rank: 27, assets: 145413 },
    { name: 'SANTANDER BK NA/SANTANDER HOLDS USA', rank: 28, assets: 104559 },
    { name: 'FLAGSTAR BK NA/FLAGSTAR FNCL', rank: 29, assets: 97568 },
    { name: 'CITY NB/RBC US GRP HOLDS LLC', rank: 30, assets: 93149 },
    { name: 'ZIONS BC NA', rank: 31, assets: 87992 },
    { name: 'WESTERN ALLI BK/WESTERN ALLI BC', rank: 32, assets: 82944 },
    { name: 'FIRST HORIZON BK/FIRST HORIZON CORP', rank: 33, assets: 81202 },
    { name: 'WEBSTER BK NA/WEBSTER FNCL CORP', rank: 34, assets: 80212 },
    { name: 'COMERICA BK/COMERICA', rank: 35, assets: 77698 },
    { name: 'EAST WEST BK/EAST WEST BC', rank: 36, assets: 75712 },
    { name: 'UMB BK NA/UMB FC', rank: 37, assets: 69014 },
    { name: 'SOUTHSTATE BK NA/SOUTHSTATE CORP', rank: 38, assets: 65109 },
    { name: 'VALLEY NB/VALLEY NAT BC', rank: 39, assets: 61818 },
    { name: 'CIBC BK USA/CIBC BC USA', rank: 40, assets: 61303 },
    { name: 'SYNOVUS BK/SYNOVUS FC', rank: 41, assets: 60208 },
    { name: 'PINNACLE BK/PINNACLE FNCL PTNR', rank: 42, assets: 54173 }
  ];

  return knownBankData.map(bank => {
    // Convert assets from millions to billions  
    const assetsInBillions = bank.assets / 1000;
    
    // Estimate deposits as 80% of total assets
    const estimatedDeposits = assetsInBillions * 0.80;
    
    return {
      name: bank.name,
      deposits: `$${estimatedDeposits.toFixed(1)} B`,
      depositsValue: estimatedDeposits,
      isAave: false,
      rank: bank.rank,
      assets: assetsInBillions
    };
  });
}

export async function GET(request: NextRequest) {
  try {
    // Get data directly without internal API calls
    const [aaveData, banksData] = await Promise.all([
      getAaveData(),
      getBanksData()
    ]);

    // Combine all entries
    const allEntries = [
      ...banksData,
      aaveData
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
        source: 'https://www.federalreserve.gov/releases/lbr/current/',
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
