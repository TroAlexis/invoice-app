import supabase from "@/api";
import { invoiceShaper } from "@/api/modules/invoices/invoices.shaper";
import { ApiInvoice } from "@/api/modules/invoices/invoices.types";
import { InvoiceData } from "@/hooks/useInvoiceForm";
import { PostgrestError } from "@supabase/supabase-js";
import snakecaseKeys from "snakecase-keys";
import { Invoice } from "types/invoices";

export const invoicesApi = {
  get: async (id?: Invoice["id"]): Promise<Invoice[]> => {
    const request = supabase.from<ApiInvoice>("invoices").select("*");
    if (id) {
      request.eq("id", id);
    }

    const { data: invoices, error } = await request;

    if (error) {
      throw error;
    }

    return invoices.map((invoice) => invoiceShaper(invoice));
  },
  delete: async (id: Invoice["id"]): Promise<PostgrestError | ApiInvoice[]> => {
    const { data, error } = await supabase
      .from<ApiInvoice>("invoices")
      .delete()
      .eq("id", id);

    return error || data;
  },
  add: async (invoice: InvoiceData) => {
    const invoiceData = [snakecaseKeys(invoice)];
    const { data, error } = await supabase
      .from("invoices")
      .insert(invoiceData, { returning: "minimal" });

    return error || data;
  },
} as const;

export default invoicesApi;
