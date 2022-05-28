import { ApiInvoice } from "@/api/modules/types/invoices.types";
import { Status } from "constants/invoices";
import { Invoice } from "types/invoices";

export const invoiceShaper = (invoice: ApiInvoice): Invoice => {
  return {
    client: {
      name: invoice.clientName,
      email: invoice.clientEmail,
    },
    clientAddress: invoice.clientAddress,
    createdAt: new Date(invoice.createdAt),
    description: invoice.description,
    id: invoice.id,
    items: invoice.items,
    paymentDue: new Date(invoice.paymentDue),
    paymentTerms: invoice.paymentTerms,
    senderAddress: invoice.senderAddress,
    status: statusShaper(invoice.status),
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
