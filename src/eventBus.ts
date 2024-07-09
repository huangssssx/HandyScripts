// EventBus 描述
// 一个简单的基于TypeScript的Event Bus（事件总线）实现，用于在应用程序的不同部分之间解耦通信。
// 它提供了三个主要方法：
// 1. on(eventName: string, handler: Function, thisArg: Object): 注册一个事件监听器到指定的事件名上。
// 2. emit(eventName: string, ...args: any[]): 触发一个事件，并调用所有注册到该事件名上的监听器。
// 3. off(eventName: string, handler: Function): 移除注册到指定事件名上的特定监听器。
//
// 内部使用了一个私有Map（#eventMap）来存储事件名和它们对应的监听器数组。
// 监听器是一个对象，包含要调用的handler函数和thisArg上下文。
//
// 这是一个单例模式的EventBus，通过export default new EventBus();导出，使得在应用中只存在一个EventBus实例。

type EventArgs = {
    handler: Function,
    thisArg: Object
}


class EventBus {
    constructor() {

    }

    #eventMap = new Map<string, EventArgs[]>();

    on = (eventName: string, handler: Function, thisArg: Object) => {
        const eventMap = this.#eventMap;
        if (!eventMap.has(eventName)) {
            eventMap.set(eventName, []);
        }

        const handlers = eventMap.get(eventName) ?? [];
        eventMap.set(eventName, [...handlers, { handler, thisArg }]);
    }

    emit = (eventName: string, ...args: any) => {
        const eventMap = this.#eventMap
        if (eventMap.has(eventName)) {
            const eventArgs = eventMap.get(eventName) || [];
            eventArgs.forEach(({ handler, thisArg }) => {
                handler.call(thisArg, ...args);
            });
        }
    }

    off = (eventName: string, handler: Function) => {
        const eventMap = this.#eventMap;
        const newHandlers = eventMap.get(eventName)?.filter(({ handler }) => handler !== handler) ?? [];
        eventMap.set(eventName, newHandlers);
    }
}


export default new EventBus();