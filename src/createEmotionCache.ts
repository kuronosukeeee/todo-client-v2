// キャッシュ関連の共通処理を記載するファイル
// _app.tsxと_document.tsxから呼ばれる
import createCache from '@emotion/cache';

export default function createEmotionCache() {
	return createCache({ key: 'css', prepend: true });
}
