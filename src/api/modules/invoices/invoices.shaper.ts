import { ApiInvoice } from "@/api/modules/invoices/invoices.types";
import camelcaseKeys from "camelcase-keys";
import { Status } from "constants/invoices";
import { Invoice } from "types/invoices";

export const invoiceShaper = (invoice: ApiInvoice): Invoice => {
  const {
    client_address,
    created_at,
    payment_due,
    payment_terms,
    sender_address,
    status,
    ...rest
  } = invoice;

  return {
    clientAddress: camelcaseKeys(invoice.client_address),
    createdAt: new Date(invoice.created_at),
    paymentDue: new Date(invoice.payment_due),
    paymentTerms: invoice.payment_terms,
    senderAddress: camelcaseKeys(invoice.sender_address),
    status: statusShaper(status),
    ...rest,
  };
};

export const statusShaper = (status: string): Status => {
  const upperCasedStatus = status.toUpperCase();
  return isOneOfStatuses(upperCasedStatus)
    ? Status[upperCasedStatus]
    : Status.PENDING;
};

const isOneOfStatuses = (status: string): status is keyof typeof Status => {
  const statuses = Object.keys(Status);
  return statuses.includes(status);
};
