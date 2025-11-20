import { MercadoPagoConfig, Preference } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "../config";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { PreferenceResponse } from "mercadopago/dist/clients/preference/commonTypes";
import CartRepository from "../repositories/cart.repository";
import { CustomError } from "./errorMessages";
import Item from "../entities/Item";
import InvoiceRepository from "../repositories/invoice.repository";

const client = new MercadoPagoConfig({ accessToken: MERCADOPAGO_ACCESS_TOKEN });


// DELEGAMOS VALIDACIÓN DE LOS IDs AL SERVICIO ORDERDETAIL
export async function makePayment(cartId: number) {
    console.warn("Hijo mío has llegado a la luz")

    //await InvoiceRepository.createInvoice();
}

export async function createPreference(cartId: number): Promise<Partial<PreferenceResponse>> {
    const preference = new Preference(client);

    const cart = await CartRepository.readCart(cartId);
    if (!cart.is_active) throw new CustomError("El carrito seleccionado ya fue comprado", 400);

    let mercadoPagoItems: Items[] = [];
    const cartItems: Item[] = await CartRepository.loadCartItems(cartId);
    for (const item of cartItems) {
        mercadoPagoItems.push({
            id: "1",
            title: "BitFort AntiVirus",
            unit_price: 1,
            quantity: item.quantity
        });
    }

    const result = await preference.create({
        body: {
            notification_url: "https://infosecure-sas.onrender.com",
            items: mercadoPagoItems,
            back_urls: {
                success: "127.0.0.1:4000/success",
                failure: "127.0.0.1:4000/failure"
            },
            auto_return: "approved"
        },
    });

    const { id, init_point } = result;

    if (!id || !init_point) throw new CustomError("La preferencia no se realizó correctamente", 500);

    return { id, init_point };
}
