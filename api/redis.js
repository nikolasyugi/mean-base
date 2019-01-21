module.exports = function (redis) {

	if (process.env.REDIS_URL) var clientRedis = redis.createClient(process.env.REDIS_URL)
	else var clientRedis = redis.createClient()

	clientRedis.on('connect', function () {
		console.log('Connected to Redis')
	})

	clientRedis.on('error', function (err) {
		console.log('Redis error: ' + err)
	})

	return clientRedis
}