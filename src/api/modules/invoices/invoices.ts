import supabase from "@/api";
import { TableType } from "@/api/enums";
import { invoiceShaper } from "@/api/modules/invoices/invoices.shaper";
import {
  ApiInvoice,
  ApiInvoiceDto,
} from "@/api/modules/invoices/invoices.types";

export const invoicesApi = {
  get: async (id?: ApiInvoice["id"]) => {
    const request = supabase.from<ApiInvoice>(TableType.INVOICES).select("*");
    if (id) {
      request.eq("id", id);
    }

    const response = await request;
    const invoices = response.data
      ? response.data.map((invoice) => invoiceShaper(invoice))
      : null;

    return {
      ...response,
      data: invoices,
    };
  },
  delete: async (id: ApiInvoice["id"]) => {
    return supabase.from<ApiInvoice>(TableType.INVOICES).delete().eq("id", id);
  },
  add: async (invoice: ApiInvoiceDto) => {
    return supabase
      .from<ApiInvoiceDto[]>(TableType.INVOICES)
      .insert([invoice], { returning: "minimal" });
  },
} as const;

export default invoicesApi;
