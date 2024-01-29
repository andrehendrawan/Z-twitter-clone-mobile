module.exports = {
	apps: [{
		name: "app1",
		script: "./app.js",
		env: {
			MONGODB_URI: "mongodb+srv://andrehendrawan:7V0EYhToemrPy2Ef@cluster0.8kfq6ka.mongodb.net/?retryWrites=true&w=majority",
			JWT_SECRET: "phase3",
			REDIS_PASSWORD: "vzfdqSPCnjFifruGLYgixcU1ghEl2Reb",
			NODE_ENV: "production",
			PORT: 80
		}
	}]
}
