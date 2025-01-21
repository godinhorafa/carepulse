"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        // Ensure we're getting a number
        const amount = typeof row.getValue("amount") === "string" 
          ? parseFloat(row.getValue("amount")) 
          : row.getValue("amount") as number;
  
        // Check if amount is a valid number
        if (isNaN(amount)) return <div className="text-right font-medium">Invalid amount</div>;
  
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount);
  
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
  ];
