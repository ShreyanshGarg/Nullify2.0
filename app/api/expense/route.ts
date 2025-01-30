import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// create new expense for friends
// create new expense for friends
export async function POST(req: Request) {
  try {
    const {
      name,
      total_amount,
      split_type,
      paid_by,
      friendship_id,
      split_details,
      date,
    } = await req.json();

    // Validate required fields
    if (!name || !total_amount || !split_type || !paid_by || !friendship_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch friendship details to validate friendship_id
    const friendship = await prisma.friends.findUnique({
      where: { friendship_id: parseInt(friendship_id, 10) }, // Ensure this is an integer
      select: { user_id1: true, user_id2: true },
    });

    if (!friendship) {
      return NextResponse.json(
        { error: "Friendship not found" },
        { status: 404 }
      );
    }

    const user1 = friendship.user_id1;
    const user2 = friendship.user_id2;
    const otherUserId = paid_by === user1 ? user2 : user1;

    let final_split_details = {};

    // Handle different split types
    switch (split_type) {
      case "split_equally":
      case "xyz_split_equally":
        final_split_details = {
          [otherUserId]: { amount: Number((total_amount / 2).toFixed(2)), is_settled: false },
        };
        break;

      case "owed_full":
      case "xyz_owed_full":
        final_split_details = {
          [otherUserId]: { amount: Number(total_amount), is_settled: false },
        };
        break;

      default:
        return NextResponse.json({ error: "Invalid split type" }, { status: 400 });
    }

    // Create the expense
    const newExpense = await prisma.expenses.create({
      data: {
        name,
        total_amount,
        split_type,
        paid_by,
        split_details: final_split_details,
        friendship_id,
        date: new Date(date), // Convert date to a valid Date object
        is_settled: false,
      },
    });

    return NextResponse.json(
      {
        message: "Expense created successfully",
        expense: newExpense,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating expense:", error);
    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}



// fetch all expenses of a friendship id
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const friendship_id = url.searchParams.get("friendship_id"); // Extract from query parameters

    if (!friendship_id || isNaN(Number(friendship_id))) {
      return NextResponse.json(
        { error: "Invalid or missing friendship_id" },
        { status: 400 }
      );
    }

    // Fetch all expenses by friendship_id
    const expenses = await prisma.expenses.findMany({
      where: { friendship_id: Number(friendship_id) },
    });

    if (!expenses || expenses.length === 0) {
      return NextResponse.json(
        { error: "No expenses found for this friendship_id" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { expenses },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}

