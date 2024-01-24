import { db } from "../../lib/db";
import { NextResponse } from "next/server";
import { Question12 } from "@prisma/client";


export async function GET(request) {
  let data;
  try {
    data = await db.Question12.findMany();
  } catch (error) {
    data = { success: false };
  }
  console.log(data);
  return NextResponse.json({ data, success: true });
}

export async function POST(request) {
  const { subject, topic, questions } = await request.json();
  // const user = await getCurrentUser();

  // console.log(user);

  // Assuming 'Question' is the Prisma model for questions
  const questionPromises = questions.map(async (q) => {
    const { question, options, correctOption, solution, imageURL } = q;

    const createdQuestion = await db.Question12.create({
      data: {
        subject,
        topic,    
        question,
        options: { set: options },
        correctOption,
        solution,
        imageURL,
       
      },
    });

    return createdQuestion;
  });

  const createdQuestions = await Promise.all(questionPromises);

  return NextResponse.json({ result: "New questions posted", success: true, questions: createdQuestions }, { status: 200 });
}