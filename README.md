<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<h1 align="center">
  WordPress, NextJS, Apollo, GraphQL, and Netlify (sample)
</h1>



This is just a sample implementation of a headless blogging. And the goal for this example was to only pull (Read) data and put the data on an external frontend.

NOTE: Before you proceed below, you need to install two plugins within your WordPress site first: [wp-graphql](<https://github.com/wp-graphql/wp-graphql>) and [wp-graphiql](<https://github.com/wp-graphql/wp-graphiql>). Both these two will convert your wordpress into a GraphQL graph-based website and you also have an GraphQL playground as well. After installing you can proceed below.

1. **Edit withApollo.js file inside src/lib/**

    Change WordPress details so that you can connect to it.

    ```shell
    export default withApollo(
        ({ ctx, headers, initialState }) =>
            new ApolloClient({
                uri: 'YourWordPressGraphQLHere',
            }),
    );
    ```

1. **Development.**

    Run the code below and you can start messing up with this repo 😉

    ```shell
    yarn dev
    ```

1. **Deploying to Netlify.**

    Create a new repository first at GitHub, then inside Netlify link your newly created repo. Then edit Build Command inside Netlify and set it to ```yarn deploy``` and then the Publish Directory to ```out``` . After that you can start pushing your local files to your newly created repo.
