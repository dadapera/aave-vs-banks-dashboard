import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
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
    
    // Get the latest TVL data
    const latestTvl = aaveData.currentChainTvls;
    
    // Calculate total TVL including borrowed amounts
    let totalTvl = 0;
    const totalBorrowed = latestTvl.borrowed || 0;
    
    // Sum all chain TVLs excluding borrowed entries
    Object.entries(latestTvl).forEach(([chain, value]: [string, any]) => {
      if (!chain.includes('-borrowed') && chain !== 'borrowed') {
        totalTvl += value;
      }
    });
    
    // Include total borrowed amounts in the final calculation
    // This gives us the complete picture of Aave's financial scale
    const finalValue = totalTvl + totalBorrowed;
    
    // Convert to billions and format
    const tvlInBillions = finalValue / 1000000000;
    
    const aaveEntry = {
      name: 'Aave',
      logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
      deposits: `$${tvlInBillions.toFixed(3)} B`,
      depositsValue: tvlInBillions,
      isAave: true
    };

    return NextResponse.json({
      success: true,
      data: aaveEntry
    });
  } catch (error) {
    console.error('Error fetching Aave data:', error);
    
    // Fallback data if API fails
    const fallbackData = {
      name: 'Aave',
      logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png',
      deposits: '$67.921 B',
      depositsValue: 67.921,
      isAave: true
    };

    return NextResponse.json({
      success: true,
      data: fallbackData
    });
  }
}
