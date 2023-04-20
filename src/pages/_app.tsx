// Next.jsではAppコンポーネントを使用して全てのページを初期化するため、Appコンポーネントを継承したクラスが格納される_app.tsxを作成し、再定義することで、デフォルトのAppコンポーネントを上書きできる

import { CacheProvider, ThemeProvider } from '@emotion/react';
import { Container, CssBaseline } from '@mui/material';
import Head from 'next/head';

import Header from '../components/Header';
import createEmotionCache from '../createEmotionCache';
import theme from '../theme';

import type { EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

// Componentはアクティブなpage、pagePropsはSSR/CSRなどに応じて取得された初期propが格納されるオブジェクト
export default function MyApp(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta key="charset" name="charset" content="utf-8" />
				<meta key="viewport" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5" />
				<meta property="og:locale" content="ja_JP" />
				<meta property="og:type" content="website" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline>
					<Header />
					<Component {...pageProps} />
				</CssBaseline>
			</ThemeProvider>
		</CacheProvider>
	);
}
