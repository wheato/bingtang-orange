
export function getQueryList(
  coins: CoinGeckoListAll,
  symbols: UserWatchSymbols
): { ids: string[], symbols: string []} {
  const ids = symbols.map(s => {
    return coins.get(s.toLowerCase())?.id ?? '';
  });
  const lowerCaseSymbols = symbols.map(s => s.toLowerCase());
  return { 
    ids,
    symbols: lowerCaseSymbols,
  };
}

export function createMarketCoinsData(data: any[]): MarketCoins {
  return data.map((item: any) => ({
    currentPrice: item.current_price,
    name: item.name,
    id: item.id,
    symbol: item.symbol
  }));
}