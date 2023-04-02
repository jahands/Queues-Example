interface QueueData {
	pathname: string
}
export interface Env {
	QUEUE: Queue<QueueData>
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url)
		await env.QUEUE.send({ pathname: url.pathname })
		return new Response("Hello World!")
	},

	async queue(batch: MessageBatch<QueueData>, env: Env, ctx: ExecutionContext) {
		for (const message of batch.messages) {
			console.log(message.body.pathname)
			message.ack()
		}
	}
};
