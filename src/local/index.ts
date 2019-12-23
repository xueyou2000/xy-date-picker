import LocalZh from "./zh";

/**
 * 获取消息对象
 * @param key
 */
export function getLocal() {
    return (window as any).GlobalComponentLocal || LocalZh;
}
