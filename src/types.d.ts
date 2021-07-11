interface CoinBaseInfo {
  id: string;
  symbol: string;
  name: string;
}

type UserWatchSymbols = string[];

type CoinGeckoListAll = Map<string, CoinBaseInfo>;

interface UserWatchListItem {
  id: string;
  symbol: string;
}

type UserWatchList = UserWatchListItem[];

interface MarketCoinItem {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
}

type MarketCoins = MarketCoinItem[];
