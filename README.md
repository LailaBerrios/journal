# PTSD Journal App
This app is a simple journalling app with extra features to track one's emotional state as part of a PTSD treatment plan. 

### History
This app was initially developed as a Google sheets app by Laila Berrios, and is now being adapted into a Javascript app by Joyce Mayorga and Laila Berrios.

### Technology
This app is being built, in part, as a motivator for building a full stack node.js app, complete with front end, back end, databse, etc.  It's an experiment and a tool for personal learning, so the technologies being used are important.

Technologies in use:

* Node.js server
* Express.js route dispatching
* React.js front end
* Webpack build system
* Babel for ES6/JSX

# Getting Started
You want to help out with this app?  OMG, that's so cool!  Here's what you need to know.

## Building and running
1. Fork the repository on github. (optional, but important)
2. Clone the repository to your local machine.
	<code>git clone git@github.com:YOUR_USER/journal.git</code>
3. Install dependencies.
	<pre><code>cd journal
	npm install</code></pre>
4. Build the code
	<pre><code>npm run build
	OR
	webpack
	</code></pre>
5. Run the server
	<pre><code>npm start
	OR
	node build/server.js
	</code></pre>

## Deploying to Heroku
The app is currently being run at [Heroku](http://heroku.com) as [ptsd-journal](http://ptsd-journal.herokuapp.com).  We are using an automatic deploy system that builds and runs whatever is currently in the master branch of [Joyce's github repository for the project](https://github.com/joycem137/journal).

If you have changes you would like to see on the server, simply create a pull request to master on this repository.

However, it is recommended that you merge to dev initially, and we push when we know we have a good build to push.

#### Branch structure
* dev - The current branch for development work
* master - What is currently in "production" at Heroku.