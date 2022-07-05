import { ApiInvoice } from "@/api/modules/invoices/invoices.types";
import camelcaseKeys from "camelcase-keys";
import { Status } from "constants/invoices";
import snakecaseKeys from "snakecase-keys";
import { Invoice, InvoiceData } from "types/invoices";
import { toUTCString } from "utils/date";

export const invoiceShaper = (invoice: ApiInvoice): Invoice => {
  const {
    client_address,
    created_at,
    payment_terms,
    sender_address,
    status,
    ...rest
  } = invoice;

  return {
    clientAddress: camelcaseKeys(invoice.client_address ?? {}),
    createdAt: new Date(invoice.created_at),
    paymentTerms: invoice.payment_terms,
    senderAddress: camelcaseKeys(invoice.sender_address ?? {}),
    status: statusShaper(status),
    items: [],
    ...rest,
  };
};

export const statusShaper = (status: string): Status => {
  const upperCasedStatus = status.toUpperCase();
  return isOneOfStatuses(upperCasedStatus)
    ? Status[upperCasedStatus]
    : Status.PENDING;
};

export const apiInvoiceShaper = (invoice: InvoiceData) => {
  const dateLess = {
    ...invoice,
    createdAt: toUTCString(invoice.createdAt),
  };

  return snakecaseKeys(dateLess, { deep: true });
};

const isOneOfStatuses = (status: string): status is keyof typeof Status => {
  const statuses = Object.keys(Status);
  return statuses.includes(status);
};
