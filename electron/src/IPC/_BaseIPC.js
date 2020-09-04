class BaseIPC {
  async handle(event, request) {
    const { command, params } = request;
    const method = this[command];

    if (!method || typeof method !== "function")
      return this.notify(event, request, this.error(Error(`Unknown command "${command}"`)));

    try {
      const data = await method(params);
      return this.notify(event, request, data);
    } catch (error) {
      console.error(error);
      return this.notify(event, request, this.error(error));
    }
  }

  notify(event, request, data) {
    event.sender.send(request.responseChannel, data);
  }

  error(error) {
    return {
      isError: true,
      message: `${this.getName()} : ${error.message}`,
    };
  }
}

module.exports = BaseIPC;
