import { z } from "zod";

export const CreateBooksValidation = z.object({
  title: z.string().min(10, "Title is required"),
  description: z.string().max(200, "Description is required"),
  bookname: z.string().min(10, "Book name is required"),
  bookauthor: z.string().min(6, "Book author is required"),
  bookPublishDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid publish date format",
  }),
  downloadable: z.enum(["YES", "NO"], {
    required_error: "Downloadable is required",
    invalid_type_error: "Downloadable must be 'yes' or 'no'",
  }),
});

export const UpdateBooksValidation = z.object({
  title: z.string().min(10).optional(),
  description: z.string().max(200).optional(),
  bookname: z.string().min(10).optional(),
  bookauthor: z.string().min(6).optional(),
  bookPublishDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid publish date format",
    })
    .optional(),
  downloadable: z
    .enum(["YES", "NO"], {
      required_error: "Downloadable is required",
      invalid_type_error: "Downloadable must be 'yes' or 'no'",
    })
    .optional(),
});
