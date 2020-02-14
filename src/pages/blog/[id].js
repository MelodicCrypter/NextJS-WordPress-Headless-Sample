import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Head from 'next/head';

const SINGLE_POST_QUERY = gql`
    query SINGLE_POST_QUERY($slug: String) {
        postBy(slug: $slug) {
            id
            date
            excerpt
            title
            slug
            content
            featuredImage {
                sourceUrl
            }
            categories {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
            author {
                id
                name
            }
        }
    }
`;

// <Home /> Component
const Blog = ({ query: { id } }) => {
    const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
        variables: {
            slug: id,
        },
    });

    if (loading) return <>{console.log('loading...')}</>;
    if (error) return <>{console.log('Error')}</>;

    // Get the post, category
    const post = data.postBy;
    const postCategory = data.postBy.categories.edges;

    return (
        <>
            <Head>
                <title>Headless NextJS and WordPress</title>
            </Head>

            <section id="postTemplateHero" className="hero is-shady is-medium has-background">
                <div className="hero-background is-transparent">
                    {post.featuredImage && (
                        <img
                            className="hero-img"
                            src={post.featuredImage.sourceUrl}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    )}
                </div>

                <div className="hero-body has-text-centered">
                    <div className="container">
                        <h1 className="title is-1">{post.title}</h1>
                        <h2 className="subtitle">by {post.author.name}</h2>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column"></div>

                        <div className="column is-three-quarters">
                            <div className="level">
                                <div className="level-left">
                                    <div className="level-item">
                                        <Link href="/">
                                            <a>
                                                <span className="subtitle is-6">👈 Go Back</span>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="level-right">
                                    <div className="level-item">
                                        <p className="is-5">
                                            <span className="is-6 has-text-weight-medium">
                                                CATEGORY:{' '}
                                            </span>{' '}
                                            {post.categories &&
                                                postCategory.map(category => category.node.name)}{' '}
                                            | <span className="is-6">{post.date}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <br />
                            <br />

                            <div className="" dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        <div className="column"></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
