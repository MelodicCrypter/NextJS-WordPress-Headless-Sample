import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';

export default withApollo(
    ({ ctx, headers, initialState }) =>
        new ApolloClient({
            uri: 'https://melodiccrypter.com/headless/graphql',
        }),
);
