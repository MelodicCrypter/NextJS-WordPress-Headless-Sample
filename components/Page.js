import React from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import { useQuery } from '@apollo/react-hooks';

//import logo from '../public/img/hc_logo.png';
import { POSTS_QUERY } from './Home';

// NProgress setting
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

// <Page /> Component
const Page = ({ children }) => {
    const { loading, error, data } = useQuery(POSTS_QUERY);

    if (loading) return <>{console.log('loading...')}</>;
    if (error) return <>{console.log('Error')}</>;

    // Get the posts
    const allPosts = data.posts.edges;

    // Handler for toggling menu
    const toggleMenu = e => {
        document.querySelector('#burger').classList.toggle('is-active');
        document.querySelector('#navbarMenu').classList.toggle('is-active');
    };

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link href="/">
                        <a className="navbar-item">
                            <div id="logo">
                                <img src={require('../public/img/hc_logo.png')} />
                            </div>
                        </a>
                    </Link>

                    <a
                        id="burger"
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarMenu"
                        onClick={toggleMenu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarMenu" className="navbar-menu">
                    <div className="navbar-start">
                        <Link href="/">
                            <a className="navbar-item">Home</a>
                        </Link>

                        <Link href="/#">
                            <a className="navbar-item">About</a>
                        </Link>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">Posts</a>

                            <div className="navbar-dropdown">
                                {allPosts &&
                                    allPosts.map(post => {
                                        return (
                                            <Link
                                                key={post.node.id}
                                                href="/blog/[id]"
                                                as={`/blog/${post.node.slug}`}
                                            >
                                                <a className="navbar-item">{post.node.title}</a>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">Log in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {children}

            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Hugh Caluscusin</strong> Sample NextJS for Headless Blog. The source
                        code is licesend{' '}
                        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Page;
