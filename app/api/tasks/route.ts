import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/app/utils/connect";



export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    console.log("TASK CREATED", task);

    return NextResponse.json(task);

  } catch (error) {
    console.log("ERROR CREATING TASK:", error);
    return NextResponse.json({ error: "Pendejo.", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const {userId} = auth();

    if(!userId){
      return NextResponse.json({error: "Unauthorized", status: 401});
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    console.log("TASKS:", tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("ERROR GETTING TASK:", error);
    return NextResponse.json({ error: "Error updating task.", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {

  } catch (error) {
    console.log("ERROR UPDATING TASK:", error);
    return NextResponse.json({ error: "Error deleting task.", status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {

  } catch (error) {
    console.log("ERROR DELETING TASK", error);
    return NextResponse.json({ error: "Error deleting task.", status: 500 });
  }
}