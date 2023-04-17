// Next.jsではAppコンポーネントを使用して全てのページを初期化するため、Appコンポーネントを継承したクラスが格納される_app.tsxを作成し、再定義することで、デフォルトのAppコンポーネントを上書きできる

import type { AppProps } from 'next/app';
import Head from 'next/head';

// Componentはアクティブなpage、pagePropsはSSR/CSRなどに応じて取得された初期propが格納されるオブジェクト
export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta key="charset" name="charset" content="utf-8" />
				<meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5" />
				<meta property="og:locale" content="ja_JP" />
				<meta property="og:type" content="website" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
