import React from 'react';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import {initApollo} from './init-apollo';

export default (App) => {
  return class Apollo extends React.Component {
    static displayName = 'withApollo(App)';
    static async getInitialProps (ctx) {
      const { Component, router, ctx: { req } } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      const apollo = initApollo();
      if (!process.browser) {
        try {
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          console.error('Error while running `getDataFromTree`', error)
        }

        Head.rewind();
      }

      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor (props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render () {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  }
}