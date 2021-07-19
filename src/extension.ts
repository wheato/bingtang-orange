/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import CoinGecko from 'coingecko-api';
import { createStatusBarByCoins, createStatusBarItem, updateStatusBar, updateStatusBarByCoins } from './statusBar';
import { createMarketCoinsData, getQueryList } from './utils';

const coinsMap: CoinGeckoListAll = new Map();
const coinGeckoClient = new CoinGecko();
const mockWatchList: UserWatchSymbols = ['BTC', 'ETH', 'BNB', 'ALPACA'];

export async function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "bingtang-orange" is now active!');

	const list = await (coinGeckoClient.coins as any).list({
		'include_platform': false,
	});
	if (!list.success) {
		//todo: null
		return;
	}

	list.data.forEach((item: any) => {
		coinsMap.set(item.symbol, item);
	});

	const queries = getQueryList(coinsMap, mockWatchList);

	const watchedCoins = await (coinGeckoClient.coins as any).markets({
		ids: queries.ids,
		per_page: queries.ids.length,
	});
	const coins = createMarketCoinsData(watchedCoins.data);
	const statusBars = createStatusBarByCoins(coins);

	context.subscriptions.push(...statusBars.values());

	setInterval(async () => {
		const watchedCoins = await (coinGeckoClient.coins as any).markets({
			ids: queries.ids,
			per_page: queries.ids.length,
		});
		const coins = createMarketCoinsData(watchedCoins.data);
		updateStatusBarByCoins(statusBars, coins);
	}, 1000 * 60);
}


export function deactivate() {}
