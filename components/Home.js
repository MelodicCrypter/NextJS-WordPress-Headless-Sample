import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Head from 'next/head';

const POSTS_QUERY = gql`
    query {
        posts {
            edges {
                node {
                    slug
                    id
                    title
                    author {
                        username
                        slug
                        id
                        name
                        description
                        avatar {
                            url
                        }
                    }
                    content
                    date
                    excerpt
                    featuredImage {
                        sourceUrl
                        title
                    }
                    tags {
                        edges {
                            node {
                                id
                                name
                            }
                        }
                    }
                    categories {
                        edges {
                            node {
                                id
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

// <Home /> Component
const Home = props => {
    const { loading, error, data } = useQuery(POSTS_QUERY);

    if (loading) return <>{console.log('loading...')}</>;
    if (error) return <>{console.log('Error')}</>;

    // Get the posts
    const posts = data.posts.edges;

    return (
        <>
            <Head>
                <title>Headless NextJS and WordPress</title>
            </Head>

            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column"></div>

                        <div className="column is-four-fifths">
                            <div className="row columns">
                                {posts.map(post => {
                                    return (
                                        <div key={post.node.id} className="column is-one-third">
                                            <div className="card large">
                                                <div className="card-image">
                                                    <figure className="image">
                                                        <Link
                                                            href="/blog/[id]"
                                                            as={`/blog/${post.node.slug}`}
                                                        >
                                                            <a>
                                                                <img
                                                                    src={
                                                                        post.node.featuredImage
                                                                            .sourceUrl
                                                                    }
                                                                    alt={
                                                                        post.node.featuredImage
                                                                            .title
                                                                    }
                                                                />
                                                            </a>
                                                        </Link>
                                                    </figure>
                                                </div>
                                                <div className="card-content">
                                                    <h5 className="title is-3">
                                                        <Link
                                                            href="/blog/[id]"
                                                            as={`/blog/${post.node.slug}`}
                                                        >
                                                            <a className="post-title">
                                                                {post.node.title}
                                                            </a>
                                                        </Link>
                                                    </h5>
                                                    <div className="media">
                                                        <div className="media-left">
                                                            <figure className="image is-48x48">
                                                                <img
                                                                    className="is-rounded"
                                                                    src={
                                                                        post.node.author.avatar.url
                                                                    }
                                                                    alt="Author Avatar"
                                                                />
                                                            </figure>
                                                        </div>
                                                        <div className="media-content">
                                                            <p className="title is-5 no-padding author-name">
                                                                {post.node.author.name}
                                                            </p>
                                                            <p className="author-link">
                                                                <span className="is-6">
                                                                    <a href="#">@twitterid</a>
                                                                </span>
                                                            </p>
                                                            <p className="subtitle is-6">
                                                                {post.node.author.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <div
                                                            className="excerpt"
                                                            dangerouslySetInnerHTML={{
                                                                __html: post.node.excerpt,
                                                            }}
                                                        />
                                                        <div className="background-icon">
                                                            <span className="icon-twitter"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="column"></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
export { POSTS_QUERY };
