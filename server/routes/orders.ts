// server/routes/orders.ts

export default defineEventHandler(async (event) => {
    const session = event.context.session;

    const response = await fetch('https://api.youcanshop.dev/orders', {
        headers: {
            Authorization: 'Bearer ' + session.accessToken
        }
    });
    const orders = await response.json();

    return orders;
});