import { NextResponse } from "next/server";
import prisma from "@/client";

// add new expense for groups
export async function POST(req: Request) {
  try {
    const { name, amount, split_type, paid_by, split_details, date, group_id } =
      await req.json();
    console.log(name, amount, split_type, paid_by, split_details);
    if (!name || !amount || !split_type || !paid_by) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Add the expense in the database
    // const newExpense = await prisma.expenses.create({
    //   data: {
    //     name,
    //     total_amount,
    //     split_type,
    //     paid_by,
    //     split_details,
    //     date: new Date(date),
    //     is_settled: false,
    //     group_id,
    //   },
    // });

    // Add the expense in friend group balance

    // 1. fetch the friendship id
    

    return NextResponse.json(
      {
        message: "Expense created successfully",
        // expense: newExpense,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}
