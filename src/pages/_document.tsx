// Next.jsのPageコンポーネントはデフォルト<html>と<body>タグの定義を行うが、拡張したい場合は_documet.tsxを作成し、Document コンポーネントから各要素をインポートした上で再定義する
// SSRのみ実行されるため、クライアントサイドの処理は書かない
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="ja">
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
