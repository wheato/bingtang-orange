import * as vscode from 'vscode';

type StatusBarToCoin = Map<string, vscode.StatusBarItem>;

export function createStatusBarItem() {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  return statusBarItem;
}

export function updateStatusBar(item: vscode.StatusBarItem, data: MarketCoinItem) {
  item.text = `$(star-full)${data.symbol.toUpperCase()}: $${data.currentPrice}`;
  item.show();
}

export function createStatusBarByCoins(coins: MarketCoins): StatusBarToCoin {
  const statusBars: StatusBarToCoin = new Map();
  coins.forEach(coin => {
    const barItem = createStatusBarItem();
    updateStatusBar(barItem, coin);
    statusBars.set(coin.id, barItem);
  });
  return statusBars;
}

export function updateStatusBarByCoins(bars: StatusBarToCoin, coins: MarketCoins) {
  coins.forEach(coin => {
    const bar = bars.get(coin.id);
    if (!bar) {
      return;
    }
    updateStatusBar(bar, coin);
  });
}