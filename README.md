# React Sample Dashboard

This is a sample project to serve as an introduction to React as well as
the beginnings of a boilerplate approach to building React apps at The
Orchard.  The aim is to offer a repo that can be forked/cloned in order to
quickly get started building an application that makes use of coding
standards as well as baseline packages in use at The Orchard.

The existing
[frontend-distribution](https://github.com/theorchard/frontend-distribution)
project was much of the inspiration behind this boilerplate effort, while the
structure of the dashboard components was almost entirely lifted from the
[official React tutorial](http://facebook.github.io/react/docs/tutorial.html).

Examples of packages/methodologies that make up our baseline:

- Webpack
- Babel
- ESLint
- etc....

## How To Run ##

Webpack is configured to build the entry point `src/index.js` and deposit the
output `bundle.js` file in `build/`:

### Build bundle.js ###

```sh
npm run build
```

We use `webpack-dev-server` to host our app (just opening an html file in your
browser as a local file will not enable all necessary JS functionality).
`webpack-dev-server` has been configured via `webpack.config.js` to serve
`build/` as the path `/assets/` (default port is 8080):

### Boot a server to host your assets ###

```sh
npm start
```

#### Need a custom HOST/PORT? ####
If you'd like to expose your server to team members in the office, you'll need
to have webpack-dev-server bind to your machine's office ip (_not_ localhost):

```sh
npm start -- --hort <external interface ip> --port <port>
```

In order to handle requests to `/api/metrics` to fetch or add data we will run
a Flask server on another port (default is 3000):

### Flask Server for Endpoints ###

```sh
pip install -r requirements.txt
python server.py
```

### Check your work!!! ###

Visit
[http://localhost:8080](http://localhost:8080) in your browser and you should see some metrics!

## Changing Server Host/Port ##

If you plan on sharing your App with the outside world (like your fellow devs)
you'll want your server to listen on your machine's external interface. You can
customize the host/port of the Flask server by setting the `$BIND_HOST` and
`$BIND_PORT` environment variables before invoking the script above, e.g.:

```sh
BIND_HOST=<external_ip> BIND_PORT=3001 python server.py
```

## Run Tests

```sh
npm run test
```

## Run Linter before committing your code
(Maybe we should pull in [Overcommit](https://github.com/brigade/overcommit) ?)

```sh
npm run lint
```

## TODO

- React is all about *components*.  This boilerplate project should make use of
  a basic component structure for the application, i.e., an App component with
  initialization, etc.  See
  [frontend-distribution](https://github.com/theorchard/frontend-distribution)
  or a tutorial
  [like this](http://tutorialzine.com/2015/04/first-webapp-react/) for what
  that could look like.

- Add Redux

- Add Mocha for testing

- Add Bluebird for promises

- Add React-Bootstrap
