import { Request, Response, Router } from "express";
import prisma from "../db/db.config";
import { handleCatchError, handleTryResponseHandler } from "../utils/helper";
import {
  CreateBooksValidation,
  UpdateBooksValidation,
} from "../validations/books.validation";

const BookRouteHandler: Router = Router();

BookRouteHandler.post("/", async (req: Request, res: Response) => {
  try {
    const payload = CreateBooksValidation.parse(req.body);

    const data = await prisma.book.create({
      data: {
        title: payload.title,
        description: payload.description,
        bookName: payload.bookname,
        bookAuthor: payload.bookauthor,
        bookPublishDate: payload.bookPublishDate,
        downloadable: payload.downloadable,
      },
    });

    return handleTryResponseHandler(
      res,
      200,
      "Your book has been added to book store",
      data
    );
  } catch (error) {
    return handleCatchError(
      error,
      res,
      "An error occured while fetching books"
    );
  }
});

export default BookRouteHandler;

BookRouteHandler.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const payload = UpdateBooksValidation.parse(req.body);
    const { id } = req.params;

    const existingBook = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingBook) {
      return handleTryResponseHandler(res, 400, "Book Not Found!! Try Again");
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: existingBook.id,
      },
      data: {
        title: payload.title,
        description: payload.description,
        bookName: payload.bookname,
        bookAuthor: payload.bookauthor,
        bookPublishDate: payload.bookPublishDate,
        downloadable: payload.downloadable,
      },
    });

    return handleTryResponseHandler(
      res,
      200,
      "Book Information Updated",
      updatedBook
    );
  } catch (error) {
    return handleCatchError(
      error,
      res,
      "An error occured while fetching books"
    );
  }
});

BookRouteHandler.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const payload = UpdateBooksValidation.parse(req.body);
    const { id } = req.params;

    const existingBook = await prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingBook) {
      return handleTryResponseHandler(res, 400, "Book Not Found!! Try Again");
    }

    await prisma.book.delete({
      where: {
        id: existingBook.id,
      },
    });

    return handleTryResponseHandler(res, 200, "Book Removed");
  } catch (error) {
    return handleCatchError(
      error,
      res,
      "An error occured while fetching books"
    );
  }
});

BookRouteHandler.get("/", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const where = search
      ? {
          OR: [
            {
              title: { contains: String(search), mode: "insensitive" as const },
            },
            {
              bookAuthor: {
                contains: String(search),
                mode: "insensitive" as const,
              },
            },
            {
              bookName: {
                contains: String(search),
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const books = await prisma.book.findMany({
      where,
      orderBy: { bookPublishDate: "desc" },
      take: 50,
    });

    return res.status(200).json({
      status: "success",
      message: books.length ? "Books fetched successfully." : "No books found.",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching books.",
      error: error instanceof Error ? error.message : error,
    });
  }
});
