# next-meets-gatsby

> THIS IS DEPCRATED!

**NOTE:** [Go to  this example in the `graphql-gatsby` package.](https://github.com/birkir/graphql-gatsby/tree/master/examples/with-next)


---

> Depricated (OLD)

This is a NextJS app with gatsby graphql server under the hood.

Stuff to look out for:

- http://localhost:3000/graphql for API browser
- `yarn export` works well
- Client side fetching
- Server side fetching

All gatsby plugins that add source nodes via the `sourceNodes` api work.

YES, YOU HEARD RIGHT, ALL GATSBY-SOURCE-* PLUGINS WORK.

### Running thiz

Simple,

```
git clone git@github.com:birkir/next-meets-gatsby.git
cd next-meets-gatsby
yarn
yarn dev
```

---

Exporting

```
yarn export
cd out
python -m SimpleHTTPServer
```
