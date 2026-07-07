import { JwtPayload } from "jsonwebtoken"
import config from "../../config";
import { prisma } from "../../lib/prisma";
import axios from "axios";
import { InputJsonValue } from "@prisma/client/runtime/client";

const createPayment = async (rentalRequestId: string, user: JwtPayload) => {
    const order = await prisma.rentalRequest.findUnique({
        where: {
            id: rentalRequestId
        }
    })
    const tranId = `TRNX_ID_${Date.now()}`;
    const paymentData = {
        store_id: config.ssl_commerz_store_id,
        store_passwd: config.ssl_commerz_store_passwd,
        total_amount: order?.totalAmount,
        currency: "BDT",
        tran_id: tranId,
        success_url: `${config.app_url}/api/payments/confirm?orderId=${order?.id}&tranId=${tranId}&status=success`,
        fail_url: `${config.app_url}/api/payments/confirm?orderId=${order?.id}&tranId=${tranId}&status=fail`,
        cancel_url: `${config.app_url}/api/payments/confirm?orderId=${order?.id}&tranId=${tranId}&status=cancel`,
        cus_name: user.name,
        cus_email: user.email,
        cus_add1: "N/A",
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: 1000,
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
    };

    const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        paymentData,
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
    );

    const data = await response.data;
    await prisma.payment.create({
        data: {
            transactionId: tranId,
            rentalRequestId: order?.id as string,
            amount: Number(order?.totalAmount),
        },
    });

    const GatewayPageURL = data.GatewayPageURL;

    return GatewayPageURL;
}
const verifyPayment = async (
  orderId: string,
  tranId: string,
  status: string,
  payload: Record<string, unknown>,
) => {
  const response = await axios.post(
    `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${payload.val_id}&store_id=${config.ssl_commerz_store_id}&store_passwd=${config.ssl_commerz_store_passwd}&format=json`,

    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  const data = await response.data;
  console.log(data);
  if (data.status === "VALID") {
    await prisma.rentalRequest.update({
      where: { id: orderId },
      data: {
        status: "ACCEPTED",
      },
    });
    await prisma.payment.update({
      where: { transactionId:tranId },
      data: {
        status: "PAID",
        meta:payload as InputJsonValue
      },
    });
  } else if (
    data.status === "FAILED" ||
    data.status === "INVALID_TRANSACTION"
  ) {
    await prisma.rentalRequest.update({
      where: { id: orderId },
      data: {
        status: "REJECTED",
      },
    });
    await prisma.payment.update({
      where: { transactionId:tranId },
      data: {
        status: "FAILED",
        meta: payload as InputJsonValue
      },
    });
  }

  return status;
};
const getPaymentHistory=async()=>{
    const result = await prisma.payment.findMany()
    return result
}
const getPaymentHistoryById=async(paymentId : string)=>{
    const result = await prisma.payment.findUniqueOrThrow({
        where:{
            id: paymentId
        }
    })
    return result
}
export const paymentService = {
    createPayment,
    verifyPayment,
    getPaymentHistory,
    getPaymentHistoryById
}