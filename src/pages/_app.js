import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

// Bulma
import '../../public/sass/main.scss';
// Components and Utils
import withApollo from '../lib/withApollo';
import Page from '../../components/Page';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        // This will crawl all pages, fetched data and return, before render
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // this exposes the query and path name to the user
        pageProps.query = ctx.query;
        pageProps.asPath = ctx.asPath;

        return { pageProps };
    }

    render() {
        const { Component, apollo, pageProps } = this.props;

        return (
            <ApolloProvider client={apollo}>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ApolloProvider>
        );
    }
}

export default withApollo(MyApp);
