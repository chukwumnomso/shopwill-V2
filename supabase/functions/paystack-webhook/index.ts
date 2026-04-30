import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const secret = Deno.env.get("PAYSTACK_SECRET_KEY");

    // Verify signature
    if (signature && secret) {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const bodyData = encoder.encode(rawBody);

      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-512" },
        false,
        ["sign"],
      );

      const hash = await crypto.subtle.sign("HMAC", cryptoKey, bodyData);
      const computedSignature = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (signature !== computedSignature) {
        console.error("Invalid signature");
        return new Response("Unauthorized", { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    if (event !== "charge.success") {
      return new Response(JSON.stringify({ message: "Ignored" }), {
        status: 200,
      });
    }

    const supabase = createClient(
      Deno.env.get("PROJECT_URL"),
      Deno.env.get("PROJECT_ANON_KEY"),
    );

    // Check for duplicate order
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("reference")
      .eq("reference", data.reference)
      .single();

    if (existingOrder) {
      return new Response(JSON.stringify({ message: "Order already exists" }), {
        status: 200,
      });
    }

    const metadata = data.metadata || {};
    const cartItems = JSON.parse(metadata.cart_items || "[]");
    const totalAmount = data.amount / 100;

    // Insert order
    const { error: orderError } = await supabase.from("orders").insert({
      reference: data.reference,
      customer_email: data.customer.email,
      customer_name: metadata.customer_name,
      customer_phone: metadata.phone,
      shipping_country: metadata.country,
      shipping_region: metadata.region,
      shipping_address: metadata.apartment,
      postal_code: metadata.postal_code,
      total_amount: totalAmount,
      payment_status: "paid",
      paid_at: new Date().toISOString(),
    });

    if (orderError) throw orderError;

    // Insert order items
    for (const item of cartItems) {
      const { error: itemError } = await supabase.from("order_items").insert({
        order_reference: data.reference,
        product_name: item.product_name,
        product_price: item.product_price,
        quantity: item.quantity,
        size: item.size || null,
        total_price: item.product_price * item.quantity,
      });
      if (itemError) throw itemError;
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});
