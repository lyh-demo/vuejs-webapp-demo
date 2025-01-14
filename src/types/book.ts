import client from '@/api/client'
import { ApiBook } from '@/constant'
import Category from './category'
import Format from './format'

export default class Book {
  id: number
  title: string
  isbn: string
  categoryId: number
  category: Category
  formatId: number
  format: Format

  constructor(id?: number, title?: string, isbn?: string, categoryId?: number, category?: Category, formatId?: number, format?: Format) {
    this.id = id ?? 0
    this.title = title ?? ''
    this.isbn = isbn ?? ''
    this.categoryId = categoryId ?? 0
    this.category = category ?? new Category()
    this.formatId = formatId ?? 0
    this.format = format ?? new Format()
  }

  public getBook(id: number, success: (data: Book) => void) {
    client.get<Book>(ApiBook + `/${id}`).then((res) => {
      if (success) success(res.data)
    })
  }

  public getBooks(params: {}, success: (data: BookListResponse) => void, failure: (err: any) => void): void {
    const datas = Book.createParameter(params)
    client
      .get<BookListResponse>(ApiBook, { params: datas })
      .then((res) => {
        if (success) success(res.data)
      })
      .catch((err) => {
        if (failure) failure(err)
      })
  }

  public createBook(success: (data: Book) => void, failure: (err: Map<string, string>) => void): void {
    client
      .post<Book>(ApiBook, this)
      .then((res) => {
        if (success) success(res.data)
      })
      .catch((err) => {
        if (failure) failure(new Map<string, string>(Object.entries(err.response.data)))
      })
  }

  public editBook(success: (data: Book) => void, failure: (err: Map<string, string>) => void): void {
    client
      .put<Book>(ApiBook + `/${this.id}`, this)
      .then((res) => {
        if (success) success(res.data)
      })
      .catch((err) => {
        if (failure) failure(new Map<string, string>(Object.entries(err.response.data)))
      })
  }

  public deleteBook(success: (data: Book) => void): void {
    client.delete<Book>(ApiBook + `/${this.id}`).then((res) => {
      if (success) success(res.data)
    })
  }

  private static createParameter(data: Query = {}): URLSearchParams {
    const params = new URLSearchParams()
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        params.append(key, data[key])
      }
    })
    return params
  }
}

interface Query {
  [key: string]: string
}

interface BookListResponse {
  content: Array<Book>
  last: boolean
  numberOfElements: number
  page: number
  size: number
  totalElements: number
  totalPages: number
}
