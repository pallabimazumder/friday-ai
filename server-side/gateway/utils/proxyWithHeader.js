import proxy from "express-http-proxy";

export const proxyWithHeader = (targetUrl) => {
    return proxy(targetUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            if (srcReq.user && srcReq.user.userId) {
                proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
            }
        }
    });
};